.. meta::
   :description: User vnetvvv wants to know how to change the user agent string in a VB6 webbrowser control. The knowledge base article PRB: WebBrowser Control Clients Share Glo

How to change the user agent and download control flags in a webbrowser control host
====================================================================================
.. post:: 9, Oct, 2009
   :tags: Document Object Model,Trident (layout engine),User agent
   :category: Active Template Library,enmsdn,Microsoft,Visual C++,Visual Studio
   :author: me
   :nocomments:

User vnetvvv `wants to
know <http://topic.csdn.net/u/20090929/13/1f3966e2-dd1b-43ac-b6ee-f300e69413d3.html>`__
how to change the user agent string in a
`VB6 <http://msdn.microsoft.com/en-us/vbasic/default.aspx>`__ webbrowser
control. 

The `knowledge
base <http://en.wikipedia.org/wiki/Knowledge_base>`__ article `PRB:
WebBrowser Control Clients Share Global
Settings <http://support.microsoft.com/kb/183412>`__ provides the
necessary code for changing the user agent of the webbrowser control
when the webbrowser ask for it. But how to have the webbrowser control
ask for the user agent? 

Well the webbrowser control is an
`ActiveX <http://en.wikipedia.org/wiki/ActiveX>`__, so it implements
`IOleControl::OnAmbientPropertyChange <http://msdn.microsoft.com/en-us/library/ms690175(VS.85).aspx>`__.
The `host can call the
method <http://msdn.microsoft.com/en-us/library/aa753622(VS.85).aspx>`__
to notify the webbrowser control about the property change after the
browser window is created. 

The list of ambient properties can be found
in the `walkall
sample <http://www.microsoft.com/downloads/en/details.aspx?FamilyID=AE22E7A9-611F-4112-8B17-0980412D07A5&displaylang=en>`__,
the most useful ones are DISPID_AMBIENT_USERMODE (which VB6 supports),
DISPID_AMBIENT_DLCONTROL and DISPID_AMBIENT_USERAGENT. The documentation
of other ambient properties can be found in the `documentation of
CComControlBase’s GetAmbient Property
Methods <http://msdn.microsoft.com/en-us/library/tc7644wx(v=VS.80).aspx>`__

Note the knowledge base article `PRB: WebBrowser Control Clients Share
Global Settings <http://support.microsoft.com/kb/183412>`__ also says
DISPID_AMBIENT_USERAGENT cannot be used to alter the user agent string
in DOM or when the navigation is from code. Changing the user agent
string in registry, of course, can change the behavior but will also
have global effect. 

Another way to change the user agent is to go
directly into the networking layer of webbrowser control and change the
user agent process-wide. Since most of the time per-page browser setting
isn’t necessary this can also be used in custom browsers. The WinInet
function
`UrlMkSetSessionOption <http://msdn.microsoft.com/en-us/library/ms775125(VS.85).aspx>`__
has a flag URLMON_OPTION_USERAGENT that can be used to change the user
agent, However it only updates DOM/Javascript and ignore the WinInet
stack so other WinInet client won’t be affected, until you call
UrlMkSetSessionOption with URLMON_OPTION_USERAGENTREFRESH. This is
better for VB6 and .Net programmers since it does not involve `declaring
a lot of OLE
interfaces <http://www.mvps.org/emorcillo/en/code/vb6/index.shtml>`__.

You can get the user agent from `the
DOM <http://en.wikipedia.org/wiki/Document_Object_Model>`__
(`document <http://msdn.microsoft.com/en-us/library/aa752116(VS.85).aspx>`__.\ `parentWindow <http://msdn.microsoft.com/en-us/library/aa752599(VS.85).aspx>`__.\ `navigator <http://msdn.microsoft.com/en-us/library/aa741467(v=VS.85).aspx>`__.\ `userAgent <http://msdn.microsoft.com/en-us/library/aa703729(v=VS.85).aspx>`__).

