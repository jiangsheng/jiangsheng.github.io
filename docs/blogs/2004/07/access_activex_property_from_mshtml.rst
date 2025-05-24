.. meta::
   :description: 111222的CSDN文档中心文章 用 MSHTML 的一点经验（https://web.archive.org/web/20051126180205/http://dev.csdn.net/develop/article/10/10456.shtm） 说明了如何访问在HTML文档对象模型中的网页的元素、内容。但是，有

如何: 通过HTML文档对象模型访问文档中的ActiveX控件的属性
=======================================================

.. post:: 13, Jul, 2004
   :tags: WebBrowser Control, MFC
   :category: Microsoft Foundation Classes, MSHTML
   :author: me
   :nocomments:
   
.. _blog_access_activex_property_from_mshtml:

111222的CSDN文档中心文章 用 MSHTML 的一点经验（https://web.archive.org/web/20051126180205/http://dev.csdn.net/develop/article/10/10456.shtm） 说明了如何访问在HTML文档对象模型中的网页的元素、内容。但是，有时候开发者实际上需要访问的是网页中ActiveX控件的属性、方法和事件。例如，你在网页载入之后需要修改/获取MediaPlayer的媒体源，以及控制MediaPlayer的播放。

-----------------
更多信息
-----------------

为获得ActiveX控件的接口,我们需要访问文档对象模型。获得文档接口的方法多种多样，比如CHtmlView::GetHtmlDocument,IWebBrowser2::get_Document，IHTMLWindow2::get_document等等，参见111222的文档。这里我直接用一个函数GetDHtmlDocument表示获得这个接口的函数。你可以自己实现这个函数。

通常，我们给控件一个在文档中唯一的ID以便于访问。首先我们要在文档里面找到这个元素，使用ID作为参数。

示例代码： （参考了MFC7.0的源代码）

.. code-block:: C++

    // Document modified at : Sunday, August 18, 2002 11:04:50 AM , by user : Jiangsheng , from computer : KFB
    //通过名字访问元素接口

    HRESULT CDHtmlDialog::GetElement(LPCTSTR szElementId, IHTMLElement **pphtmlElement)
    {
        return GetElementInterface(szElementId, __uuidof(IHTMLElement), (void **) pphtmlElement);
    }
    //通过名字访问元素接口的辅助函数，用于返回指定类型的接口
    HRESULT CDHtmlDialog::GetElementInterface(LPCTSTR szElementId, REFIID riid, void **ppvObj)
    {
        HRESULT hr = E_NOINTERFACE;
        *ppvObj = NULL;
        CComPtr<IDispatch> spdispElem;

        hr = GetElement(szElementId, &spdispElem);

        if (spdispElem)
            hr = spdispElem->QueryInterface(riid, ppvObj);
        return hr;
    }
    //通过名字访问元素接口的辅助函数，用于访问指定ID的元素接口。如果pBCollection返回TRUE,则返回的是一个IHtmlElementCollection集合，表示指定ID/名称的网页元素不止一个。
    HRESULT CDHtmlDialog::GetElement(LPCTSTR szElementId, IDispatch **ppdisp,
                                     BOOL *pbCollection /*= NULL*/)
    {
        CComPtr<IHTMLElementCollection> sphtmlAll;
        CComPtr<IHTMLElementCollection> sphtmlColl;
        CComPtr<IDispatch> spdispElem;
        CComVariant varName;
        CComVariant varIndex;
        HRESULT hr = S_OK;
        CComPtr<IHTMLDocument2> sphtmlDoc;
        USES_CONVERSION;

        *ppdisp = NULL;

        if (pbCollection)
            *pbCollection = FALSE;

        hr = GetDHtmlDocument(&sphtmlDoc);
        if (sphtmlDoc == NULL)
            return hr;

        varName.vt = VT_BSTR;
        varName.bstrVal = T2BSTR(szElementId);
        if (!varName.bstrVal)
        {
            hr = E_OUTOFMEMORY;
            goto Error;
        }

        hr = sphtmlDoc->get_all(&sphtmlAll);
        if (sphtmlAll == NULL)
            goto Error;
        hr = sphtmlAll->item(varName, varIndex, &spdispElem);
        if (spdispElem == NULL)
        {
            hr = E_NOINTERFACE;
            goto Error;
        }

        spdispElem->QueryInterface(__uuidof(IHTMLElementCollection), (void **) &sphtmlColl);
        if (sphtmlColl)
        {
            if (pbCollection)
                *pbCollection = TRUE;
    #ifdef _DEBUG
            else
            {
                TRACE(traceHtml, 0, "Warning: duplicate IDs or NAMEs./n");
                ATLASSERT(FALSE);
            }
    #endif

        }
    Error:
        if (SUCCEEDED(hr))
        {
            *ppdisp = spdispElem;
            if (spdispElem)
                (*ppdisp)->AddRef();
        }
        return hr;
    }

