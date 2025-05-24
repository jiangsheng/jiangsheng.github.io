.. meta::
   :description: 在我的前一篇BLOG(使用WinDbg调试VC程序)中我提到了如何使用WinDbg来调试Visual C++程序。但是从IDE到命令行之间的切换比较麻烦，为了偷懒起见，可以把WinDbg加到Visual Studio的工具菜单中，这样就可以直接从IDE启动WinDbg来进行调试了。下面是外部工具配置界面的设置

Use windbg as an external tools of Visual C++
=============================================
.. post:: 27, Jun, 2005
   :tags: Visual C++, windbg
   :category: Computers and Internet
   :author: me
   :nocomments:

在我的前一篇BLOG(\ :ref:`使用WinDbg调试VC程序 <blog_debug_using_windbg_in_visual_c>`\ )中我提到了如何使用WinDbg来调试Visual C++程序。但是从IDE到命令行之间的切换比较麻烦，为了偷懒起见，可以把WinDbg加到Visual Studio的工具菜单中，这样就可以直接从IDE启动WinDbg来进行调试了。下面是外部工具配置界面的设置

标题 : WinDbg

命令行: C:\masm32\debug\windbg.exe (这不是一个典型路径，但是既然MASM里面有了，我也懒得再去下一个来装，如果是单独下载安装的话，命令行可能像这样："C:\Program Files\Debugging Tools for Windows\windbg.exe")

参数:-ee c++ -G -i "$(TargetDir)" -y "$(TargetDir)" -QY -logo -QSY -sdce -WF "$(ProjectFileName).WEW" "$(TargetPath)"

(命令行太长的时候windbg会工作不正常。至于这些参数的含义——呃，还是去下一个Debug Tools For Windows回来装上看文档比较好。）

初始目录: $(ProjectDir)

当然，调试的代码不限于C++，实际上，我主要是用windbg来调试汇编代码。
