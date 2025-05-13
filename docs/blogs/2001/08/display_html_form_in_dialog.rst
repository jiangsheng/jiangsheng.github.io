在对话框中使用网页输入数据  
=====================================

.. post:: 2, Aug, 2001
   :tags: WebBrowser Control,DHTMLEdit
   :category: Microsoft Foundation Classes,Visual C++
   :author: me
   :nocomments:

.. _blog_display_html_form_dialog:

此对话框使用了IE5附带的DHTMLEdit控件。

--------------------
源代码
--------------------

^^^^^^^^^^^^^^^^^
头文件
^^^^^^^^^^^^^^^^^

.. code-block:: C++

    //{{AFX_INCLUDES()
    #include "dhtmledit\dhtmledit.h"
    //}}AFX_INCLUDES
    #if !defined(AFX_PARAMDLG_H__0655C0B1_BEAD_4F17_AAAC_506C1D07D073__INCLUDED_)
    #define AFX_PARAMDLG_H__0655C0B1_BEAD_4F17_AAAC_506C1D07D073__INCLUDED_

    #if _MSC_VER > 1000
    #pragma once
    #endif // _MSC_VER > 1000
    // ParamDlg.h : header file
    //
    class   CHtmlparam:public   CObject{
    public:
        CString m_strAlt;
        COleVariant m_varVal;
    };
    #define HTML_TAG_INPUT  _T("INPUT")
    #define HTML_TAG_SELECT _T("SELECT")
    #define HTML_ATTRIB_NAME    _T("NAME")
    #define HTML_ATTRIB_VALUE   _T("VALUE")
    #define HTML_ATTRIB_CHECKED _T("checked")
    #define HTML_ATTRIB_TYPE    _T("TYPE")
    #define HTML_ATTRIB_ALT _T("ALT")
    #define HTML_TYPE_CHECKBOX  _T("checkbox")
    /////////////////////////////////////////////////////////////////////////////
    // CParamDlg dialog
    CString HTMLElement_GetValueAttributeName(CHTMLElement* pel);
    CString HTMLElement_GetToolTipAttributeName(CHTMLElement*   pel);
    CString HTMLElement_GetIDOrName(CHTMLElement*   pel);
    BOOL    HTMLElement_IsInputElement(CHTMLElement*    pel);
    BOOL    HTMLElement_IsInputCheckBoxElement(CHTMLElement*    pel);

    class CParamDlg : public CDialog
    {
    // Construction
    public:
        CParamDlg(CWnd* pParent = NULL);   // standard constructor
        ~CParamDlg();
    // Dialog Data
        //{{AFX_DATA(CParamDlg)
        enum { IDD = IDD_PARAM_DLG };
        CDHTMLEdit  m_wndDhtmlEdit;
        //}}AFX_DATA
        CString m_strFilePath;
        CString m_strFileURL;
        COleVariant GetValue(CString    strName);
        void    GetValue(CString    strName,int& iVal);
        void    GetValue(CString    strName,long& lVal);
        void    GetValue(CString    strName,CString& strVal);
        void        SetValue(CString    strName,
            COleVariant varVal,
            LPCTSTR lpszAlt=NULL);//displayed as tooltip
        void        SetValue(CString    strName,
            int iVal,
            LPCTSTR lpszAlt=NULL);//displayed as tooltip
        void        SetValueBool(CString    strName,
            BOOL    bVal,
            LPCTSTR lpszAlt=NULL);//displayed as tooltip

    // Overrides
        // ClassWizard generated virtual function overrides
        //{{AFX_VIRTUAL(CParamDlg)
        protected:
        virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV support
        //}}AFX_VIRTUAL
    // Implementation
    protected:
        CMapStringToOb  m_mapNameToParam;
        BOOL    LoadValues();
        BOOL    SaveValues();
        // Generated message map functions
        //{{AFX_MSG(CParamDlg)
        virtual BOOL OnInitDialog();
        afx_msg void OnDocumentCompleteDhtmledit1();
        virtual void OnOK();
        DECLARE_EVENTSINK_MAP()
        //}}AFX_MSG
        DECLARE_MESSAGE_MAP()
    };

    //{{AFX_INSERT_LOCATION}}
    // Microsoft Visual C++ will insert additional declarations immediately before the previous line.

    #endif // !defined (AFX_PARAMDLG_H__0655C0B1_BEAD_4F17_AAAC_506C1D07D073__INCLUDED_)

