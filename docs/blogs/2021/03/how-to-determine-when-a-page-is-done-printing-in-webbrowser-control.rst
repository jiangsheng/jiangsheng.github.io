.. meta::
   :description: Note this post is originally written in 2012. It was lost when moving my web site from Windows Live Spaces to WordPress. I found a dead link to my web site on S

How To Determine When a Page Is Done Printing in WebBrowser Control
===================================================================
.. post:: 24, Mar, 2021
   :tags: MSHTML
   :category: Win32
   :author: me
   :nocomments:

Note this post is originally written in 2012. It was lost when moving my web site from Windows Live Spaces to WordPress. I found a dead link to
my web site on Stackoverflow and found an archive from archive.org. So here it is the old article, with dead link updated of course.

The printing from a WebBrowser control can be customized by using custom headers and footers (https://www.betaarchive.com/wiki/index.php/Microsoft_KB_Archive/267240,
archived from http://support.microsoft.com/kb/267240) or replacing the default print template. However, using such techniques conflicts with
the PRINT_WAITFORCOMPLETION flag, which is used for synchronous printing.

Since Internet Explorer 6.0, the WebBrowser control raises the DWebBrowserEvents2::PrintTemplateTeardown event when a print template
has been destroyed. If the printing involves a custom print template, this is a good indicator of print completion. You can create a event
handler function in your application for this event to determine if a the WebBrowser control is finished printing a Web page.

MORE INFORMATION

The WebBrowser control launches another thread which hosts another MSHTML document which renders to the printer. When this thread is
finished, if a custom print template is involved, the WebBrowser control destroys the print template and raises PrintTemplateTeardown event. This
indicates that the WebBrowser control has completed printing the Web page.

If the default print template and the customization of headers and footers are desired, load the template from the source of IExplorer.exe,
and use it as a custom template.

To translate the asynchronous printing to synchronous, a message loop needs to be created (better if use with a timeout handler).

.. code-block::

  BOOL PrintTemplateTeardownFired=FALSE;
  //launch printing......
  //loop until PrintTemplateTeardown is set to TRUE in the
  PrintTemplateTeardown event handler
  MSG msg;
  while (!PrintTemplateTeardownFired&&GetMessage(&msg, NULL, 0, 0) > 0)
  {
    TranslateMessage(&msg);
    DispatchMessage(&msg);
  }

Reference

- PrintTemplateTeardown
  Event(https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa768296(v=vs.85))
- How To Determine When a Page Is Done Loading in WebBrowser
  Control(https://mskb.pkisolutions.com/kb/180366, archived from
  http://support.microsoft.com/kb/180366)
- How To Handle Document Events in a Visual Basic .NET Application
  (https://www.betaarchive.com/wiki/index.php/Microsoft_KB_Archive/311284,
  archived from http://support.microsoft.com/kb/311284)

