How to force popup window to navigate in the same window in a webbrowser control
================================================================================
.. post:: 22, Nov, 2009
   :tags: ActiveX,Internet Explorer,Internet Explorer 6,Trident (layout engine),Web browser,WebBrowser Control,Windows Server 2003,Windows XP
   :category: enmsdn,Microsoft,Visual C++,Visual Studio,Webbrowser control
   :author: jiangshengvc
   :nocomments:

When clicking on an link that targets a new window,  the default
behavior of a webbrowser control host application is to open a new
window in `Internet
Explorer <http://en.wikipedia.org/wiki/Internet_Explorer>`__. User
ben_lai `wants to
know <http://topic.csdn.net/u/20091120/11/b023d1e9-f31e-4671-bae7-45d6f4fca9e8.html>`__
how to handle the click and navigate to the same window. There are three
events that notifies a new window,
`NewWindow <http://msdn.microsoft.com/en-us/library/aa768335(v=VS.85).aspx>`__
(The current documentation of this event is wong, check
http://support.microsoft.com/kb/185538/EN-US/ for the parameters of the
event),
`NewWindow2 <http://msdn.microsoft.com/en-us/library/aa768336(v=VS.85).aspx>`__
and
`NewWindow3 <http://msdn.microsoft.com/en-us/library/aa768337(VS.85).aspx>`__,
each one has a cancel parameter to stop the new window being created,
though for NewWindow2, it requires cooperation of
`BeforeNavigate2 <http://msdn.microsoft.com/en-us/library/aa768326(v=VS.85).aspx>`__
to get the url of the new window. After getting the url, the navigation
can be carried out in the original window by calling Navigate2. The
obsolete NewWindow Event has the url right in the parameter so you can
cancel the navigation and call the navigation methods of the
`webbrowser <http://en.wikipedia.org/wiki/Web_browser>`__ control with
the new url. The problem is, the event is there for compatibility
purposes and you don’t know how long the event will still be raised. And
it is not without problem, `one fixed bug causes a 60 seconds delay on
new window creation <http://support.microsoft.com/kb/194242>`__,
`another causes the navigation to
fail <http://support.microsoft.com/kb/294870>`__. The fix for the
latter? use NewWindow2. The NewWindow2 event, introduced in IE4, does
not have the url parameter. So you cannot simply cancel the event. To
get the url, you need do the normal processing, create a hidden new
webbrowser host window and `assign the webbrowser to the event’s ppdisp
parameter <http://support.microsoft.com/kb/184876>`__, then hook
BeforeNavigate2 in the new window to get the url (may require client to
`patch their Windows if they are on Windows
Vista <http://support.microsoft.com/kb/943112>`__). Once you get the
url, you can destroy the new window and navigate in the old window. The
NewWindow3 event, introduced with `Windows Server 2003
SP1 <http://www.microsoft.com/windowsserver2003/>`__ and `Windows XP
SP2 <http://www.microsoft.com/windows/windows-xp/default.aspx>`__, is
designed for the webbrowser host to get notified of the decision of the
`popup window <http://en.wikipedia.org/wiki/Pop-up_ad>`__ manager based
on user preference (for example, if the new window should be opened in a
new window or a new tab in the current window), though the popup window
manager’s behavior `can be customized
too <http://jiangshengvc.wordpress.com/2007/07/03/handle-newwindow3-and-showmodaldialog-in-chtmlview/http://jiangshengvc.wordpress.com/2007/07/03/handle-newwindow3-and-showmodaldialog-in-chtmlview/>`__.
For the purpose of cancelling navigation and navigate to the old window,
it does not matter how the new window should be opened, so you can just
take the url and execute the same logic as in the NewWindow event. Since
**everyone should be using IE7 or higher now**, the event should be
supported by the browser. If the client can’t upgrade IE, at least ask
them to fully patch their Windows. The original poster’s question is in
the VB forum so all the native events are available. For .net
programmers, you can `hook up the event via IConnectionPointContainer
directly if you are inserting the webbrowser as an ActievX on a Windows
Form <http://support.microsoft.com/kb/311298>`__, or `extend the
webbrowser site if you are using the System.Windows.Forms.Webbrowser
class <http://www.codeproject.com/KB/cpp/ExtendedWebBrowser.aspx>`__.
Update:
`WPF <http://en.wikipedia.org/wiki/Windows_Presentation_Foundation>`__
users who want to use System.Windows.Controls.WebBrowser are out of
luck, they need to `host the ActiveX versions of the webbrowser control
to get a hand on the native
events <http://social.msdn.microsoft.com/Forums/en-US/wpf/thread/8c43c6f5-4e9f-4491-8219-1b0eeb7b225b/>`__.
