.. meta::
   :description: 为了唤醒网络上的计算机，必须发出一种特殊的数据包，该数据包的格式与普通数据包不同，而且还必须使用相应的专用软件才能产生。当前普遍采用的是AMD公司制作的Magic Packedt这套软件以生成网络唤醒所需要的特殊数据包，俗称魔术包（Magic Packet）。该数据包包含有连续6个字节的“FF”和连续重复16次的MAC

编程实现远程唤醒PC
==========================

.. post:: 23, Jan, 2005
   :tags: Power Management
   :category: AMD
   :author: me
   :nocomments:

为了唤醒网络上的计算机，必须发出一种特殊的数据包，该数据包的格式与普通数据包不同，而且还必须使用相应的专用软件才能产生。当前普遍采用的是AMD公司制作的Magic Packedt这套软件以生成网络唤醒所需要的特殊数据包，俗称魔术包（Magic Packet）。该数据包包含有连续6个字节的“FF”和连续重复16次的MAC地址。
Magic Packet格式虽然只是AMD公司开发推广的技术，并非世界公认的标准，但是仍然受到很多网卡制造商的支持，因此 许多具有网络唤醒功能的网卡都能与之兼容。

需要更多关于Magic Packet的信息的话，可以参考
https://web.archive.org/web/20020805085929/http://www.amd.com/us-en/ConnectivitySolutions/TechnicalResources/0,,50_2334_2481,00.html

一个生成网络唤醒所需要的特殊数据包的示例代码可以在https://web.archive.org/web/20130306145307/http://staff.aist.go.jp/d.g.fedorov/ether-wake.c找到。

更多信息可以参考 https://web.archive.org/web/20060516025623/http://blog.mllm.org/index.php?q=node/59
