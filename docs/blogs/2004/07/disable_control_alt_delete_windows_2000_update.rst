动态屏蔽Control+Alt+Delete(Update)
========================================
.. post:: 25, Jul, 2004
   :tags: MFC, Hook
   :category: Microsoft Foundation Classes,Visual C++
   :author: me
   :nocomments:

.. _blog_disable_control_alt_delete_windows_2000_update:

我曾经编写过一篇\ :ref:`关于动态屏蔽Control+Alt+Delete的文章 <blog_disable_control_alt_delete_windows_2000>`\ 。数月之后我把文章的英文修订版发在了CodeProject(https://web.archive.org/web/20081015201511/http://www.codeproject.com/system/preventclose.asp)。但是当时我并未发现代码在调试环境下崩溃的原因。在很长时间之后，我看到Antonio Feijao在他最近发表的一篇文章之中用C重写了这个代码，并且添加了一些注释说明了编译器设置可能出现的问题。我认为这篇文章对我的文章的读者也是很有用的，所以准备在我的文章中添加他的文章的链接。

文章介绍：

Antonio Feijao在限制用户访问桌面和应用程序上研究了很长时间。尽管他最终并没有使用文中描述的技术，但是他还是决定把研究过程中搜集到的代码公布出来，以供可能的使用者参考。他并未声明是代码的作者，并且他声明会尽可能的联系代码的作者。

文章地址

https://web.archive.org/web/20041012204126/http://codeproject.com/w2k/AntonioWinLock.asp