Getting around "Strong name signature not valid for assembly" for a ClickOnce application
=========================================================================================

.. post:: 10 Jan, 2017
   :tags: Clickonce, Strong Name
   :category: .Net Framework, WinForms, Deployment
   :author: me
   :nocomments:

.. index:: pair: Strong name; ClickOnce   

When building a ClickOnce application, I need to redistribute a third party dll. But it failed the strong name validation under `sn-vf <https://learn.microsoft.com/en-us/dotnet/framework/tools/sn-exe-strong-name-tool?redirectedfrom=MSDN>`_ thus ClickOnce launcher failed with the same error.

Microsoft (R) .NET Framework Strong Name Utility Version 4.0.30319.0
Copyright (c) Microsoft Corporation. All rights reserved.

Failed to verify assembly — Strong name validation failed.

I have no idea why the vendor signed a the file with the correct Authenticode signature but with the wrong strong name signature . However, given that they never released an update, it is unlikely them will fix the problem on their end.

Based on my research I now have three options:

* remove the strong name signature, find and replace all references to this dll by ildasm and modifying the result il code to remove the PublicKeyToken from the reference, then recompile the il code to dll using ilasm
* bypass ClickOnce’s strong name signature validation by coding
* sn-vr to remove the file from strong name signature validation

Because the dll is referenced by too many other third party assemblies it is kinda time consuming to modify all of them. And I don’t really have the permission to run anything else but my ClickOnce app on client machines so changing client side strong validation name policy is out too. I continued with the second route.

First thing I tried was renaming the file. After all, ClickOnce did not complain my database file’s strong name signature right? So I went ahead and `set the reference’s CopyLocal property to false <https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2010/t1zz5y8c(v=vs.100)?redirectedfrom=MSDN>`_, excluded the file from `application files <https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2015/deployment/how-to-specify-which-files-are-published-by-clickonce?view=vs-2015&redirectedfrom=MSDN>`_, and added a copy of the dll under the name of dllname.dll1 to the project.  With the BuildAction property set to content this would add the dll1 file as a data file.  At the run time I used the `AssemblyResolve event <https://learn.microsoft.com/en-us/dotnet/api/system.appdomain.assemblyresolve?view=net-9.0&redirectedfrom=MSDN>`_ to load the dll1 file as an assembly when the dll is requested. Debugged the AssemblyResolve code so the program ran without a dllname.dll file in the application directory. Now publish it as a ClickOnce Application and wait…

And ClickOnce launcher reported the same error! So ClickOnce validates strong name for data files as long as it has one, regardless of the file extension. Maybe I need to hide the strong name somehow. A natural wrapper would be a zip file, I can unzipping the file for use during AssemblyResolve. Unzipping during AssemblyResolve did not really work, the dll loading failed when I called SharpZipLib to extract the zip file. So this looked like a catch 22 – AssemblyResolve fails when loading another dll and I need another dll to unzip the file (or I have to ilmerge the code to my main executable, another thing I don’t want to do).

So AssemblyResolve is out of question. I have to unzip the dependency files before use. A natural time to do this is the beginning of Program.Main. And ClickOnce has no problem with my zip file approach now.

Since I got this zip mechanism in place what I can do more about it? Maybe putting other files that I do not really update in the file like my UI framework library or Microsoft Enterprise Library? But then I get dll not found exception before Main is executed. Maybe I need to move the extraction even earlier. What gets executed before Main? Static constructors! After moving the extracting code to a static constructor, I now suddenly cut my download size from 100mb to 30mb, a nice bonus indeed.