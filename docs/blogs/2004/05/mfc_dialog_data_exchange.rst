.. meta::
   :description: 对话框数据交换#

对话框数据交换
=========================

.. post:: 14, May, 2004
   :tags: MFC
   :category: Microsoft Foundation Classes, Visual C++
   :author: me
   :nocomments:

.. code-block:: C++

    //{{Jiangsheng的垃圾代码(对话框数据交换)
    class CDataTypeFieldExChange;
    //CTextFieldEdit是一个派生于CEdit，绑定到记录集字段的编辑框
    //lpszFieldName是绑定的字段的名称
    //vt是绑定的字段的类型
    void DDX_TextField(CDataTypeFieldExChange* pDX, int nIDC, CTextFieldEdit& rControl,
        LPCTSTR lpszFieldName,VARTYPE vt=VT_BSTR);
    //DDX_TextField的封装；自动从数据类型获取字段名称：描述/别名/标识字段；并且有简单的验证
    void DDX_InfoField(CDataTypeFieldExChange* pDX, int nIDC, CTextFieldEdit& rControl);
    void DDX_AliasField(CDataTypeFieldExChange* pDX, int nIDC, CTextFieldEdit& rControl);
    void DDX_IDField(CDataTypeFieldExChange* pDX, int nIDC, CTextFieldEdit& rControl);
    void DDX_AliasField(CDataTypeFieldExChange* pDX, int nIDC, CTextFieldEdit& rControl)
    {
        DDX_TextField(pDX,nIDC,rControl,pDX->m_pDTC->m_pDataType->m_strAliasField);
        switch(pDX->m_pDTC->m_adReason)
        {
            case adRsnAddNew:
            case adRsnUpdate:
            case adRsnDelete:

            if(pDX->m_pDX->m_bSaveAndValidate)
            {
                CString strText;
                rControl.GetWindowText(strText);
                if(strText.FindOneOf(T("/\\*?[]\"<>失望的脸"))!=-1){
                CString strTemp;
                strTemp.Format(_T("%s不能包含以下字符: / \\ * ? [ ] \" < > : |")
                    ,pDX->m_pDTC->m_pDataType->m_strAliasField);
                ::AfxMessageBox(strTemp);
                pDX->m_pDX->Fail();
            }
        }
    }

    void DDX_IDField(CDataTypeFieldExChange* pDX, int nIDC, CTextFieldEdit&? rControl)
    {
        if(pDX->m_pDX->m_bSaveAndValidate)
        {
            TRACE_LINE(_T("Ignore DDX for %s/%s")
            ,pDX->m_pDTC->m_pDataType->m_strDataType
            ,pDX->m_pDTC->m_pDataType->m_strIDField
            眨眼笑脸;
        }
        else
        {
            DDX_TextField(pDX,nIDC,rControl,pDX->m_pDTC->m_pDataType->m_strIDField);
        }
    }

    void DDX_InfoField(CDataTypeFieldExChange* pDX, int nIDC, CTextFieldEdit& rControl)
    {
        DDX_TextField(pDX,nIDC,rControl,pDX->m_pDTC->m_pDataType->m_strInfoField);
        switch(pDX->m_pDTC->m_adReason)
        {
            case adRsnAddNew:
            case adRsnUpdate:
            case adRsnDelete:
                if(pDX->m_pDX->m_bSaveAndValidate)
                {
                    CString strText;
                    rControl.GetWindowText(strText);
                    if(strText.IsEmpty())
                    {
                        CString strTemp;
                        strTemp.Format(_T("%s不能为空！"),pDX->m_pDTC->m_pDataType->m_strInfoField);
                        ::AfxMessageBox(strTemp);
                        pDX->m_pDX->Fail();
                    }
                    if(strText.FindOneOf(T("/\\*?[]\"<>失望的脸"))!=-1)
                    {
                        CString strTemp;
                        strTemp.Format(_T("%s不能包含以下字符: / \\ * ? [ ] \" < > : |",pDX->m_pDTC->m_pDataType->m_strInfoField));
                        ::AfxMessageBox(strTemp);
                        pDX->m_pDX->Fail();
                    }

                }
                else{
                    if(!pDX->m_pDTC->m_strAddNew.IsEmpty())
                    {
                        rControl.SetWindowText(pDX->m_pDTC->m_strAddNew);
                    }
                }
        }
    }

    void DDX_TextField(CDataTypeFieldExChange* pDX
         , int nIDC
         , CTextFieldEdit& rControl
         ,LPCTSTR lpszFieldName
         ,VARTYPE vt//=VT_BSTR
    )
    {
        FieldsPtr?pFields=pDX->m_pRecordset->Fields;
        CString strFieldName(lpszFieldName);
        CDataType* pDT=pDX->m_pDTC->m_pDataType;

        CString strVal;
        if (!pDX->m_pDX->m_bSaveAndValidate)
        {
            switch(pDX->m_pDTC->m_adReason)
            {
                case adRsnAddNew:
                case adRsnUpdate:
                case adRsnDelete:
                if(!strFieldName.IsEmpty()){
                    strVal=g_GetValueString(pFields->Item[lpszFieldName]->Value);
                }
                else{
                    ASSERT(FALSE);
                }
            }
        }
        DDX_Control(pDX->m_pDX,nIDC,rControl);
        DDX_Text(pDX->m_pDX,nIDC,strVal);

        if(pDX->m_pDX->m_bSaveAndValidate)
        {
            switch(pDX->m_pDTC->m_adReason)
            {
                case adRsnAddNew:
                case adRsnUpdate:
                case adRsnDelete:
                {
                    _variant_t varVal;
                    if(g_SetValueString(varVal,strVal,vt))
                    {
                        TRACE_LINE(_T("Set Field %s to %s\n"),lpszFieldName,strVal);
                        if(!strFieldName.IsEmpty()){
                            pFields->Item[lpszFieldName]->Value=varVal;
                        }
                        else{
                            ASSERT(FALSE);
                        }
                    }
                }
            }
        }
        else{
            //编辑框的前一个控件是其标题，其文字从数据库中的类型定义获得
            CWnd* pStatic=rControl.GetNextWindow(GW_HWNDPREV);
            CString strCaption=pDT->GetFieldProperty(lpszFieldName,_T("Caption"));
            if(pStatic&&!strCaption.IsEmpty())
            {
                pStatic->SetWindowText(strCaption);
            }
            rControl.SetClientTipText(pDT->GetFieldProperty(lpszFieldName,_T("Comments")));
        }
    }
    //}}End Jiangsheng的垃圾代码(对话框数据交换)
