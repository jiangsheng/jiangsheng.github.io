ASF学习笔记 Part 2
==================================================================

.. post:: 26, Sep, 2003
   :tags: Codec
   :category: Windows Media SDK
   :author: jiangshengvc
   :nocomments:

使用回调方法

一些Windows Media Format SDK的接口的方法是异步执行的，很多这样的方法使用回调方法和应用程序通讯。

使用OnStatus回调
在Windows Media Format SDK中，IWMStatusCallback::OnStatus 被很多对象调用。OnStatus接收SDK操作状态的变化。每种对象可能有不同的方式连接到IWMStatusCallback。

使用事件进行同步调用

#. 使用Platform SDK的API CreateEvent创建一个事件对象
#. 实现回调函数，，捕获事件，并且调用SetEvent函数标记事件对象
#. 在应用程序中调用WaitForSingleObject 、监视事件对象。如果你是在为Windows程序编写代码，你必须创建一个消息循环对用户操作做出相应。

使用上下文参数

Windows Media Format SDK的一些回调函数具有pvContext参数，这个值是你在异步操作启动时传递给对象的。通常，多个对象使用同一个回调时传递对象指针作为这个参数。

使用设置

设置的主要目的是描述其中的对象，以及对象之间的关系。不管是否使用编码/解码器，某些流需要配置才可以工作。流的配置信息可以用IWMCodecInfo3 接口的方法获得，但是不要手动配置一个使用了Windows Media编码/解码器的流。

创建/编辑设置的步骤

#. 创建空设置，或者打开旧设置
#. 配置每个流，如果需要的话，使用从编码/解码器获得的数据
#. 配置互斥（可选） 
#. 配置带宽共享（可选） 
#. 配置优先级（可选）

设计设置

选择编码方式
#. 1 pass Constant Bit Rate (CBR) 直播的唯一选择。以预定的码流率编码，并且质量最低。
#. 2-pass CBR 文件形式的流媒体，长度固定，质量比1-pass Constant Bit Rate (CBR)好 
#. 1-pass Variable Bit Rate (VBR) 需要指定质量时使用，本地播放或者下载后播放
#. 2-pass VBR – unconstrained 需要指定带宽时使用，但是真实带宽占用可以偏离指定带宽，本地播放或者下载后播放
#. 2-pass VBR – constrained 需要指定带宽时使用，但是真实带宽占用不能大于指定带宽，本地播放或者下载后播放

码流率 

除了数据之外，分包也要占用一定的带宽。如果流包含数据单位扩展，那么这将大大增加流的码流率。 同时，除了应用程序之外的任何连接都和应用程序共享网络带宽，所以不能认为应用程序可以完全使用客户的网络带宽。

配置流

如果流是视频/音频，使用Windows Media编码/解码器，那么你必须使用IWMCodecInfo3的方法从编码/解码器获得流配置对象。 如果流是其他类型，使用IWMProfile::CreateNewStream.创建一个新的流配置对象。 

每个流配置都必须设置名字、连接名和流序号（从1到63）。 可能会修改使用Windows Media编码/解码器的two-pass VBR 音频流的VBR设置。视频流无需修改配置。 

根据类型配置其他类型流。

所有的这种流需要设置比特率和缓冲窗口。 

使用IWMProfile::AddStream. 将流添加到媒体。 大部分设置可以通过IWMMediaProps访问。这些设置保存在WM_MEDIA_TYPE 结构中。对于音频和视频，WM_MEDIA_TYPE结构指针指向媒体特定的更多信息，通常是WAVEFORMATEX 或者WMVIDEOINFOHEADER结构。视频有第三个结构BITMAPINFOHEADER描述了视频的桢。

从编码/解码器获得流配置信息 

使用Windows Media编码/解码器的视频/音频流需要从编码/解码器获得流配置信息。尽管你可以自行设置这些配置，从编码/解码器获得流配置信息使得数据是准确的。除非文档推荐，否则不要修改获得的流配置信息。
可以从设置管理器的IWMCodecInfo, IWMCodecInfo2, 和IWMCodecInfo3接口获得信息。

枚举安装的编码/解码器

编码/解码器的编号从0开始，音频和视频的编码/解码器有独立的编号。

枚举编码/解码器支持的格式

配置音频流 

不要手动修改获得的配置的质量设置，而应该用IWMPropertyVault接口修改。 

音频流的缓冲窗口不应该设置得比视频流的缓冲窗口大，否则会造成播放不同步。通常，音频流的缓冲窗口是1.5-3秒,视频流的缓冲窗口是3-5秒。

配置视频流 

除非是RGB24数据，否则大小应该是4的倍数，否则会有非法格式/非法配置等错误。

配置屏幕流 

和视频流一样，但是如果复杂度设置为0，那么IWMVideoMediaProps::SetQuality设置的质量会被忽略。

图像流 

包含JPEG形式的图像数据。

视频流的定位性能 

可以使用IWMVideoMediaProps::SetMaxKeyFrameSpacing设置关键桢间隔。增加关键桢数目会降低视频质量。

未压缩的音视频格式 

不能用于流，必须手动设置带宽，缓冲窗口应该设为0

配置其他流 

