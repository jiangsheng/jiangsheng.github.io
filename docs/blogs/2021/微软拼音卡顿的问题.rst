微软拼音卡顿的问题
==================

.. post:: 5 Jan, 2021
   :tags: GetTempFileName
   :category: Windows, 微软拼音
   :author: me
   :nocomments:
   
.. index:: pair: Microsoft Pinyin; Lagging

微软拼音最近每次激活的时候都要卡上个几分钟。而且不是一个程序只卡一次，中英文切换之后还会继续卡。

用了Process Monitor跟踪了一下，发现每次切换中英文的时候，微软拼音都会在%appdata%\Microsoft\InputMethod\Chs下面创建一个名字为UDPXXXX（这里XXXX是16进制数字）.tmp的文件，我这个目录下有六万五千多个这样的文件。从命名风格来看，很明显是在调用GetTempFileName，而这个函数有65535个文件的限制，不删除文件的话，第65536次调用会失败，应该是微软拼音没有处理好调用这个函数失败的情况，也没有删除临时文件的代码，就卡住了。

目前的绕过这个问题的方法是把

 del %appdata%\Microsoft\InputMethod\Chs\*.tmp /q

加到每日备份脚本。

已经向微软反映了这个问题。不知道微软为什么临时文件不放%TEMP%放应用程序目录下，以及为什么不定期清理自己创建的临时文件。

更新：微软说修正了这个问题，但是是在Windows 11里，意思就是Windows 10不管了么？