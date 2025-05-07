What part of Windows is written in .Net/WPF/Silverlight?
========================================================
.. post:: 16, May, 2016
   :tags: .NET Framework
   :category: enmsdn,Microsoft
   :author: jiangshengvc
   :nocomments:

user `曹一聪 <https://www.zhihu.com/people/cao-yicong-50>`__\  on zhihu
is curious how widely .Net is used within Windows components. Obviously
an operating system component cannot depend on something that isn't in
the operating system, so nothing uses Silverlight in the desktop version
Windows. And because `XP editions mostly did not ship with any .Net
framework
version <https://blogs.msdn.microsoft.com/astebner/2007/03/14/mailbag-what-version-of-the-net-framework-is-included-in-what-version-of-the-os/>`__,
practically nothing from the XP days can use .Net. Only components newer
than XP or rewrote after XP can use .Net, except those Windows Media
Center and Tablet PC components that have .Net dependencies. The first
time .Net is available in almost all editions is Windows Vista/2008 (the
server core editions make .Net optional). Because a Vista Capable
sticker does not guarantee a machine with user-acceptable speed, not
much in Windows Vista is using .Net. OR Windows 7 on that matter if you
skip Windows Powershell. The usage of .Net is more in the consumer
software (e.g. Windows Live Essentials), developer tools (e.g. Visual
Studio) and business tools (e.g. SQL Server). In short, .Net is for
writing apps, not really for the OS itself. After Windows 8, Microsoft's
focus moved to Windows RT, now UWP, not much effort is done to improve
the desktop, so practically nothing in the desktop got rewritten in .Net
Framework.  Windows Help 2.0 is a notable exception however. Because
more and more desktop components are moving to UWP (control panel,
calculator, games etc), Windows 8 might be the peak of .Net Framework
usage in Windows. If you want a completed list of managed assemblies,
you can just scan all dll/exe files on your system and see which file is
a managed. And if a file is a managed assembly, search its references to
find if WPF is used.
`AssemblyName.GetAssemblyName <https://msdn.microsoft.com/en-us/library/system.reflection.assemblyname.getassemblyname%28v=vs.110%29.aspx>`__
can detect a managed assembly file but it throws too many exceptions as
most dll/exe files are not managed, so I use `Meta Data
APIs <https://msdn.microsoft.com/en-us/library/ms404384(v=vs.110).aspx>`__
(IMetaDataDispenser/IMetaDataImport) to detect managed assemblies. The
full code can be found at
`github.com/jiangsheng/Samples/blob/master/FindDotnetInWindows <https://github.com/jiangsheng/Samples/blob/master/FindDotnetInWindows/AssemblySearch/AssemblySearch.cpp>`__.
The initial list of managed files I found is pretty long so the scanner
skip known locations that have known .Net assemblies, like the GAC, the
.Net Framework folder, Windows Powershell, Visual Studio, SQL Server
and  IIS. The usage of .Net in the rest of system is surprisingly
sparse.  Windows itself is still a C/C++ stronghold.