通常，这种流只需要比特率和缓冲窗口和WM_MEDIA_TYPE 中的媒体主类型设置。但是某些类型的流还需要其他设置

脚本流 

WM_MEDIA_TYPE的成员formattype 要设置为WMFORMAT_Script，指明pbFormat成员指向一个WMSCRIPTFORMAT 结构。 只有一种脚本媒体类型，WMSCRIPTTYPE_TwoStrings。

文件传输流 

每个采样需要一个数据单位扩展，你需要实现一个数据单位扩展系统。 调用IWMStreamConfig2::AddDataUnitExtension添加数据单位扩展到流。 

.. code-block:: C++

    hr = pStreamConfig2->AddDataUnitExtension(CLSID_WMTPropertyFileName, -1, NULL, 0);

网页流

.. code-block:: C++

    WM_MEDIA_TYPE.majortype WMMEDIATYPE_Filetransfer. 
    WM_MEDIA_TYPE.subtype WMMEDIASUBTYPE_WebStream. 
    WM_MEDIA_TYPE.bFixedSizeSamples False. 
    WM_MEDIA_TYPE.bTemporalCompression True. 
    WM_MEDIA_TYPE.lSampleSize 0. 
    WM_MEDIA_TYPE.formattype WMFORMAT_WebStream. 
    WM_MEDIA_TYPE.pUnk NULL. 
    WM_MEDIA_TYPE.cbFormat sizeof(WMT_WEBSTREAM_FORMAT). 
    WM_MEDIA_TYPE.pbFormat 一个配置好的WMT_WEBSTREAM_FORMAT结构的指针. 
    WMT_WEBSTREAM_FORMAT.cbSampleHeaderFixedData sizeof(WMT_WEBSTREAM_SAMPLE_HEADER). 
    WMT_WEBSTREAM_FORMAT.wVersion 1. 
    WMT_WEBSTREAM_FORMAT.wreserved 0.
    
文本流

媒体类型WMMEDIATYPE_TEXT

计算比特率和缓冲窗口 

简单的办法是设置为数据长度/时间.但是图像和文件流可能突发数据很多,但是有很多空闲时间.缓冲窗口必须设置得足够大.需要的时候,可以适当增加这些值.

变码流率流

数据单位扩展

保存/重新使用配置

不要手动更改PRX文件。看起来很小的改变会使得配置无效。

互斥

流优先级

带宽共享

包大小

写ASF文件 

使用IWMWriter::SetProfile对写入对象进行设置。但是，设置了之后，对设置对象的修改不会自动反映到写入对象，除非再次调用IWMWriter::SetProfile。 设置写入对象会复位全部头属性，所以必须在设置之后再修改这些属性。

输入

设置对象中的每个连接有一个输入号。除非配置中有互斥流，否则每个流有一个连接。互斥流共享连接。 写入流时需要用输入号来区别每个流，所以必须用连接名字来判断每个流的输入号。

枚举输入格式

SDK可以对输入进行预处理来判断输入的格式是否支持。

设置输入格式

找到符合数据的输入格式之后，可以调用IWMWriter::SetInputProps让它可以被写入对象使用。对于视频流，必须设置桢的大小。

其他类型的流和预压缩流

其他类型的流无需设置。 预压缩流需要设置输入格式为NULL。这个设置必须在BeginWriting之前完成。同时需要调用IWMHeaderInfo3::AddCodecInfo设置预压缩流的格式。

BeginWriting之前,还可以用IWMWriterAdvanced2::SetInputSetting设置和流无关的设置。

元数据

使用写入对象的IWMHeaderInfo 或者IWMHeaderInfo2接口访问元数据。必须在IWMWriter::BeginWriting之前完成元数据的写入。 注意，如果创建了写入对象而没有释放，然后再创建写入对象，一些元数据会被复制到新的对象中。

写入采样

写入采样之前要调用IWMWriter::BeginWriting.

#. 用IWMWriter::AllocateSample分配缓冲区，并且获得其INSSBuffer接口
#. 用INSSBuffer::GetBuffer获得缓冲区地址
#. 复制数据到缓冲区中
#. 用INSSBuffer::SetLength设置复制的数据长度
#. 把缓冲区、输入编号和媒体时间传递给IWMWriter::WriteSample方法。音频数据持续时间是一样的，所以可以简单地在现有时间上加上一个常数。对于视频，需要根据桢率计算媒体时间。 WriteSample是异步调用，在下一次WriteSample调用之前可能没有结束。所以要在每次写入采样之前调用AllocateSample获取缓冲区对象。 所有采样写完之后，调用IWMWriter::EndWriting完成写入操作。 流数据应该几乎同时结束，否则某些流数据可能丢失。

写入压缩采样 

使用IWMWriterAdvanced::WriteStreamSample 替代IWMWriter::WriteSample。

写入图像采样

必须用IWMWriterAdvanced2::SetInputSetting设置图像质量g_wszJPEGCompressionQuality，范围从1到100。图像采样压缩比通常很大，所以要使用尝试的方法设置缓冲窗口大小。

强制关键桢

使用INSSBuffer3::SetProperty设置缓冲区对象的WM_SampleExtensionGUID_OutputCleanPoint为TRUE。