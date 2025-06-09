.. meta::
   :description: http://expert.csdn.net/expert/Topicview2.asp?id=2751134 不知道为什么默认的处理不判断timer的ID

列表视图自动KillTimer的问题
=============================

.. post:: 10, Mar, 2004
   :tags: ListView, Timer
   :category: Win32
   :author: me
   :nocomments:

来自http://expert.csdn.net/expert/Topicview2.asp?id=2751134的讨论。

可以参考Knowledge Base article Q200054: PRB: OnTimer() Is Not Called Repeatedly for a List Control。基本上ListView的默认消息处理是会调用KillTimer的，所以在处理你自己的Timer消息的时候不要调用默认的处理程序。
 
不知道为什么默认的处理不判断timer的ID
