.. meta::
   :description: Note this post is on Visual Studio 11 Beta, you can download it from http://www.microsoft.com/visualstudio/11/en-us/downloads Since Sinofsky posted about no des

What's new in MFC/ATL 11 Beta
=============================
.. post:: 22, Apr, 2012
   :tags: ActiveX Document,MFC,Microsoft Visual Studio,Visual C++
   :author: me
   :nocomments:

Note this post is on `Visual
Studio <http://en.wikipedia.org/wiki/Microsoft_Visual_Studio>`__ 11
Beta, you can download it from
`http://www.microsoft.com/visualstudio/11/en-us/downloads <http://www.microsoft.com/click/services/Redirect2.ashx?CR_CC=200098129>`__
Since `Sinofsky posted about no desktop apps on Windows on ARM
(WOA) <http://blogs.msdn.com/b/b8/archive/2012/02/09/building-windows-for-the-arm-processor-architecture.aspx>`__,
it looks like MFC and
`ATL <http://en.wikipedia.org/wiki/Active_Template_Library>`__ are going
to support
`metro-style <http://en.wikipedia.org/wiki/Metro_%28design_language%29>`__
apps, although most ATL classes are not going to be compatible with
metro style apps.

.. code-block:: C++

   #if !defined(_M_IX86) && !defined(_M_AMD64) && !defined(_M_ARM)
   #error Compiling for unsupported platform. Only x86, x64 and ARM platforms are supported by MFC. 
   #endif

DAO support for ARM is missing, just like the lack of DAO support for 64
bit apps. Jet was deprecated a while ago, no surprise here. 

You can now
decide `whether you want MFC's feature pack code when static
linking <http://blogs.msdn.com/b/vcblog/archive/2012/02/06/10263387.aspx>`__.

Added support for RichEdit 4.1. About time. 

MFC now introduces
dependency on uxtheme.dll and dwmapi.dll. Not sure why applications need
to check MFC for DWM status. 

Lots of defensive programming added to OLE
and `ActiveX document <http://en.wikipedia.org/wiki/ActiveX_Document>`__
support. MFC developers have too much free time? I thought ActiveX
document was dead. Or maybe someone else is pushing those changes, like
Adobe or the Office team. Or Microsoft's security police. 

Lots of
function prototype changes, probably because MFC headers need to
pass `static code
analysis <http://msdn.microsoft.com/en-us/library/hh409293(v=vs.110).aspx>`__. 

Some
other security improvements, like loading known Dlls only from system
path, skipping `DLL search
paths <http://msdn.microsoft.com/en-us/library/windows/desktop/ms682586(v=vs.85).aspx>`__. 

CDatabase
now stores the connection string in memory in encrypted form. 

Some new
OS
`API <http://en.wikipedia.org/wiki/Application_programming_interface>`__
exposure like CFile gets a lot more
`NTFS <http://en.wikipedia.org/wiki/NTFS>`__-specific attributes.

CFileDialog gets a pick non-system folder mode. 

Some design changes are
head-scratching, CPropertyPage gets a GetParentSheet function. Looks
like the parent of the page may no longer be a property sheet. 

In
summary, there isn't much code change in MFC. The demands I see from
community forums are mostly on C++11, which is not surprisingly the
focus of the `Visual
C++ <http://en.wikipedia.org/wiki/Visual_C%2B%2B>`__ team in this
release and probably will continue for a while.

