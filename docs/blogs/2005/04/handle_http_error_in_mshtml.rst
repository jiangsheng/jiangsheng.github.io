.. meta::
   :description: 在自动化浏览器控件提交表单之后，浏览器控件可能会在浏览超时时重定向到一个错误页面。有时需要用代码控制页面返回之后重新提交表单。 IE6.0之前的版本浏览器控件没有获得HTTP状态的接口。一个很依赖于网站设置的方法是，捕获TitleChange事件，在页面标题包含”找不到页面”或者”Page Not Found”之类的字

在使用浏览器控件的程序中判断HTTP错误
======================================

.. post:: 7, Apr, 2005
   :tags: WebBrowser Control
   :category: WebBrowser Control,MSHTML
   :author: me
   :nocomments:

在自动化浏览器控件提交表单之后，浏览器控件可能会在浏览超时时重定向到一个错误页面。有时需要用代码控制页面返回之后重新提交表单。

IE6.0之前的版本浏览器控件没有获得HTTP状态的接口。一个很依赖于网站设置的方法是，捕获TitleChange事件，在页面标题包含"找不到页面"或者"Page Not Found"之类的字符串时，认为浏览失败。另一个方法是处理BeforeNavigate2事件，用winhttp api单独和服务器连接，使用HttpQueryInfo来查询，相应参数是HTTP_QUERY_STATUS_CODE。在这之前，你可能要在打开URL时用INTERNET_FLAG_IGNORE_REDIRECT_TO_HTTP | INTERNET_FLAG_IGNORE_REDIRECT_TO_HTTPS标志来防止服务器的重定向。

这种方法会造成每个页面被下载两次，一次由浏览器控件发起，一次由网址测试代码发起。两次下载有可能有不同的结果，所以这种方法也未必准确。

浏览器控件不支持IBindStatusCallback接口，也没有从浏览器控件获得IWinInetHttpInfo接口的已知方法。

InternetGetLastResponseInfo在找不到网页(404)时不会返回错误。

IE6.0版本的浏览器控件可以触发DWebBrowserEvents2::NavigateError事件来通知浏览错误及提供错误代码。但是，这个事件只在使用代码进行浏览之后触发一次。在用户点击链接触发浏览错误时不会触发这个事件。

参考

http://www.microsoft.com/mind/0796/protocol/protocol.asp

http://msdn.microsoft.com/workshop/browser/webbrowser/reference/ifaces/dwebbrowserevents2/navigateerror.asp
