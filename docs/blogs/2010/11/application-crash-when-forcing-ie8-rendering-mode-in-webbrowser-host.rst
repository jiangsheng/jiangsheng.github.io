.. meta::
   :description: [caption id=”” align=”alignright” width=”256” caption=”Image via Wikipedia”][/caption] User stephench is reporting that when setting webbrowser rendering mode t

Application crash when forcing IE8 rendering mode in webbrowser host
====================================================================
.. post:: 17, Nov, 2010
   :tags: MSHTML
   :category: Win32
   :author: me
   :nocomments:

User stephench is
`reporting <http://social.msdn.microsoft.com/Forums/en-US/ieextensiondevelopment/thread/252659d8-a7f5-4933-a84f-8f87544b8e6a>`__
that when `setting webbrowser rendering mode to IE8 via
FEATURE_BROWSER_EMULATION <http://msdn.microsoft.com/en-us/library/ee330730(v=VS.85).aspx>`__,
the app would crash.  The web site crashes IE8 too, but IE8 is able to
recover and automatically switch to IE7 mode, while a webbrowser host
crash in `WinInet <http://en.wikipedia.org/wiki/Internet_Explorer>`__
when switching to the `compatibility
mode <http://en.wikipedia.org/wiki/Compatibility_mode>`__ (Note the
ReloadInCompatView function on the `call
stack <http://en.wikipedia.org/wiki/Call_stack>`__). My guess is that
reloading requires a WinInet helper process which a webbrowser host app
does not have. The call stack is the following urlmon.dll!UUIDToWSTR() 
+ 0x1f bytes urlmon.dll!GUIDToWSTR()  + 0x1a bytes
urlmon.dll!GUIDToWSTRCch()  + 0x16 bytes
urlmon.dll!CInPrivateBrowserModeFilter::\_EnsureCLSID()  + 0x20 bytes
urlmon.dll!CSessionBrowserModeFilter::\_GetDataStream()  + 0x27 bytes
urlmon.dll!CBrowserModeFilter::\_EnsureBrowserModeFilter()  + 0x1d84
bytes urlmon.dll!CBrowserModeFilter::IsIE7Mode()  + 0x2e bytes
mshtml.dll!CMarkup::ReloadInCompatView()  + 0xd0 bytes
mshtml.dll!CCssPageLayout::CalcSizeVirtual()  + 0x120416 bytes
mshtml.dll!CLayout::CalcSize()  + 0x164 bytes
mshtml.dll!CLayout::DoLayout()  + 0x113 bytes
mshtml.dll!CView::ExecuteLayoutTasks()  - 0x1e376 bytes
mshtml.dll!CView::EnsureView()  + 0x567 bytes
mshtml.dll!CView::EnsureViewCallback()  + 0x66 bytes
mshtml.dll!GlobalWndOnMethodCall()  + 0xcc bytes
mshtml.dll!GlobalWndProc()  + 0xae bytes
user32.dll!_InternalCallWinProc@20()  + 0x28 bytes
user32.dll!_UserCallWinProcCheckWow@32()  + 0xb7 bytes
user32.dll!_CallWindowProcAorW@24()  + 0x51 bytes
user32.dll!_CallWindowProcA@20()  + 0x1b bytes
mfc100.dll!_AfxActivationWndProc(HWND\_\_ \* hWnd=0x00150a28, unsigned
int nMsg=32770, unsigned int wParam=0, long lParam=0)  Line 471 + 0x11
bytes    C++ user32.dll!_InternalCallWinProc@20()  + 0x28 bytes
user32.dll!_UserCallWinProcCheckWow@32()  + 0xb7 bytes
user32.dll!_DispatchMessageWorker@8()  + 0xdc bytes
user32.dll!_DispatchMessageA@4()  + 0xf bytes >   
mfc100.dll!AfxInternalPumpMessage()  Line 183    C++
mfc100.dll!CWinThread::Run()  Line 629 + 0x7 bytes    C++
mfc100.dll!AfxWinMain(HINSTANCE\_\_ \* hInstance=0x00400000,
HINSTANCE\_\_ \* hPrevInstance=0x00000000, char \* lpCmdLine=0x00152348,
int nCmdShow=1)  Line 47 + 0x7 bytes    C++

.. |Internet Explorer Mobile Logo| image:: http://upload.wikimedia.org/wikipedia/en/1/10/Internet_Explorer_7_Logo.png
   :width: 256px
   :height: 256px
   :target: http://en.wikipedia.org/wiki/File:Internet_Explorer_7_Logo.png