然后我们要访问对象的属性、方法和事件，这就需要从IHtmlElement接口获得对象的接口，这里通过IHtmlObjectElement来访问
//获得ActiveX控件接口，注意ActiveX控件接口和HTML对象元素接口不是同一个接口，你不能直接使用IHtmlObjectElement接口来访问控件

.. code-block:: C++

    HRESULT CDHtmlDialog::GetControlDispatch(LPCTSTR szId, IDispatch **ppdisp)
    {
        HRESULT hr = S_OK;
        CComPtr<IDispatch> spdispElem;

        hr = GetElement(szId, &spdispElem);

        if (spdispElem)
        {
            CComPtr<IHTMLObjectElement> sphtmlObj;

            hr = spdispElem.QueryInterface(&sphtmlObj);
            if (sphtmlObj)
            {
                spdispElem.Release();
                hr = sphtmlObj->get_object(ppdisp);
            }
        }
        return hr;
    }

有了Active控件的接口，下面的工作就简单多了，举例来说，如果要访问控件的指定名字的无参数属性，只需简单的调用IDispatch接口的GetIDsOfNames获得属性的DispID,然后调用Invoke方法取得属性

.. code-block:: C++

    //获得控件属性，通过名字访问
    VARIANT CDHtmlDialog::GetControlProperty(LPCTSTR szId, LPCTSTR szPropName)
    {
        CComVariant varEmpty;
        CComPtr<IDispatch> spdispElem;

        GetControlDispatch(szId, &spdispElem);
        if (!spdispElem)
            return varEmpty;

        DISPID dispid;
        USES_CONVERSION;
        LPOLESTR pPropName = (LPOLESTR)T2COLE(szPropName);
        HRESULT hr = spdispElem->GetIDsOfNames(IID_NULL, &pPropName, 1, LOCALE_USER_DEFAULT, &dispid);
        if (SUCCEEDED(hr))
            return GetControlProperty(spdispElem, dispid);
        return varEmpty;
    }
    //设置控件属性，通过名字访问
    void CDHtmlDialog::SetControlProperty(LPCTSTR szElementId, LPCTSTR szPropName, VARIANT *pVar)
    {
        CComPtr<IDispatch> spdispElem;
        GetControlDispatch(szElementId, &spdispElem);
        if (!spdispElem)
            return;
        DISPID dispid;
        USES_CONVERSION;
        LPOLESTR pPropName = (LPOLESTR)T2COLE(szPropName);
        HRESULT hr = spdispElem->GetIDsOfNames(IID_NULL, &pPropName, 1, LOCALE_USER_DEFAULT, &dispid);
        if (SUCCEEDED(hr))
            SetControlProperty(spdispElem, dispid, pVar);
    }
    //获得控件属性的辅助函数，通过DispID访问
    VARIANT CDHtmlDialog::GetControlProperty(LPCTSTR szId, DISPID dispid)
    {
        CComPtr<IDispatch> spdispElem;

        GetControlDispatch(szId, &spdispElem);
        return GetControlProperty(spdispElem, dispid);
    }
    //设置控件属性的辅助函数，通过DispID访问
    void CDHtmlDialog::SetControlProperty(LPCTSTR szElementId, DISPID dispid, VARIANT *pVar)
    {
        CComPtr<IDispatch> spdispElem;
        GetControlDispatch(szElementId, &spdispElem);

        SetControlProperty(spdispElem, dispid, pVar);
    }

    //获得控件属性的实现函数
    VARIANT CDHtmlDialog::GetControlProperty(IDispatch *pdispControl, DISPID dispid)
    {
        VARIANT varRet;
        varRet.vt = VT_EMPTY;
        if (pdispControl)
        {
            DISPPARAMS dispparamsNoArgs = { NULL, NULL, 0, 0 };
            pdispControl->Invoke(dispid, IID_NULL, LOCALE_USER_DEFAULT,
                DISPATCH_PROPERTYGET, &dispparamsNoArgs, &varRet, NULL, NULL);
        }
        return varRet;
    }

    //设置控件属性的实现函数
    void CDHtmlDialog::SetControlProperty(IDispatch *pdispControl, DISPID dispid, VARIANT *pVar)
    {
        if (pdispControl != NULL)
        {
            DISPPARAMS dispparams = {NULL, NULL, 1, 1};
            dispparams.rgvarg = pVar;
            DISPID dispidPut = DISPID_PROPERTYPUT;
            dispparams.rgdispidNamedArgs = &dispidPut;

            pdispControl->Invoke(dispid, IID_NULL,
                    LOCALE_USER_DEFAULT, DISPATCH_PROPERTYPUT,
                    &dispparams, NULL, NULL, NULL);
        }
    }

