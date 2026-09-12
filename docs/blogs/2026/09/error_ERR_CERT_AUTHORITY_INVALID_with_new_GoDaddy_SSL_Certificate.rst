.. meta::
   :description: I recently have to deploy a new SSL certificate from GoDaddy, and after installing it on IIS, I encountered the error ERR_CERT_AUTHORITY_INVALID when trying to access the website. It took me a while to figure out the cause and solution, so I decided to write this blog post to share my experience.

Error ERR_CERT_AUTHORITY_INVALID with new GoDaddy SSL Certificate
===================================================================

.. post:: 12 Sep, 2026
   :tags: SSL
   :category: Security
   :author: me
   :nocomments:

I recently have to deploy a new SSL certificate from GoDaddy, and after installing it on IIS, I encountered the error ERR_CERT_AUTHORITY_INVALID when trying to access the website. It took me a while to figure out the cause and solution, so I decided to write this blog post to share my experience.

---------------------------
Background
---------------------------

Previously web browsers do not care if a SSL certificate has usage other than “Server Authentication” EKU. However Google declared that beginning March 15, 2027, Google Chrome will no longer support multiple purpose certificates, new certificates must include only the “Server Authentication” EKU. In anticipation of this change, many certificate authorities have updated their certificates chains, and GoDaddy is no exception. 

GoDaddy's G2 intermediates do not have any EKU listed, and therefore needs to be phrased out. GoDaddy replaced it with the R1 hierarchy:

* domain certificate
* GoDaddy TLS Intermediate CA DV – R1v1.
* GoDaddy TLS Root CA – R1.

Issue is GoDaddy TLS Root CA – R1 is slow to roll out, and many devices will not have update released at all. GoDaddy has cross signed the DV – R1v1 certificate with an intermediate issued by the old G2 root:

* domain certificate
* GoDaddy TLS Intermediate CA DV – R1v1.
* GoDaddy TLS Root CA - R1 to G2 Cross Certificate
* GoDaddy Root CA - G2


---------------------------
The problem
---------------------------

if you only install the domain certificate and forget the immediate certificate (this one usually doesn't change between renewals and many skip it), you will get the error ERR_CERT_AUTHORITY_INVALID. And reinstalling the immediate certificate will not fix the issue. Nor will exporting the domain certificate and all dependencies then importing it back help. You have to have the certificate chained up properly when installing the domain certificate. Otherwise, Windows would use a number of factors to decide which certificate to send to browsers, heavily weighted with the shortest path (see https://learn.microsoft.com/en-us/troubleshoot/windows-server/certificates-and-public-key-infrastructure-pki/secured-website-certificate-validation-fails for details). But for the new GoDaddy certificate, the shortest path is the R1 root, which is not trusted by many browsers yet. As Microsoft considers this a designed behavior, they will not release a fix to this problem.


---------------------------
The solution
---------------------------

Install OpenSSL to the machine. If you have Git for Windows installed, you would already have it. If not, you can download from https://github.com/openssl/installer/releases .

Download the GoDaddy Certificate Bundle - DV - R1 with Cross to G2, includes Root （gd_bundle_dv-r1-g2.crt.pem） from https://certs.godaddy.com/repository .

Inspect the domain certificate zip file from GoDaddy and make note of the name and thumbprint of each certificates to be installed.

Now you need to remove any certificates from the domain certificate zip files that may be installed incorrectly to start with a fresh state. 


Run Powershell as admin, then use the following command to check the location of the certificates by name. Replace "GoDaddy TLS Root CA - R1" with other certificate names to check for other certificates.

.. code-block::

    Get-ChildItem -Path Cert:\ -Recurse | Where-Object { $_.Subject -match "GoDaddy TLS Root CA - R1" } | Select-Object Subject, FriendlyName, Thumbprint,@{Name="StoreName"; Expression={$_.PSParentPath.Split('::')[-1]}} | Out-GridView

Note you will find multiple certificates with the same name, but different thumbprints. Skip the current user hive unless you remember you imported the certificate to the user hive. You need to remove only the intermediate certificate with the thumbprint that matches the one sent by GoDaddy along with the domain certificate. Leave the root CA certificate alone.

Run mmc.exe, Menu:File → Add/Remove Snap-in, Under Available snap-ins, select Certificates and choose Add. Select Computer Account for the certificates to manage. Press Next. Select Local Computer and press Finish. Locate the certificate with the store located by the previous Powershell script. The command and the GUI have different names for the same store, like My for Personal, but it is easy to figure out. You need to make sure to compare the thumbprint, only delete the certificate within the domain certificate zip file.

Export the private key of the domain certificate if you don't already have it. On Windows there is no built in way to do that, you can manually export a previous domain certificate to a .pfx file in the mmc window, then use OpenSSL to extract the private key from the .pfx file. Use the following command to extract the private key:

.. code-block::

    openssl pkcs12 -in domain_certificate.pfx -nocerts -out private_key.pem

Now you need to chain the domain certificate correctly with the intermediate certificates. Use the following command to create a new .pfx file with the correct chain:

.. code-block::

    openssl pkcs12 -export -out new_domain_certificate.pfx -inkey private_key.pem -in domain_certificate.crt -certfile gd_bundle_dv-r1-g2.crt.pem

Double click the result pfx and install it, let Windows to decide the target location for each certificate. Refresh the mmc window and double click the domain certificate in the Personal\Certificates store. Switch to the details tab and click Edit properties. In the new window, enter a friendly name distinct to this domain and issue date. Save. This name will be used by IIS in the binding certificate dropdown.

Now you can update site bindings in IIS use the certificate, and then run iisreset in an admin command prompt. You should be able to access the website without the error ERR_CERT_AUTHORITY_INVALID now.










