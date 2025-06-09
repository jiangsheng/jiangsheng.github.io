.. meta::
   :description: [url=http://expert.csdn.net/expert/Topicview2.asp?id=2637982]讨论链接[/url] 问起过好多次的问题了，手头正好在做XML的生成，就写了一下 其实，缩进和换行就是文本,在需要的位置创建文本节点就可以了。另外一个方法就是用SAX来写

让msxml4导出的文本xml缩进和换行
====================================

.. post:: 6, Feb, 2004
   :tags: msxml, MFC
   :category: Win32
   :author: me
   :nocomments:


[url=http://expert.csdn.net/expert/Topicview2.asp?id=2637982]讨论链接[/url]
问起过好多次的问题了，手头正好在做XML的生成，就写了一下
其实，缩进和换行就是文本,在需要的位置创建文本节点就可以了。另外一个方法就是用SAX来写

可以这么写出来

.. code-block::C++

    void CChatEditDlg::SendContent(BSTR bstrContent)
    {
        CHARFORMAT2& rcf=m_wndSend.GetCharFormatSelection();
        CComBSTR bstrXML;
        USES_CONVERSION;

        try{
            IXMLDOMDocument2Ptr pDoc;
            IXMLDOMProcessingInstructionPtr pProcessingInstruction;
            IXMLDOMElementPtr pLog,pMessage;
            IXMLDOMElementPtr pFrom,pTo;
            IXMLDOMElementPtr pUser;
            IXMLDOMElementPtr pText;

            HRESULT hr = pDoc.CreateInstance(__uuidof(MSXML2::DOMDocument40));
            if(pDoc){
                pDoc->async = false;
                pDoc->resolveExternals = false;
                pDoc->validateOnParse = true;
            }
            //pProcessingInstruction=pDoc->createProcessingInstruction(_T("xml"),
            // _T("version=''1.0'' encoding=''UTF-16''"));
            //pDoc->appendChild(pProcessingInstruction);
            ///Log
            pLog=pDoc->createElement(_T("Log"));
            hr=pDoc->appendChild(pLog);
            AppendTextNode(pDoc,pLog,_T("\r\n\t"));
            ///Log/Message
            pMessage=pDoc->createElement(_T("Message"));
            hr=pLog->appendChild(pMessage);
            AppendTextNode(pDoc,pMessage,_T("\r\n\t"));

            COleDateTime t=COleDateTime::GetCurrentTime();
            COleDateTime td=t;
            td.m_dt=(int)td.m_dt;
            COleDateTime tt=t-td;
            ///Log/Message/@Date
            pMessage->setAttribute(L"Date",COleVariant(td));
            ///Log/Message/@Time
            pMessage->setAttribute(L"Time",COleVariant(tt));
            ///Log/Message/@DateTime
            pMessage->setAttribute(L"DateTime",COleVariant(t));
            ///Log/Message/@SessionID
            pMessage->setAttribute(L"SessionID",(long)1);
            ///Log/Message/From
            pFrom=pDoc->createElement(_T("From"));
            hr=pMessage->appendChild(pFrom);
            AppendTextNode(pDoc,pFrom,_T("\r\n\t\t"));
            ///Log/Message/From/User
            pUser=pDoc->createElement(_T("User"));
            hr=pFrom->appendChild(pUser);
            //AppendTextNode(pDoc,pUser,_T("\r\n\t\t"));
            AppendTextNode(pDoc,pFrom,_T("\r\n\t"));
            AppendTextNode(pDoc,pMessage,_T("\r\n\t"));
            ///Log/Message/From/User/@LogonName
            pUser->setAttribute(L"LogonName" ,_T("user1@somesite.com"));
            ///Log/Message/From/User/@FriendlyName
            pUser->setAttribute(L"FriendlyName" ,_T("user1"));
            ///Log/Message/To
            pTo=pDoc->createElement(_T("To"));
            hr=pMessage->appendChild(pTo);
            AppendTextNode(pDoc,pTo,_T("\r\n\t\t"));
            ///Log/Message/To/User
            pUser=pDoc->createElement(_T("User"));
            hr=pTo->appendChild(pUser);
            ///Log/Message/To/User/@LogonName
            pUser->setAttribute(L"LogonName" ,_T("user2@somesite.com"));
            ///Log/Message/To/User/@FriendlyName
            pUser->setAttribute(L"FriendlyName" ,_T("user2"));
            AppendTextNode(pDoc,pTo,_T("\r\n\t"));
            AppendTextNode(pDoc,pMessage,_T("\r\n\t"));
            ///Log/Message/Text
            pText=pDoc->createElement(_T("Text"));
            pText->put_text(bstrContent);
            hr=pMessage->appendChild(pText);
            pText->setAttribute(L"Style" ,(LPCTSTR)GetStyleAttrib(rcf));
            AppendTextNode(pDoc,pMessage,_T("\r\n"));
            //element
            //date property
            //time property
            //datetime property
            //SessionID property
            // element
            // element
            // LogonName property
            // FriendlyName property
            //
            // element
            // LogonName property
            // FriendlyName property
            // element
            // Style property
            // element
            //date property
            //time property
            //datetime property
            //SessionID property
            // element
            // element
            // LogonName property
            // FriendlyName property
            // element
            // element
            // Style property
            //element
            //date property
            //time property
            //datetime property
            //SessionID property
            // element
            // element
            // LogonName property
            // FriendlyName property
            pMessage->get_xml(&bstrXML);
            TRACE(_T("%s\r\n"),OLE2T(bstrXML));
        }
        catch(...){
            return ;
        }
    }
    void CChatEditDlg::AppendTextNode(IXMLDOMDocument2Ptr pDoc
        ,IXMLDOMElementPtr pElement
        ,LPCTSTR lpszText)
    {
        IXMLDOMNodePtr pTextNode=pDoc->createTextNode(lpszText);
        pElement->appendChild(pTextNode);
    }
