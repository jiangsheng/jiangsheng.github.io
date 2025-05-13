编程控制Modem/PPPoE拨号连接
===============================

.. post:: 23, Jan, 2005
   :tags: Windows API
   :category: Windows, Win32
   :author: me
   :nocomments:

在Windows中拨号上网(包括MODEM和PPPoe)，一般都是用Windows平台提供的的Remote Access Service(RAS，远程访问服务):https://learn.microsoft.com/en-us/windows/win32/rras/about-remote-access-service 。其中的连接操作函数（https://learn.microsoft.com/en-us/windows/win32/rras/ras-connection-operations）可以用于对拨号连接进行操作。比较常用的几个函数是RasDial、RasHangUp、RasEnumConnection和RasGetConnectStatus，以及自定义的通知处理函数（https://learn.microsoft.com/en-us/windows/win32/rras/notification-handlers）。

Windows XP/2003内建了对PPPoe拨号连接的支持，参考 https://learn.microsoft.com/en-us/windows/win32/rras/point-to-point-protocol-over-ethernet-connections 。

一个控制拨号连接的代码示例可以在https://web.archive.org/web/20031008084631/http://www.pconline.com.cn/pcedu/empolder/gj/vc/10309/221591.html 找到（原始出处搜索半天没搜到……）。