^^^^^^^^^^^^^^^^^
源文件
^^^^^^^^^^^^^^^^^

.. code-block:: C++
	
    // ParamDlg.cpp : implementation file
    //

    #include "stdafx.h"
    #include <atlbase.h>
    #include <mshtml.h>
    #include <mshtmdid.h>
    #include "dhtmledit\htmlelementcollection.h"
    #include "dhtmledit\htmldocument2.h"
    #include "dhtmledit\htmlelement.h"
    #include "WorkBench.h"
    #include "ParamDlg.h"
    #include "global.h"
    #ifdef _DEBUG
    #define new DEBUG_NEW
    #undef THIS_FILE
    static char THIS_FILE[] = __FILE__;
    #endif

    /////////////////////////////////////////////////////////////////////////////
    // CParamDlg dialog


    CParamDlg::CParamDlg(CWnd* pParent /*=NULL*/)
        : CDialog(CParamDlg::IDD, pParent)
    {
        //{{AFX_DATA_INIT(CParamDlg)
        //}}AFX_DATA_INIT
        m_strFileURL.Empty();
        m_strFilePath.Empty();
        m_mapNameToParam.RemoveAll();
    }
    CParamDlg::~CParamDlg()
    {
        POSITION    pos=m_mapNameToParam.GetStartPosition();
        CString strKey;
        CObject*    pOb;
        while(pos){
            m_mapNameToParam.GetNextAssoc(pos,strKey,pOb);
            delete  pOb;
        }
    }

    void CParamDlg::DoDataExchange(CDataExchange* pDX)
    {
        CDialog::DoDataExchange(pDX);
        //{{AFX_DATA_MAP(CParamDlg)
        DDX_Control(pDX, IDC_DHTMLEDIT1, m_wndDhtmlEdit);
        //}}AFX_DATA_MAP
    }


    BEGIN_MESSAGE_MAP(CParamDlg, CDialog)
        //{{AFX_MSG_MAP(CParamDlg)
        //}}AFX_MSG_MAP
    END_MESSAGE_MAP()

    /////////////////////////////////////////////////////////////////////////////
    // CParamDlg message handlers

    BOOL CParamDlg::OnInitDialog()
    {
        CDialog::OnInitDialog();
    
        // TODO: Add extra initialization here
        COleVariant varFile,varPrompt;
        varPrompt.vt=VT_BOOL;
        varPrompt.boolVal=FALSE;
        if(!m_strFileURL.IsEmpty())
            varFile=m_strFileURL;
        else
            varFile=m_strFilePath;
        TRY{
            m_wndDhtmlEdit.LoadDocument(&varFile,&varPrompt);
        }
        CATCH(COleDispatchException,pEx)
        {
            CGlobal::ProcessOleDispatchException(pEx);
            return  FALSE;
        }
        AND_CATCH(CException,pEx)
        {
            CGlobal::ProcessException(pEx);
            return  FALSE;
        }
        END_CATCH
        return TRUE;  // return TRUE unless you set the focus to a control
                    // EXCEPTION: OCX Property Pages should return FALSE
    }

    BEGIN_EVENTSINK_MAP(CParamDlg, CDialog)
        //{{AFX_EVENTSINK_MAP(CParamDlg)
        ON_EVENT(CParamDlg, IDC_DHTMLEDIT1, 1 /* DocumentComplete */, OnDocumentCompleteDhtmledit1, VTS_NONE)
        //}}AFX_EVENTSINK_MAP
    END_EVENTSINK_MAP()

    void CParamDlg::OnDocumentCompleteDhtmledit1()
    {
        GetDlgItem(IDOK)->EnableWindow(TRUE);
        //read value from data
        LoadValues();
    }

    void CParamDlg::OnOK()
    {
        // TODO: Add extra validation here
        if(!SaveValues())return;   
        CDialog::OnOK();
    }

    BOOL    CParamDlg::LoadValues()
    {
        TRY{
            CHTMLElementCollection  ecAll=m_wndDhtmlEdit.GetDom().GetAll();
            long    lecLength=ecAll.GetLength();
            COleVariant varIndex,varTemp;//var2 is not used because accessing index,not name
            varIndex.vt=VT_I4;
            CString strElementID,strTemp;
            CHtmlparam* pHtmlparam;
            CObject*    pOb;
            for(int i=0;i<lecLength;i++){
                varIndex.lVal=i;
                CHTMLElement    el(ecAll.item(varIndex,varTemp));
                strTemp=HTMLElement_GetValueAttributeName(&el);
                if(!strTemp.IsEmpty()){//can have values
                    strElementID=HTMLElement_GetIDOrName(&el);
                    if(m_mapNameToParam.Lookup(strElementID,pOb)){//found
                        pHtmlparam=(CHtmlparam*)pOb;
                        el.setAttribute(strTemp,pHtmlparam->m_varVal,0);
                    }
                }
                strTemp=HTMLElement_GetToolTipAttributeName(&el);
                if(!strTemp.IsEmpty()){//can have ToolTip
                    varTemp=pHtmlparam->m_strAlt;
                    el.setAttribute(strTemp,varTemp,0);
                }

            }
        }
        CATCH(CException,pEx)
        {
            CGlobal::ProcessException(pEx);
            return  FALSE;
        }
        END_CATCH
        return  TRUE;
    }

    BOOL    CParamDlg::SaveValues()
    {
        TRY{
            CHTMLElementCollection  ecAll=m_wndDhtmlEdit.GetDom().GetAll();
            long    lecLength=ecAll.GetLength();
            COleVariant varIndex,varTemp;//var2 is not used because accessing index,not name
            varIndex.vt=VT_I4;
            CString strElementID,strTemp;
            CHtmlparam* pHtmlparam;
            CObject*    pOb;
            for(int i=0;i<lecLength;i++){
                varIndex.lVal=i;
                CHTMLElement    el(ecAll.item(varIndex,varTemp));
                varIndex.lVal=i;
                strTemp=HTMLElement_GetValueAttributeName(&el);
                if(!strTemp.IsEmpty()){//can have values
                    strElementID=HTMLElement_GetIDOrName(&el);
                    if(m_mapNameToParam.Lookup(strElementID,pOb)){//found
                        pHtmlparam=(CHtmlparam*)pOb;
                        varTemp=el.getAttribute(strTemp,0);
                    }
                    TRY{
                        pHtmlparam->m_varVal.ChangeType(pHtmlparam->m_varVal.vt,&varTemp);
                    }
                    CATCH(CException,pEx)
                    {
                        CGlobal::ProcessException(pEx);
                        el.InvokeHelper(DISPID_IHTMLELEMENT2_FOCUS,DISPATCH_METHOD, VT_EMPTY, NULL, NULL);
                        return  FALSE;
                    }
                    END_CATCH
                }
            }
        }
        CATCH(CException,pEx)
        {
            CGlobal::ProcessException(pEx);
            return  FALSE;
        }
        END_CATCH
        return  TRUE;
    }
    COleVariant CParamDlg::GetValue(CString strName)
    {
        COleVariant varRet;
        CHtmlparam* pHtmlparam;
        CObject*    pOb;
        if(m_mapNameToParam.Lookup(strName,pOb)){//found
            pHtmlparam=(CHtmlparam*)pOb;
            varRet=pHtmlparam->m_varVal;
        }
        return  varRet;
    }
    void    CParamDlg::GetValue(CString strName,int& iVal)
    {
        COleVariant var=GetValue(strName);
        var.ChangeType(VT_I4);
        iVal=var.iVal;
    }
    void    CParamDlg::GetValue(CString strName,long& lVal)
    {
        COleVariant var=GetValue(strName);
        var.ChangeType(VT_I4);
        lVal=var.lVal;
    }

    void    CParamDlg::GetValue(CString strName,CString& strVal)
    {
        COleVariant var=GetValue(strName);
        var.ChangeType(VT_BSTR);
        strVal=var.bstrVal;
    }


    void        CParamDlg::SetValue(CString strName,
        COleVariant varVal,
        LPCTSTR lpszAlt/*=NULL*/)//displayed as tooltip
    {
        COleVariant varRet;
        CHtmlparam* pHtmlparam;
        CObject*    pOb;
        if(m_mapNameToParam.Lookup(strName,pOb)){//found
            pHtmlparam=(CHtmlparam*)pOb;
        }
        else{
            pHtmlparam=new  CHtmlparam;
            m_mapNameToParam.SetAt(strName,pHtmlparam);
        }
        pHtmlparam->m_varVal=varVal;
        if(lpszAlt)
            pHtmlparam->m_strAlt=lpszAlt;
    }
    void        CParamDlg::SetValue(CString strName,
            int iVal,
            LPCTSTR lpszAlt/*=NULL*/)//displayed as tooltip
    {
        COleVariant var;
        var.vt=VT_I4;
        var.iVal=iVal;
        SetValue(strName,var,lpszAlt);
    }
    void        CParamDlg::SetValueBool(CString strName,
            BOOL    bVal,
            LPCTSTR lpszAlt/*=NULL*/)//displayed as tooltip
    {
        SetValue(strName,COleVariant((long)bVal,VT_BOOL),lpszAlt);
    }
    CString     HTMLElement_GetValueAttributeName(CHTMLElement* pel)
    {
        CString strValAttribName;
        CString strTagName=pel->GetTagName();
        if(!strTagName.CompareNoCase(HTML_TAG_INPUT)||!strTagName.CompareNoCase(HTML_TAG_SELECT)){
            strValAttribName=HTML_ATTRIB_VALUE;
        }
        if(HTMLElement_IsInputCheckBoxElement(pel))
            strValAttribName=HTML_ATTRIB_CHECKED;
        //to be continued
        return  strValAttribName;
    }

    CString     HTMLElement_GetToolTipAttributeName(CHTMLElement*   pel)
    {
        CString strTipAttribName;
        CString strTagName=pel->GetTagName();
        if(!strTagName.CompareNoCase(HTML_TAG_INPUT))
            strTipAttribName=HTML_ATTRIB_ALT;
        //to be continued
        return  strTipAttribName;
    }
    CString HTMLElement_GetIDOrName(CHTMLElement*   pel)
    {
        COleVariant varTemp;
        CString strElementID=pel->GetId();
        if(strElementID.IsEmpty()){
            varTemp=pel->getAttribute(HTML_ATTRIB_NAME,0);
            varTemp.ChangeType(VT_BSTR);
            strElementID=varTemp.bstrVal;
        }
        return  strElementID;
    }
    BOOL    HTMLElement_IsInputElement(CHTMLElement*    pel)
    {
        CString strTagName=pel->GetTagName();
        return  (!strTagName.CompareNoCase(HTML_TAG_INPUT));
    }
    BOOL    HTMLElement_IsInputCheckBoxElement(CHTMLElement*    pel)
    {
        BOOL    bRet=FALSE;
        if(HTMLElement_IsInputElement(pel)){
            COleVariant varTemp=pel->getAttribute(HTML_ATTRIB_TYPE,0);
            varTemp.ChangeType(VT_BSTR);
            CString strTemp=varTemp.bstrVal;
            if(!strTemp.CompareNoCase(HTML_TYPE_CHECKBOX))
                bRet=TRUE;
        }
        return  bRet;
    }

    * pHtmlparam;
    CObject* pOb;
    for(int i=0;i<lecLength;i++){
    varIndex.lVal=i;
    CHTMLElement el(ecAll.item(varIndex,varTemp));
    strTemp=HTMLElement_GetValueAttributeName(&el);
    if(!strTemp.IsEmpty()){//can have values
        strElementID=HTMLElement_GetIDOrName(&el);
        if(m_mapNameToParam.Lookup(strElementID,pOb)){//found
        pHtmlparam=(CHtmlparam*)pOb;
        el.setAttribute(strTemp,pHtmlparam->m_varVal,0);
        }
    }
    strTemp=HTMLElement_GetToolTipAttributeName(&el);
    if(!strTemp.IsEmpty()){//can have ToolTip
        varTemp=pHtmlparam->m_strAlt;
        el.setAttribute(strTemp,varTemp,0);
    }

    }
    }
    CATCH(CException,pEx)
    {
    CGlobal::ProcessException(pEx);
    return FALSE;
    }
    END_CATCH
    return TRUE;
    }

    BOOL CParamDlg::SaveValues()
    {
    TRY{
    CHTMLElementCollection ecAll=m_wndDhtmlEdit.GetDom().GetAll();
    long    lecLength=ecAll.GetLength();
    COleVariant varIndex,varTemp;//var2 is not used because accessing index,not name
    varIndex.vt=VT_I4;
    CString strElementID,strTemp;
    CHtmlparam* pHtmlparam;
    CObject* pOb;
    for(int i=0;i<lecLength;i++){
    varIndex.lVal=i;
    CHTMLElement el(ecAll.item(varIndex,varTemp));
    varIndex.lVal=i;
    strTemp=HTMLElement_GetValueAttributeName(&el);
    if(!strTemp.IsEmpty()){//can have values
        strElementID=HTMLElement_GetIDOrName(&el);
        if(m_mapNameToParam.Lookup(strElementID,pOb)){//found
        pHtmlparam=(CHtmlparam*)pOb;
        varTemp=el.getAttribute(strTemp,0);
        }
        TRY{
        pHtmlparam->m_varVal.ChangeType(pHtmlparam->m_varVal.vt,&varTemp);
        }
        CATCH(CException,pEx)
        {
        CGlobal::ProcessException(pEx);
        el.InvokeHelper(DISPID_IHTMLELEMENT2_FOCUS,DISPATCH_METHOD, VT_EMPTY, NULL, NULL);
        return FALSE;
        }
        END_CATCH
    }
    }
    }
    CATCH(CException,pEx)
    {
    CGlobal::ProcessException(pEx);
    return FALSE;
    }
    END_CATCH
    return TRUE;
    }
    COleVariant CParamDlg::GetValue(CString strName)
    {
    COleVariant varRet;
    CHtmlparam* pHtmlparam;
    CObject* pOb;
    if(m_mapNameToParam.Lookup(strName,pOb)){//found
    pHtmlparam=(CHtmlparam*)pOb;
    varRet=pHtmlparam->m_varVal;
    }
    return varRet;
    }
    void CParamDlg::GetValue(CString strName,int& iVal)
    {
    COleVariant var=GetValue(strName);
    var.ChangeType(VT_I4);
    iVal=var.iVal;
    }
    void CParamDlg::GetValue(CString strName,long& lVal)
    {
    COleVariant var=GetValue(strName);
    var.ChangeType(VT_I4);
    lVal=var.lVal;
    }

    void CParamDlg::GetValue(CString strName,CString& strVal)
    {
    COleVariant var=GetValue(strName);
    var.ChangeType(VT_BSTR);
    strVal=var.bstrVal;
    }


    void  CParamDlg::SetValue(CString strName,
    COleVariant varVal,
    LPCTSTR lpszAlt/*=NULL*/)//displayed as tooltip
    {
    COleVariant varRet;
    CHtmlparam* pHtmlparam;
    CObject* pOb;
    if(m_mapNameToParam.Lookup(strName,pOb)){//found
    pHtmlparam=(CHtmlparam*)pOb;
    }
    else{
    pHtmlparam=new CHtmlparam;
    m_mapNameToParam.SetAt(strName,pHtmlparam);
    }
    pHtmlparam->m_varVal=varVal;
    if(lpszAlt)
    pHtmlparam->m_strAlt=lpszAlt;
    }
    void  CParamDlg::SetValue(CString strName,
    int iVal,
    LPCTSTR lpszAlt/*=NULL*/)//displayed as tooltip
    {
    COleVariant var;
    var.vt=VT_I4;
    var.iVal=iVal;
    SetValue(strName,var,lpszAlt);
    }
    void  CParamDlg::SetValueBool(CString strName,
    BOOL bVal,
    LPCTSTR lpszAlt/*=NULL*/)//displayed as tooltip
    {
    SetValue(strName,COleVariant((long)bVal,VT_BOOL),lpszAlt);
    }
    CString  HTMLElement_GetValueAttributeName(CHTMLElement* pel)
    {
    CString strValAttribName;
    CString strTagName=pel->GetTagName();
    if(!strTagName.CompareNoCase(HTML_TAG_INPUT)||!strTagName.CompareNoCase(HTML_TAG_SELECT)){
    strValAttribName=HTML_ATTRIB_VALUE;
    }
    if(HTMLElement_IsInputCheckBoxElement(pel))
    strValAttribName=HTML_ATTRIB_CHECKED;
    //to be continued
    return strValAttribName;
    }

    CString  HTMLElement_GetToolTipAttributeName(CHTMLElement* pel)
    {
    CString strTipAttribName;
    CString strTagName=pel->GetTagName();
    if(!strTagName.CompareNoCase(HTML_TAG_INPUT))
    strTipAttribName=HTML_ATTRIB_ALT;
    //to be continued
    return strTipAttribName;
    }
    CString HTMLElement_GetIDOrName(CHTMLElement* pel)
    {
    COleVariant varTemp;
    CString strElementID=pel->GetId();
    if(strElementID.IsEmpty()){
    varTemp=pel->getAttribute(HTML_ATTRIB_NAME,0);
    varTemp.ChangeType(VT_BSTR);
    strElementID=varTemp.bstrVal;
    }
    return strElementID;
    }
    BOOL HTMLElement_IsInputElement(CHTMLElement* pel)
    {
    CString strTagName=pel->GetTagName();
    return (!strTagName.CompareNoCase(HTML_TAG_INPUT));
    }
    BOOL HTMLElement_IsInputCheckBoxElement(CHTMLElement* pel)
    {
    BOOL bRet=FALSE;
    if(HTMLElement_IsInputElement(pel)){
    COleVariant varTemp=pel->getAttribute(HTML_ATTRIB_TYPE,0);
    varTemp.ChangeType(VT_BSTR);
    CString strTemp=varTemp.bstrVal;
    if(!strTemp.CompareNoCase(HTML_TYPE_CHECKBOX))
    bRet=TRUE;
    }
    return bRet;

^^^^^^^^^^^^^^
对话框资源
^^^^^^^^^^^^^^

.. code-block::

    IDD_PARAM_DLG DIALOG DISCARDABLE  0, 0, 250, 110
    STYLE DS_MODALFRAME ¦ WS_POPUP ¦ WS_CAPTION ¦ WS_SYSMENU
    CAPTION "Dialog"
    FONT 10, "System"
    BEGIN
        PUSHBUTTON      "确定",IDOK,193,7,50,14,WS_DISABLED
        PUSHBUTTON      "取消",IDCANCEL,193,24,50,14
        CONTROL         "",IDC_DHTMLEDIT1,"{2D360200-FFF5-11D1-8D03-00A0C959BC0A}",
                        WS_TABSTOP,7,7,183,96
    END

^^^^^^^^^^^^^^
调用示例
^^^^^^^^^^^^^^

.. code-block:: C++

    void CCccXCommandHandler::OnReportSound() 
    {
        
        CParamDlg    ParamDlg;
        ParamDlg.m_strFilePath=g_GlobalData.AppPathFormat("Html","ReportSound.htm");
        long lSoundType=1;
        long lSoundCode=0;
        CString    strTelNum="123456";
        ParamDlg.SetValue("ReportSound_SoundType",lSoundType);
        ParamDlg.SetValue("ReportSound_SoundCode",lSoundCode);
        ParamDlg.SetValue("ReportSound_TelNum",strTelNum);
        if(ParamDlg.DoModal()!=IDOK)return;
        ParamDlg.GetValue("ReportSound_SoundType",lSoundType);
        ParamDlg.GetValue("ReportSound_SoundCode",lSoundCode);
        ParamDlg.GetValue("ReportSound_TelNum",strTelNum);
        CWaitCursor    ws;
        CheckReturnCode(m_pCccX->ReportSound(lSoundType,lSoundCode,strTelNum));
    }
