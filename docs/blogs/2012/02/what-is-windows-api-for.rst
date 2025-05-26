What is the Windows API for
====================================

.. post:: 21, Mar, 2012
   :tags: Win32
   :category: Windows SDK
   :author: me
   :nocomments:

There are the questions programmers ask frequently. This faq does not contain sample code,  readers should use keywords (showing in bold, such as function names, CLSIDs or interface names) to find complete solutions elsewhere.

Q: What is the Windows API for the Start Menu?

A: The Windows API for locating the start menu is SHGetFolderPath. Alternatively, you can also use SHGetSpecialFolderPath or SHGetSpecialFolderLocation with SHGetPathFromIDList. New applications, that is, application only targeting Windows Vista and do not intend to support Windows XP, should use SHGetKnownFolderPath. Oh, before I forget, .Net programmers can use System.Environment.GetFolderPath. Some newer APIs do not support locating start menu location of all users, though.

You can use the IShellLink interface to create or modify a link in the start menu folders. To use the IShellLink interfaces, you need to create a COM object with the CLSID CLSID_IShellLink (in computer's perspective, that is 00021401-0000-0000-C000-000000000046).

Q: What is the Windows API for the Task Bar?

A: Use ITaskbarList2 (for Windows XP and above) or ITaskbarList (for Windows 2000 and lower) to control the tabs. In Windows 2000 and lower, to hide the task bar when your full screen application is running, you need to useSetForegroundWindow and SetWindowPos to cover the entire screen, while on later systems you can use ITaskbarList2::MarkFullscreenWindow.

To use ITaskbarList/ITaskbarList2 interfaces, you need to create a COM object with the CLSID CLSID_TaskbarList (in computer's perspective, that is 56FDF344-FD6D-11d0-958A-006097C9A090), query interface for ITaskbarList/ITaskbarList2, and use the HrInit method to initialize the object.

Q: What is the Windows API for the System Tray?
A: You can use the Shell_NotifyIcon function to add, modify, or delete icons from the status area. Sometimes, the desktop process (explorer.exe) is killed, and later recreated. However, custom icons does not reappear in the system tray automatically. Your should handle a registered message TaskbarCreated to reinstate your icon to the status area. In .Net, the System.Windows.Forms.NotifyIcon Class handle the icon recreation nicely.

Q: What is the Windows API for the quick launch bar?
A: There is no real difference between the quick launch bar and the start menu, except for the folder identifier. You can use the same set of APIs to locate the folder of the quick launch bar and and modify its content.

Q: What is the Windows API for shutting down or log off the Windows?
A: The API to shutdown or logoff the computer is ExitWindowsEx. The user identity of the calling process should have the SE_SHUTDOWN_NAME privilege (computer recognize it as SeShutdownPrivilege). The calling process must use theAdjustTokenPrivileges function to enable the privilege to the process..Net programmers, you are not suppose to do this kind of thing, but if you are determined to do so, use pinvoke to call this function.

Q: What is the Windows API for running an program?
A: If you are using C++, use system() for portability. if you want to communicate with the new process, such as waiting for the process to end, sending message to the process or redirecting standard input/output of the new process, use CreateProcess. Otherwise use ShellExecuteEx, it is easier to set up. Oh, no, don't use WinExec. It does not let you to control the working directory. That may cause problems for some programs. .Net programmers can useSystem.Diagnostics.Process.Start method, which in turn call CreateProcess or ShellExecute.

Q: What is the Windows API for the automating Outlook Express?
A: The Windows Mail (formally Outlook Express) API does not provide a Document Object Model for automation. There are undocumented methods to hook or subclass the outlook windows, though. If you are writing Outlook Express extensions, take a look at the source code of PGP's Microsoft Outlook Express plug-in. With email software completely removed, these API no longer apply to Windows 7.