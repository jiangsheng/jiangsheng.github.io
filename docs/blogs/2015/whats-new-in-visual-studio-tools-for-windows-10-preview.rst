What's new in Visual Studio Tools for Windows 10 Preview
========================================================
.. post:: 24, Mar, 2015
   :tags: Windows 10,Windows SDK
   :category: enmsdn,Microsoft
   :author: jiangshengvc
   :nocomments:

Looks like Windows 10 SDK gets renamed. This post focuses on the Win32
wide of changes. Changes in the [STRIKEOUT:WinRT] Universal App Platform
(UAP) side can be found
at https://dev.windows.com/en-us/whats-new-windows-10-dev-preview. Some
UAP APIs are available to all desktop apps, for exam DirectX 12 and
notification center (should not come as surprise, older version of these
APIs are already callable from Win32 apps ). `Project
Centennial <https://channel9.msdn.com/Events/Build/2015/2-692>`__ also
supports enabling UAP APIs to desktop apps, provided they meet certain
requirements and `deploy using the new appx
model <https://channel9.msdn.com/Events/Build/2015/2-695>`__. In
DirectX12 (of course) The Spartan webbrowser (not sure, some
Spartan-specific commands like IDM_SHAREPICTURE exists but no word on
how to host a Spartan webbrowser) new API
partition WINAPI_FAMILY_ONECORE_APP Support for ARM 64 `Universal
CRT  <http://blogs.msdn.com/b/vcblog/archive/2015/03/03/introducing-the-universal-crt.aspx>`__
`Windows Core Audio
improvements <http://channel9.msdn.com/Events/WinHEC/2015/WHT202>`__:
Prioritize buffer selection in Windows Core Audio APIs to reduce audio
latency (e.g. alerts, game effects, game chats, user speech, movie etc)
. Low power consumption audio is there for WinRT but not for Win32 :(.
Well DJs are gonna be happy about this change. Unsurprisingly some low
power API for video codec too. Guess playing movies do kill battery
life. Losts of changes in the `Certificate Enrollment
API <https://msdn.microsoft.com/en-us/library/windows/desktop/aa374863(v=vs.85).aspx>`__.... and
what's up with the desktop family guard macros? someone gonna
try include the headers in a Windows Store app? APIs for not domain/AD
joined clusters. Wow the documentation is `up in
MSDN <https://msdn.microsoft.com/en-us/library/dn806626(v=vs.85).aspx>`__
already. The Windows Server team is faster this time. Guess the consumer
team fall behind because of the Phone edition. Wow Microsoft is adding
stuff to COM again. Did not expect this to happen. The `REGCLS
enumeration <https://msdn.microsoft.com/en-us/library/windows/desktop/ms679697(v=vs.85).aspx>`__
gets a new member.. after 15 years. You are joking right? Why this empty
ifdef in the `tree control
styles <https://msdn.microsoft.com/en-us/library/windows/desktop/bb760013(v=vs.85).aspx>`__
and extended styles? Looks like something got cut. #if (NTDDI_VERSION >=
NTDDI_WINTHRESHOLD) #endif API for Jet - `Extensible Storage Engine
version <https://en.wikipedia.org/wiki/Extensible_Storage_Engine>`__
version 10, like the new 8-byte unsigned long long column type.
IShellUIHelper7 adds some more methods to the window.external object...
like SelectUAString and getter/setter methods for experimental flag. Can
I change between Trident and EdgeHtml this way? Secured D3D in Media
Foundation. Guess WebGL forced that. Now you can customize the context
menu in a PDF document displayed in a hosted webbrowser control.
Some new SQLite-specific error codes in winerr.h. It seems SQLite is
part of OS. New system folders like camera roll and saved
pictures. FOLDERID_SkyDrive is getting renamed (of course) but will
remain for some time for backward compatible reasons. TODO:
neerajsi-2013/12/08 - this should be moved to official
documentation.huh? Graphics streaming in Remote Desktop APIs. Out: D3D 8
(it is still there in Windows 8? Did not notice) IA64 Moved (desktop
APIs that were not available to Windows Store apps to be supported in
universal apps) Threading (CreateThread etc) Winsock
