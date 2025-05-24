.. meta::
   :description: 活动桌面处理和一个例子 （https://web.archive.org/web/20010503055645/http://www.vckbase.com/vckbase/vckbase10/vc/nonctrls/atlcomocx_02/1002001.htm）讲述了使用IActiveDesktop接口可以做到的

编程控制活动桌面，用ActiveX控件来增强桌面的功能
============================================================

.. post:: 22, Jan, 2005
   :tags: Windows API
   :category: Windows, Win32
   :author: me
   :nocomments:

活动桌面处理和一个例子 （https://web.archive.org/web/20010503055645/http://www.vckbase.com/vckbase/vckbase10/vc/nonctrls/atlcomocx_02/1002001.htm）讲述了使用IActiveDesktop接口可以做到的事情。

活动桌面允许在桌面上显示HTML网页，这也意味着我们可以在桌面上的项目中以在网页中使用ActiveX控件来对网页进行扩展的方式来提供丰富的内容。但是不建议在桌面上使用不安全的控件，例如Windows Media Player 6.0。

虽然用一段影片作为桌面背景是一件很酷的事情，但是你不得不忍受在每次切换任务或者刷新桌面的时候都弹出安全性提示对话框。你可以在编写自己的控件时利用
https://web.archive.org/web/20050311181954/http://msdn.microsoft.com/library/CHS/vccore/html/_atl_step_7.3a_.putting_the_control_on_a_web_page.asp 中的技术来避免这个烦人的对话框。
