写篇文章真累
=======================

.. post:: 23, Oct, 2003
   :tags: WebBrowser Control, CHtmlView, Scripting
   :category: Microsoft Foundation Classes
   :author: jiangshengvc
   :nocomments:
   

最近一篇文章(:ref:`浏览器集成教学--在浏览器程序中添加宏支持 <add_scripting_support_to_webbrowser_control>`)长长短短，写了两个礼拜吧。

写这篇文章的主要原因是想把网页分析做得更加灵活。这篇文章的基础是我以前为一个EBS游戏写的外挂，可以自动修改网页内容（主要是表单）和定时submit表单（有的网站的submit有时间限制）。

以前的代码是用VC来写的，和网页的修改同步很不方便。很多功能依赖于网页结构，网页结构一变的话，就需要重新编译代码。所以在重写的时候，想考虑做成类似于outlook的规则。但是在编写的时候，发现规则编写起来实在是太繁琐了。其实这些规则用VB来写脚本的话，可能就几句话。所以做得更加通用一点，用vbs算了。这样的话，修改的时候改的少些，虽然使用门槛要高些。

主要碰见的技术问题是 脚本中的浏览器的事件处理代码不能执行（CHtmlView捕获了事件，所以要在CHtmlView里面转发事件） 

移植MFCIE的代码到MDI的时候的菜单出现很多问题，主要是MDI的菜单替换，以及插入MDI系统菜单之后收藏夹的位置变化

移植部分MFC7的代码到MFC6,中间还结合了KB的文章的代码，真是faint 无法直接创建支持事件的CCmdTaget类（ActiveX好像可以……） 

MFC的类向导不支持自动化中的默认参数 

上面两个问题使得我不得不手动改ODL文件，中间出现无数问题…… 

关闭窗口时出现非法操作（最后捕获了WindowClosing事件，Cancel掉了系统的处理之后自己关闭） 

表单的自动完成没有资料，没做成功。好像和隐藏方法IShellUIHelper::AutoCompleteAttatch有关。 

编辑网页源代码时文档结构的刷新有问题，IHtmlDomNote的Child在SetOutHTML之后全部不见了，最后是刷新整个文档结构树才解决。