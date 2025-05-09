Make the webbrowser control styled the same way as the hosting application
==========================================================================
.. post:: 27, Oct, 2009
   :tags: .NET Framework,C#,Internet Explorer,Internet Explorer 6,Microsoft Foundation Class Library,Silverlight,Trident (layout engine),Visual C++,Windows Forms,Windows Presentation Foundation,Windows SDK,Windows XP
   :category: Active Template Library,enmsdn,Microsoft
   :author: jiangshengvc
   :nocomments:

User wtx_sonery `wants to know whether it is possible to style the
webbrowser control with the rest of the
application. <http://topic.csdn.net/u/20091026/14/05db4eed-c766-4480-80ce-b030488bcae1.html>`__

The answer is yes, you can implement IDocHostUIHandler’s GetHostInfo
method and return DOCHOSTUIFLAG_THEME in the host flags.

IDocHostUIHandler is already implemented in MFC and
`ATL <http://en.wikipedia.org/wiki/Active_Template_Library>`__. For MFC
there are CHtmlControlSite and CBrowserControlSite but you should be
overriding the GetHostInfo function in CHTMLView and CDHTMLDialog. In
ATL the template definition is in Atliface.h but you need to `derive
from IDocHostUIHandlerDispatch by
yourself. <http://support.microsoft.com/kb/274202>`__ 

Implementing
IDocHostUIHandler Windows Forms gets a little tricky. Windows Forms
already implemented it on its WebBrowserSite class but you can’t extend
it. Following the .Net `Framework Class Library Security
Guideline <http://msdn.microsoft.com/en-us/library/ms182161(v=VS.100).aspx>`__
the Windows Forms version of the IDocHostUIHandler interface is internal
to the class library. If you derive from WebBrowserSite and implement
your own version of IDocHostUIHandler, you still get Windows Forms’s
implementation of IDocHostUIHandler when you do
`QueryInterface <http://en.wikipedia.org/wiki/IUnknown>`__ on the
browser site. That means you need to `get ride of the Windows Forms
wrapper of the webbrowser control and provide your own hosting
implementation. <http://code.google.com/p/csexwb2/>`__ 

WPF/Silverlight users, you are out of luck. The stock version of the webbrowser control
does not even provide a way to customize the host site. The best thing
you can do is to see if Windows Forms interop is available to the
platform and if so, embed a csexwb `Windows Forms
control <http://en.wikipedia.org/wiki/Windows_Forms>`__. There are some
`unsolved problems in the csexwb discussion
area <http://code.google.com/p/csexwb2/issues/detail?id=59>`__, however.

There are `other
switches <http://msdn.microsoft.com/en-us/library/aa753277(VS.85).aspx>`__
you can tweak the browser control’s behavior. However there is only one
bit available in the enum for future flags. Maybe that’s why IE
introduces `feature
control <http://msdn.microsoft.com/en-us/library/ms537184(VS.85).aspx>`__
in IE6 for `Windows XP
SP2 <http://www.microsoft.com/windows/windows-xp/default.aspx>`__ where
`features are based on
enum <http://msdn.microsoft.com/en-us/library/ms537169(v=VS.85).aspx>`__
– you get a 4GB range for new features!
