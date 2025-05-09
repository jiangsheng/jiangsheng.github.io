Troubleshooting SGEN : error : An attempt was made to load an assembly with an incorrect format
================================================================================================================
.. post:: 10 Sep, 2024
   :tags: sgen
   :category: C#, .Net Framework, Windows SDK
   :author: me
   :nocomments:

I have a POCO entity project that must generate XML Serializers due to a `memory leak bug <https://www.betaarchive.com/wiki/index.php/Microsoft_KB_Archive/886385>`_. Xml serializer generated dynamic assemblies are not ever collected.

Turning on verbose mode in MSBuild options tells the problem.

Task attempted to find “sgen.exe” using the SdkToolsPath value “”. Make sure the SdkToolsPath is set to the correct value and the tool exists in the correct processor specific location below it. (TaskId:89)
1>  C:\Program Files (x86)\Microsoft SDKs\Windows\v10.0A\bin\NETFX 4.8 Tools\x64\sgen.exe…

Obviously the 64 bit sgen.exe is not going to be able to load my x86 DLL.

Now where does this value coming from?

Those are the initial MSBuild properties in build log

   1>TargetPlatformDisplayName = Windows 7.0
   1>TargetPlatformIdentifier = Windows
   1>TargetPlatformMoniker = Windows,Version=7.0
   1>TargetPlatformRegistryBase = Software\Microsoft\Microsoft SDKs\Windows
   1>TargetPlatformSdkPath =
   1>TargetPlatformVersion = 7.0

The GetFrameworkPaths target did the following assignments:

   1>Added Item(s): _TargetFramework40DirectoryItem=C:\Windows\Microsoft.NET\Framework\v4.0.30319
   1>Added Item(s): _TargetFramework35DirectoryItem=C:\Windows\Microsoft.NET\Framework\v3.5
   1>Added Item(s): _TargetFramework30DirectoryItem=C:\Windows\Microsoft.NET\Framework\v3.0
   1>Added Item(s): _TargetFramework20DirectoryItem=C:\Windows\Microsoft.NET\Framework\v2.0.50727
   1>Added Item(s): _TargetedFrameworkDirectoryItem=C:\Windows\Microsoft.NET\Framework\v4.0.30319
   1>Added Item(s): _CombinedTargetFrameworkDirectoriesItem=C:\Windows\Microsoft.NET\Framework\v4.0.30319
   1>Set Property: TargetFrameworkDirectory=C:\Windows\Microsoft.NET\Framework\v4.0.30319
   1>Set Property: TargetFrameworkSDKDirectory=C:\Program Files (x86)\Microsoft SDKs\Windows\v10.0A\
   1>Added Item(s): _TargetFrameworkSDKDirectoryItem=C:\Program Files (x86)\Microsoft SDKs\Windows\v10.0A\

I have no x64 anywhere in the log file except the Visual Studio itself is 64 bit, maybe it is reading from the 64 bit registry?

Further digging shows we need to add <SGenPlatformTarget>$(Platform)</SGenPlatformTarget> to the project file. Why invented this tag when the sgen target platform must match your project’s?

Anyway it turns out the same job can now be done with

   <SGenUseProxyTypes>false</SGenUseProxyTypes>

Our old AfterBuild target that calls sgen.exe is no longer needed.