.. meta::
   :description: I have a web service that runs fine on my Windows XP. However, when I deploy to the production server, the web service returns 415 Unsupported Media Type when c

415 Unsupported Media Type when WSE is NOT configured
=====================================================
.. post:: 14, Feb, 2009
   :tags: ASP.Net,Web Service
   :category: Microsoft
   :author: me
   :nocomments:

.. container:: bvMsg
   :name: msgcns!1BE894DEAF296E0A!850

   I have a web service that runs fine on my Windows XP. However, when I
   deploy to the production server, the web service returns 415
   Unsupported Media Type when calling.

   I have seen this error when WSE is not enabled on the client. The
   problem is, the web service is NOT using WSE. so I did the usual,
   uninstall ASP.Net, reinstalling, adding asmx extension to IIS, same
   error.

   Now I need to fire a debugger to see what’s going on. Surprisingly,
   Microsoft.Web.Services3.dll is loaded even when there is no trace of
   it in my projects. Now I probably know what’s going on. There is
   another web service in a different virtual directory that uses WSE.

   OK, I will isolate my web service to a new application pool. Well,
   that does not help. In the end I have to add WSE configuration to
   both my web service and my Windows client.

