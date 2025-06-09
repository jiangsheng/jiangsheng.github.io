.. meta::
   :description: 问：如何传递CString中包含的字符串到具有IStream类型参数的函数？ 问：如何根据获得的IStream接口指针获得字符串？ 答：MFC7中的未公开类CStreamOnCString实现了IStream接口访问封装的CString类型的m_strStream成员。 如果你没有MFC7，可以用CreateStrea

IStream接口和CString之间的转换
=====================================

.. post:: 24, Jan, 2005
   :tags: MFC
   :category: Win32
   :author: me
   :nocomments:

问：如何传递CString中包含的字符串到具有IStream类型参数的函数？

问：如何根据获得的IStream接口指针获得字符串？

答：MFC7中的未公开类CStreamOnCString实现了IStream接口访问封装的CString类型的m_strStream成员。

如果你没有MFC7，可以用CreateStreamOnGlobal创建IStream的内存流实现对象，之后调用IStream::Write将字符串写入内存流对象；或者创建IStream的内存流实现对象，反复调用IStream::Read和IStream::Write从源流复制数据到内存流，然后调用GetHGlobalFromStream函数直接访问内存流的内存句柄。上面的一些调用在MFC中被封装到COleStreamFile类中。

下面的代码把一个内存流读到字节数组。你可以根据字符串的类型把字节数组转化成字符串。

.. code-block:: C++

    COleStreamFile osfRead;
    osfRead.Attach(pStream);
    long lLength=osfRead.GetLength();
    CByteArray baBuf;
    baBuf.SetSize(lLength);
    osfRead.Read(baBuf.GetData(),lLength);