实际上，这样的方法效率比较低，因为每次访问都要调用GetIDsOfNames，而GetIDsOfNames是一个很慢的调用。为了优化程序效率，你可以缓存得到的名字->DispID映射，但是推荐的方法是使用类向导(Class Wizard)的从类型库添加类(New Class->From a type library)的功能把控件导入到工程，通过类向导自动生成的COleDispatchDriver派生类来访问属性和方法。这种方法直接使用类型库中生成的DispID来访问属性、方法和事件，所以速度比前面的每次都要调用GetIDsOfNames的方法要快得多。

下面是生成的COleDispatchDriver派生类部分代码示例：

.. code-block:: C++
        
    CString CSomeObject::GetText()
    {
        CString result;
        InvokeHelper(0x18, DISPATCH_PROPERTYGET, VT_BSTR, (void*)&result, NULL);
        return result;
    }

    void CSomeObject::SetText(LPCTSTR lpszNewValue)
    {
        static BYTE parms[] =
        VTS_BSTR;
        InvokeHelper(0x18, DISPATCH_PROPERTYPUT, VT_EMPTY, NULL, parms,
        lpszNewValue);
    }

    LPDISPATCH CSomeObject::createNode(const VARIANT& type, LPCTSTR name, LPCTSTR namespaceURI)
    {
        LPDISPATCH result;
        static BYTE parms[] =
        VTS_VARIANT VTS_BSTR VTS_BSTR;
        InvokeHelper(0x36, DISPATCH_METHOD, VT_DISPATCH, (void*)&result, parms,
        &type, name, namespaceURI);
        return result;
    }

另外一个好处是显而易见的，你可以把麻烦的工作(查找DispID并且调用Invoke)扔给类向导来做，你只需要使用类向导自动生成的类就可以了。

如果你还要处理控件的事件，你应该参考MSDN中的这篇文章

Handling HTML Element Events (https://web.archive.org/web/20000302194454/http://msdn.microsoft.com/workshop/browser/mshtml/tutorials/sink.asp)

捕获ActiveX控件的事件的方法基本和文章中一样，只是你需要捕获事件对象的接口应该是控件接口，而不是元素接口。获得控件的IDispatch接口的方法前面已经说过了。

顺便说一下，在HTML编程中容易犯的错误是混用不同类型的接口，比如

.. code-block:: C++

    IHTMLElement *pElem = NULL;
    if(pAllElem->item(name, name, (LPDISPATCH*)&pElem)==S_OK)
    {
        //......
    }

注意，虽然微软的文档说IHTMLElement是从IDispatch派生的(Inherits from IDispatch)，但是这并不代表一些返回IDispatch的方法返回的就是派生的接口，上面的代码就是犯了这个错误，把返回的接口直接当IHTMLElement接口用，可能会出错。正确的访问方式应该是调用返回的IDispatch的QueryInterface接口以获得指定类型的接口指针。参见CDHtmlDialog::GetElement的代码。

参考

* :ref:`在对话框中使用网页输入数据  <blog_display_html_form_dialog>`
