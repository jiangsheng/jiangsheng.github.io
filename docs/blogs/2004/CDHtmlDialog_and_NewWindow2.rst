CDHtmlDialog&NewWindow2
=================================

.. post:: 12, Feb, 2004
   :tags: WebBrowser Control, MFC
   :category: WebBrowser Control, Microsoft Foundation Classes
   :author: me
   :nocomments:

Class ID Default Interface Default Event Interface
----------------- ----------------- -----------------------
CLSID_WebBrowser IWebBrowser2 DWebBrowserEvents2
CLSID_WebBrowser_V1 IWebBrowser DWebBrowserEvets

CDHtmlDialog捕获了DWebBrowserEvets事件，并将其转发到虚函数，而没有捕获DWebBrowserEvents2；所以在按Ctrl+N触发DWebBrowserEvents2事件的时候，执行默认操作——打开新的IE窗口。这可能不是你预料之中的行为。

解决的方法是自己写一个EventSink,你可以不必将其转发到虚函数。

参见微软知识库文章181845

HOWTO: Create a Sink Interface in MFC-Based COM Client (https://web.archive.org/web/20040721215255/http://support.microsoft.com/?id=181845)