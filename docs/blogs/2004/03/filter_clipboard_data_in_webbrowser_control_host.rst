.. meta::
   :description: 在某些时候，可能需要覆盖剪贴板的数据，例如过滤聊天时在输入窗口粘贴非文字格式的信息。对于浏览器控件的编辑模式，浏览器提供了IDocHostUIHandler接口来支持粘贴时提供一个替代的数据源来覆盖剪贴板的数据。下面的代码描述了如何过滤除了CF_TEXT之外的剪贴板格式

在浏览器中粘贴时替换剪贴板数据
================================
.. post:: 20, Mar, 2004
   :tags: MSHTML, MFC, clipboard
   :category: UI
   :author: me
   :nocomments:

在某些时候，可能需要覆盖剪贴板的数据，例如过滤聊天时在输入窗口粘贴非文字格式的信息。对于浏览器控件的编辑模式，浏览器提供了IDocHostUIHandler接口来支持粘贴时提供一个替代的数据源来覆盖剪贴板的数据。下面的代码描述了如何过滤除了CF_TEXT之外的剪贴板格式

.. code-block:: C++

    //这是我对IDocHostUIHandler::FilterDataObject的实现
    HRESULT CHtmlCtrl::OnFilterDataObject(IDataObject * pDataObject, IDataObject ** ppDataObject)    
    {
        COleDataObject OleDataObject;
        OleDataObject.Attach(pDataObject,FALSE);
        COleDataSource* pOleDataSource=new COleDataSource;
        if(OleDataObject.IsDataAvailable(CF_TEXT)){
            // Get text data from ColeDataObject.
            HGLOBAL hGlobal=OleDataObject.GetGlobalData(CF_TEXT);
            pOleDataSource->CacheGlobalData(CF_TEXT,hGlobal);  
            //这里我简单地使用了原来的数据，你当然也可以替换掉这里的数据
        }
        REFIID riid=IID_IDataObject;
        pOleDataSource->ExternalQueryInterface(&riid,(LPVOID*)ppDataObject);
        OleDataObject.Detach();
        return S_OK;
    }

