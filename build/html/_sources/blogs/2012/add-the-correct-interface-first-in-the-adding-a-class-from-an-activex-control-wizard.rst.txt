Add the correct interface first in Adding an MFC Class from an ActiveX Control wizard.
======================================================================================
.. post:: 4, Dec, 2012
   :tags: ActiveX,COM,Visual C++,Windows Media Player
   :category: enmsdn,MFC,Microsoft,Microsoft Foundation Class Library,Visual Studio
   :author: jiangshengvc
   :nocomments:

In good old times aka VC6, if you want to use an ActiveX in MFC,
the `Components and Controls
Gallery <http://msdn.microsoft.com/en-us/library/aa269050(v=vs.60).aspx>`__
would generate all the properties and methods of an ActiveX and pull
dependent types and create wrapper classes for them as well. And it was
good. It magically knows the main class of the `Windows Media
Player <http://en.wikipedia.org/wiki/Windows_Media_Player>`__ ActiveX
is CWMPPlayer4 and that GetCurrentMedia
`method <http://en.wikipedia.org/wiki/Method_%28computer_programming%29>`__
returns CWMPMedia. Welcome to the modern `Visual
C++ <http://en.wikipedia.org/wiki/Visual_C%2B%2B>`__. Now comes a `new
wizard <http://msdn.microsoft.com/en-us/library/9kdzetyx.aspx>`__ that
gives you options to choose interfaces to import from. At the same time
you got to decide if you really need that many types from an ActiveX.
 If you went the unfortunate path of `Adding a Member Variable
wizard <http://msdn.microsoft.com/en-us/library/86kdbbs8.aspx>`__ in the
`dialog
editor <http://msdn.microsoft.com/en-us/library/6zd672xs.aspx>`__ and
somehow got a COCX1 class back, you don't have the luxury to choose, and
you end up with an CWnd wrapper class that does not really wrap up the
properties and methods of the ActiveX. It is still good for early
binding (like querying IWMPPlayer4 from the result of
`CWnd::GetControlUnknown <http://msdn.microsoft.com/en-us/library/6fde5b3k.aspx>`__)
but if you plan to use late binding and MFC's OLE support (hello
`COleException <http://msdn.microsoft.com/en-us/library/fa1zk0fk(v=vs.110).aspx>`__!),
 you probably want to delete the COCX1 files and start over with the
Adding a Class from an ActiveX Control wizard. Good thing about the new
Adding a Class from an ActiveX Control wizard is that most of time we
don't care about the majority of the types in the ActiveX's type
library. We are not going to call most of the ActiveX's functionality
anyways, so selecting what we would use makes sense. Bad thing is that
now we don't know the return type of a method from the generated classes
if the return type is LPDISPATCH, lead to guesswork or fire
up `OLEView <http://msdn.microsoft.com/en-us/library/windows/desktop/ms693754(v=vs.85).aspx>`__
to look up the types in the ActiveX's type library). Now comes the worst
part of the new wizard. The wizard somehow lost its ability to find the
correct ActiveX control class and opt to use the first selected
interface to generate a CWnd wrapper.  If you naturally click on the >>
button to select all interfaces in the Windows Media Player ActiveX at
once, you get a CWMPCdromCollection derived from CWnd. That  won't work
as the ActiveX does not implement the IWMPCdromCollection interfaces
(undefined behavior can happen if you call the generated methods), and
certainly the WMPCdromCollection class isn't an insertable ActiveX.
Fortunately it is easy to avoid this issue if you add the ActiveX's main
interface first (e.g. IWMPPlayer4 for the Windows Media Player control)
before adding the rest of interfaces, or correct the generated code for
the first interface. That is, swap the CWnd and COleDispatchDriver code
between the wrong class and the correct class for the main interface. It
takes some time to find the correct class for the ActiveX control,
however. Side note: For code cleanness, you probably want to move the
InvokeHelper code in the headers to cpp files like VC6 did. A good C++
`refactoring tool <http://en.wikipedia.org/wiki/Code_refactoring>`__ can
help that tremendously.
