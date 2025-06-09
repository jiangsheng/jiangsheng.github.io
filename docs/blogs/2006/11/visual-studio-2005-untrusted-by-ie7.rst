.. meta::
   :description: Today I upgraded one of my development machine to IE7. Everything looks fine, except I have to change the FileDownload event handler to make my code compile.

Visual Studio 2005 Untrusted by IE7
===================================
.. post:: 11, Nov, 2006
   :tags: MSHTML
   :category: Visual Studio
   :author: me
   :nocomments:

   Today I upgraded one of my development machine to IE7. Everything
   looks fine, except I have to change the `FileDownload event
   handler <http://support.microsoft.com/kb/325204>`__ to make my code
   compile.

   However, suddenly I found Visual Studio 2005 is complaining:

   |image1|

   Conclusion:

   - Visual Studio is based on WebBrowser control (Is this news story?)
   - Upgrade to IE7 may break some applications (Again, is this a news
     story?)

   Everything else works fine so far...

.. |image1| image:: http://p.blog.csdn.net/images/p_blog_csdn_net/jiangsheng/254230/o_VisualStudio2005Untrusted.JPG

