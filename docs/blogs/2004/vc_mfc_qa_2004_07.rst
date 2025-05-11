
VC/MFC Q&A 200407 
===============================

.. post:: 13, Jul, 2004
   :tags: Q&A, MFC
   :category: Microsoft Foundation Classes, CSDN
   :author: jiangshengvc
   :nocomments:

.. _blog_vc_mfc_qa_2004_07:

问:自编浏览器进入一个网页后,点一个链接后系统自动调用用IE打开网页而不是用自身浏览器打开网页。如何让窗口用我自己的浏览器打开？

答：参考\ :ref:`控制新的窗口 <blog_hosting_mshtml_update>`\ 。默认情况下，浏览器收到创建新窗口请求时，会在IE中打开新的窗口。你可以处理NewWindow2事件来在自己指定的窗口中打开请求的页面。

问：如何枚举系统中视频捕获设备(摄像头)的设备名称

答：以下代码来自DirectX9 SDK中的AMCAP示例

.. code-block:: c++

    // put all installed video and audio devices in the menus
    //
    void AddDevicesToMenu()
    {
        //……
        // enumerate all video capture devices
        ICreateDevEnum *pCreateDevEnum=0;
        hr = CoCreateInstance(CLSID_SystemDeviceEnum, NULL, CLSCTX_INPROC_SERVER,
                            IID_ICreateDevEnum, (void**)&pCreateDevEnum);
        if(hr != NOERROR)
        {
            ErrMsg(TEXT("Error Creating Device Enumerator"));
            return;
        }

        IEnumMoniker *pEm=0;
        hr = pCreateDevEnum->CreateClassEnumerator(CLSID_VideoInputDeviceCategory, &pEm, 0);
        if(hr != NOERROR)
        {
            ErrMsg(TEXT("Sorry, you have no video capture hardware./r/n/r/n")
                TEXT("Video capture will not function properly."));
            goto EnumAudio;
        }

        pEm->Reset();
        ULONG cFetched;
        IMoniker *pM;

        while(hr = pEm->Next(1, &pM, &cFetched), hr==S_OK)
        {
            IPropertyBag *pBag=0;

            hr = pM->BindToStorage(0, 0, IID_IPropertyBag, (void **)&pBag);
            if(SUCCEEDED(hr))
            {
                VARIANT var;
                var.vt = VT_BSTR;
                hr = pBag->Read(L"FriendlyName", &var, NULL);
                if(hr == NOERROR)
                {
                    AppendMenu(hMenuSub, MF_STRING, MENU_VDEVICE0 + uIndex,
                        W2T(var.bstrVal));

                    if(gcap.pmVideo != 0 && (S_OK == gcap.pmVideo->IsEqual(pM)))
                        bCheck = TRUE;

                    CheckMenuItem(hMenuSub,  MENU_VDEVICE0 + uIndex,
                        (bCheck ? MF_CHECKED : MF_UNCHECKED));
                    EnableMenuItem(hMenuSub, MENU_VDEVICE0 + uIndex,
                        (gcap.fCapturing ? MF_DISABLED : MF_ENABLED));
                    bCheck = FALSE;

                    SysFreeString(var.bstrVal);

                    ASSERT(gcap.rgpmVideoMenu[uIndex] == 0);
                    gcap.rgpmVideoMenu[uIndex] = pM;
                    pM->AddRef();
                }
                pBag->Release();
            }

            pM->Release();
            uIndex++;
        }
        pEm->Release();
        //...

问：我目前使用 BCG 中的　CBCGPPropList　来实现某一个东西的属性，可是有一项数据特别大，大约500个字符，我希望能把这一项的高度调整可是不知道如何处理，不知道能单独调整其中一项吗

答：从CBCGPProp派生一个函数，重载OnEdit并在其中创建一个需要的大小的编辑框。最后Add自定义的prop类对象。具体实现可以参照CBCGPColorProp和CBCGPFontProp类的实现

问：我想实现一个功能，就是检测一个目录或文件，看它是否存在，如果不存在就创建这个目录或文件。

答：可以用Win32文件查找来查找文件或者文件夹是否存在，也可以用PathFileExists来判断。GetFileAttributes和PathIsDirectory可以用于判断文件是否是目录。创建文件可以用CreateDirectory或者MakeSureDirectoryPathExists。

.. code-block:: c++

    bool FileExists(CString FileName)
    {
        WIN32_FIND_DATA FindFileData;
        HANDLE hFind;
        bool FindFlag=false;

        hFind = FindFirstFile(FileName , &FindFileData);

        if (hFind == INVALID_HANDLE_VALUE) {
            FindFlag= false;
        }
        else
        {
            FindFlag=true;
        }
        FindClose(hFind);
        return FindFlag;
    }

    DWORD  dwFlag = GetFileAttributes(pathname);
    if ( 0xFFFFFFFF == dwFlag ) 
        {
            //不存在
        }
    if (  FILE_ATTRIBUTE_DIRECTORY & dwFlag ) 
        {
            // 是文件夹
        }
    else
        {
            // 是文件
        }

问：请教一下，html中如果已知Activex的classid，有什么办法可以直接找到它？ 通过id来查找比较慢，所以问一下可否通过这种方式？取得IOleObject之后，我需要如何做才可以调用Activex控件中的函数呢？

答：由于控件所在容器是HTMLDocument对象，你可以用IOleContainer::EnumObjects枚举里面的OLE对象，包括控件和框架

.. code-block:: c++

    IOleContainer* pContainer;
    // Get the container
    HRESULT hr = pHtmlDoc2->QueryInterface(IID_IOleContainer,(void**)&pContainer);
    lpDisp->Release();
    if (FAILED(hr))
        return hr;
    IEnumUnknown* pEnumerator;
    // Get an enumerator for the frames
    hr = pContainer->EnumObjects(OLECONTF_EMBEDDINGS, &pEnumerator);
    pContainer->Release();
    if (FAILED(hr))
        return hr;
    IUnknown* pUnk;
    ULONG uFetched;
    // Enumerate and refresh all the frames
    for (UINT i = 0; S_OK == pEnumerator->Next(1, &pUnk, &uFetched); i++)
    {
        // QI for IOleObject here to see if we have an embedded browser
        IOleObject* pOleObject;
        hr = pUnk->QueryInterface(IID_IOleObject, (void**)&pOleObject);
        pUnk->Release();
        if (SUCCEEDED(hr))
        {
            CLSID clsID;
            pOleObject->GetUserClassID(&clsID);
        }
    }
    pEnumerator->Release();

控件的IOleObject接口是用来查询控件的CLSID的。你应该查询控件的IDispatch接口，然后参考\ :ref:`如何: 通过HTML文档对象模型访问文档中的ActiveX控件的属性 <blog_access_activex_property_from_mshtml>`\ 这篇来访问ActiveX的成员属性或函数。

问：已知PIDL怎么得到他对应的IShellFolder指针呢

答：用SHBindtoParent就可以了

.. code-block:: c++

    IShellFolder *psfParent; //A pointer to the parent folder object's IShellFolder interface
    LPITEMIDLIST pidlItem = NULL; //the item's PIDL
    LPITEMIDLIST pidlRelative = NULL; //the item's PIDL relative to the parent folder
    STRRET str; //the display name's STRRET structure
    TCHAR szDisplayName[MAX_PATH]; //the display name's string

    HRESULT hres = SHBindToParent(pidlItem, IID_IShellFolder, &psfParent, &pidlRelative);
    if(SUCCEEDED(hres))
    {
        psfParent->GetDisplayNameOf(pidlRelative, SHGDN_NORMAL, &str);
        psfParent->Release();
        StrRetToBuf(&str, pidlItem, szDisplayName, ARRAYSIZE(szDisplayName));
    }


问：如何handle IE的textsize changed event? 我想在用户改变text size 时做些处理，请问该如何handle，在哪个事件中做？谢谢指教。

答：sink HtmlDocument对象的IOleCommandTaget接口。

问：  

.. code-block:: c++

    IStream *pStream; CString mString; 

怎么样才能把pStream的内容赋给mString呢？

答：下面的代码把一个内存流读到字节数组。你可以根据字符串的类型把字节数组转化成字符串。

.. code-block:: c++

    COleStreamFile osfRead;
    osfRead.Attach(pStream);
    long lLength=osfRead.GetLength();
    CByteArray baBuf;
    baBuf.SetSize(lLength);
    osfRead.Read(baBuf.GetData(),lLength);

问：我Create了一个ListControl用来显示文件列表？怎么实现有图标的文件显示阿？

答：SHGetFileInfo可以返回系统图像列表，里面包含每一种文件类型的图标。参见\ :ref:`使用虚列表和自画实现文件夹的缩略图显示 <thumbnail_folder_view_using_list_control>`\ 。

问题：如何编写无界面的HTML解析器？

答：walkall示例就是一个无界面的HTML解析器。（https://web.archive.org/web/19990825084907/http://msdn.microsoft.com/downloads/samples/internet/browser/walkall/default.asp）

问：用AfxBeginThread创建的线程除了调用AfxEndThread还可以用什么函数关闭？

答：可以从外部用事件通知来优雅地结束线程

启动线程

.. code-block:: c++

    m_pThreadWrite=AfxBeginThread(ThreadProc,(LPVOID)this);

线程体。为了避免在静态函数中引用对象指针的麻烦，调用对象参数的线程体成员函数。

.. code-block:: c++
    
    UINT CMyClass::ThreadProc(LPVOID lp)
    {
        CMicrophoneInput* pInput=(CMicrophoneInput*)lp;
        return pInput->Run();
    }

简单的循环检测退出标志

.. code-block:: c++

    UINT CMyClass::Run()
    {
        HRESULT hr;
        if(!InitInstance()){
            TRACE("InitInstance failed/r/n";
            return ExitInstance();
        }
        while(!IsKilling()){
        //do something
        }
        return ExitInstance();
    }

重设退出标志

.. code-block:: c++

    BOOL CMyClass::InitInstance()
    {
        m_eventKill.ResetEvent();
        m_eventDead.ResetEvent();
        //do something
        return TRUE;
    }

设已退出标志

.. code-block:: c++

    UINT CMyClass::ExitInstance()
    {
        //do something
        m_eventDead.SetEvent();
        return 0;
    }

检查退出标志

.. code-block:: c++

    BOOL CMyClass::IsDead()
    {
        return WaitForSingleObject(m_eventDead,0)==WAIT_OBJECT_0;
    }
    BOOL CMyClass::IsKilling()
    {
        return WaitForSingleObject(m_eventKill,0)==WAIT_OBJECT_0;
    }

在外部可以这样终止线程

.. code-block:: c++

    //check if dead
    if(!IsDead()&&m_pThreadWrite!=NULL){
        m_eventKill.SetEvent();
        WaitForSingleObject(m_eventDead,INFINITE);
        m_pThreadWrite=NULL;
    }

问：怎么实现IEnumString接口？
答：

IAutoComplete and custom IEnumString implementation for WTL dialogs- CodeProject （https://web.archive.org/web/20241114092119/http://www.codeproject.com/KB/wtl/CustomAutoComplete_wtl.aspx）

下面是我的基于数据库的IEnumString实现

.. code-block:: c++

    if !defined(AFX_ENUMSTRING_H__4D5D61AD_CD0D_477C_880F_8E5EEB5B1E8F__INCLUDED_)
    #define AFX_ENUMSTRING_H__4D5D61AD_CD0D_477C_880F_8E5EEB5B1E8F__INCLUDED_

    #if _MSC_VER > 1000
    #pragma once
    #endif // _MSC_VER > 1000
    // EnumString.h : header file
    //

    /////////////////////////////////////////////////////////////////////////////
    // CEnumString command target
    #include <shldisp.h>
    #include "esuihelper.h"

    class _ES_UI_EXPORT CEnumString : public IEnumString
    {
        public:
        CEnumString();           // protected constructor used by dynamic creation
        // Attributes
        public:
        ULONG m_nRefCount;
        // Operations
        public:
        STDMETHODIMP_(ULONG) AddRef();
        STDMETHODIMP_(ULONG) Release();
        STDMETHODIMP QueryInterface(REFIID riid, void** ppvObject);

        STDMETHODIMP Next(ULONG celt, LPOLESTR* rgelt, ULONG* pceltFetched);
        STDMETHODIMP Skip(ULONG celt);
        STDMETHODIMP Reset(void);
        STDMETHODIMP Clone(IEnumString** ppenum);
        BOOL Bind(HWND p_hWndEdit, DWORD p_dwOptions = 0, LPCTSTR p_lpszFormatString = NULL);
        VOID Unbind();
        // Overrides
        // ClassWizard generated virtual function overrides
        //{{AFX_VIRTUAL(CEnumString)
        //}}AFX_VIRTUAL

        // Implementation
        protected:
        virtual ~CEnumString();
        CComPtr<IAutoComplete> m_pac;
        BOOL m_fBound;
        // Generated message map functions
        //{{AFX_MSG(CEnumString)
        // NOTE - the ClassWizard will add and remove member functions here.
        //}}AFX_MSG

    };

    /////////////////////////////////////////////////////////////////////////////

    //{{AFX_INSERT_LOCATION}}
    // Microsoft Visual C++ will insert additional declarations immediately before the previous line.

    #endif // !defined(AFX_ENUMSTRING_H__4D5D61AD_CD0D_477C_880F_8E5EEB5B1E8F__INCLUDED_)
    // EnumString.cpp : implementation file
    //

    #include "stdafx.h"
    #include "EnumString.h"

    #ifdef _DEBUG
    #define new DEBUG_NEW
    #undef THIS_FILE
    static char THIS_FILE[] = __FILE__;
    #endif

    /////////////////////////////////////////////////////////////////////////////
    // CEnumString


    CEnumString::CEnumString()
    {
        m_fBound = FALSE;
        m_nRefCount = 0;
    }

    CEnumString::~CEnumString()
    {

    }


    /////////////////////////////////////////////////////////////////////////////
    // CEnumString message handlers
    ULONG FAR EXPORT CEnumString::AddRef()
    {
        TRACE_LINE("CEnumString::AddRef/n");
        return ::InterlockedIncrement(reinterpret_cast<LONG*>(&m_nRefCount));
    }

    ULONG FAR EXPORT CEnumString::Release()
    {
        TRACE_LINE("CEnumString::Release/n");
        ULONG nCount = 0;
        nCount = (ULONG) ::InterlockedDecrement(reinterpret_cast<LONG*>(&m_nRefCount));

        if (nCount == 0)
        delete this;

        return nCount;

    }

    HRESULT FAR EXPORT CEnumString::QueryInterface(
        REFIID riid, void FAR* FAR* ppvObject )
    {
        HRESULT hr = E_NOINTERFACE;
        
        if (ppvObject != NULL)
        {
            *ppvObject = NULL;

            if (IID_IUnknown == riid)
                *ppvObject = static_cast<IUnknown*>(this);

            if (IID_IEnumString == riid)
                *ppvObject = static_cast<IEnumString*>(this);

            if (*ppvObject != NULL)
            {
                hr = S_OK;
                ((LPUNKNOWN)*ppvObject)->AddRef();
            }

        }
        else
        {
            hr = E_POINTER;
        }
        
        return hr;
    }

    STDMETHODIMP CEnumString::Next(ULONG celt, LPOLESTR* rgelt, ULONG* pceltFetched)
    {
        return E_NOTIMPL;
    }

    STDMETHODIMP CEnumString::Skip(ULONG celt)
    {
        return E_NOTIMPL;
    }

    STDMETHODIMP CEnumString::Reset(void)
    {
        return E_NOTIMPL;
    }
    STDMETHODIMP CEnumString::Clone(IEnumString** ppenum)
    {
        if (!ppenum)
            return E_POINTER;
    
        CEnumString* pnew = new CEnumString;
        pnew->AddRef();
        *ppenum = pnew;
        return S_OK;
    }
    BOOL CEnumString::Bind(HWND p_hWndEdit, DWORD p_dwOptions /*= 0-*/, LPCTSTR p_lpszFormatString /*= NULL*/)
    {
        if ((m_fBound) || (m_pac))
            return FALSE;
        HRESULT hr = S_OK;
        hr = m_pac.CoCreateInstance(CLSID_AutoComplete);
        if (SUCCEEDED(hr))
        {
            if (p_dwOptions)
            {
                CComQIPtr<IAutoComplete2> pAC2(m_pac);
                ATLASSERT(pAC2);
                hr = pAC2->SetOptions(p_dwOptions);   // This never fails?
                pAC2.Release();
            }
            hr = m_pac->Init(p_hWndEdit, this, NULL, (LPOLESTR)p_lpszFormatString);
            if (SUCCEEDED(hr))
            {
                m_fBound = TRUE;
                return TRUE;
            }
        }
        return FALSE;
    }
    VOID CEnumString::Unbind()
    {
        if (!m_fBound)
        return;
        ATLASSERT(m_pac);
        if (m_pac)
        {
            m_pac.Release();
            m_fBound = FALSE;
        }
    }
    #include "../esuihelper/EnumString.h"
    #include "DataType.h"
    class CDataType;
    class _ES_DATATYPE_EXPORT CEnumDataType : public CEnumString 
    {
        public:
        CEnumDataType(LPCTSTR lpszDataType);
        virtual ~CEnumDataType();
        CDataType* m_pDataType;
        protected:
        CString m_strDataType;
        STDMETHODIMP Next(ULONG celt, LPOLESTR* rgelt, ULONG* pceltFetched);
        STDMETHODIMP Skip(ULONG celt);
        STDMETHODIMP Reset(void);
        STDMETHODIMP Clone(IEnumString** ppenum);
        ado20::_RecordsetPtr m_pRecordset;
    };
    CEnumDataType::CEnumDataType(LPCTSTR lpszDataType)
    :m_strDataType(lpszDataType)
    {
        m_pDataType=g_pDataTypeManager->GetDataType(m_strDataType);
        ASSERT(m_pDataType);
        m_pRecordset.CreateInstance("ADODB.Recordset");  
        try
        {
            if(m_pRecordset!=NULL)
            {
                if( m_pRecordset->State&adStateOpen)
                {
                    return;
                }
            }
            ESRecordsetOpen((LPCTSTR)m_pDataType->m_strSQLAutoComplete, _variant_t((IDispatch *)g_connection,true),
            m_pRecordset,adOpenDynamic,adLockOptimistic, adCmdUnspecified);
    

            m_pRecordset->Requery(adCmdUnknown);
            if(m_pRecordset->BOF==VARIANT_FALSE)
            m_pRecordset->MoveFirst();
        }
        catch(_com_error &e)
        {
            ESErrPrintProviderError(g_connection);
            ESErrPrintComError(e);
        }
    }

    CEnumDataType::~CEnumDataType()
    {
        try{
            if(m_pRecordset!=NULL){
                if( m_pRecordset->State&adStateOpen){
                    m_pRecordset->Close();
                }
            }
        }
        catch(_com_error &e)
        {
            ESErrPrintProviderError(g_connection);
            ESErrPrintComError(e);
        }
    }
    STDMETHODIMP CEnumDataType::Next(ULONG celt, LPOLESTR* rgelt, ULONG* pceltFetched)
    {
        if(m_pRecordset==NULL) return OLE_E_BLANK;

        HRESULT hr = S_FALSE;
        ZeroMemory(rgelt, sizeof(OLECHAR*) * celt);

        try{
            if (!celt) celt = 1;
            for (ULONG i = 0; i < celt; i++)
            {
                if (m_pRecordset->EndOfFile== VARIANT_TRUE)
                    break;
                _bstr_t bstrText=
                    (LPCTSTR)g_GetValueString(
                    m_pRecordset->Fields->Item[(LPCTSTR)m_pDataType->m_strAutoCompleteField]->Value);
                if(bstrText.length()>0)
                {
                    rgelt[i] = OLESTRDUP(bstrText);
                    if (pceltFetched)
                    *pceltFetched++;
                }
                m_pRecordset->MoveNext();
            }
            if (i == celt)
                hr = S_OK;
        }
        catch(_com_error &e)
        {
            ESErrPrintProviderError(g_connection);
            ESErrPrintComError(e);
            return e.Error();
        }
        return hr;
    }
    STDMETHODIMP CEnumDataType::Skip(ULONG celt)
    {
        if(m_pRecordset==NULL) return OLE_E_BLANK;
        try{
            m_pRecordset->Move(celt,(long)adBookmarkCurrent);
        }
        catch(_com_error &e)
        {
            ESErrPrintProviderError(g_connection);
            ESErrPrintComError(e);
            return e.Error();
        }
        return S_OK;
    }
    STDMETHODIMP CEnumDataType::Reset(void)
    {
        if(m_pRecordset==NULL) return OLE_E_BLANK;
        try{
            m_pRecordset->Requery(adCmdUnknown);
            if(m_pRecordset->BOF==VARIANT_FALSE)
                m_pRecordset->MoveFirst();
        }
        catch(_com_error &e)
        {
            ESErrPrintProviderError(g_connection);
            ESErrPrintComError(e);
            return e.Error();
        }
        return S_OK; 
    }
    STDMETHODIMP CEnumDataType::Clone(IEnumString** ppenum)
    {
        if (!ppenum)
            return E_POINTER;
        
        CEnumDataType* pnew = new CEnumDataType(m_strDataType);
        pnew->AddRef();
        *ppenum = pnew;
        return S_OK;
    }

问：如何在MDI环境下枚举所有打开的窗口？

答：

In MFC, each CMDIChildWnd created by the framework is managed as a child window of the MDIClient window. This MDIClient window is a child of the mainframe window and fills its client area. For MDI applications, the mainframe window is encapsulated by the CMDIFrameWnd class. This class has a public embedded HWND member (m_hWndMDIClient), which is the handle to the MDIClient window. For MDI applications, AppWizard derives the CMainFrame class from CMDIFrameWnd.

The MDIClient maintains an internal list of child windows. In an MFC application, these child windows are either a CMDIChildWnd object or an internal window used to display the title of an iconized window. Note that this is an internal list controlled by Windows; don't make assumptions about the ordering of children in the list after an API function is called.

.. code-block:: C++

    //**mainfrm.h***************************************************
    class CMainFrame : public CMDIFrameWnd
    {
        //...
        public:
        CWnd  m_wndMDIClient;
        CWnd* m_pWndCurrentChild;
        CMDIChildWnd* GetNextMDIChildWnd();
        int GetCountCMDIChildWnds();
        //...
    }

    //**mainfrm.cpp**************************************************
    CMainFrame::CMainFrame():m_pWndCurrentChild(NULL)
    {
        //.................
    }

    CMainFrame::~CMainFrame()
    {
        m_wndMDIClient.Detach();
        //.................
    }

    int CMainFrame::OnCreate(LPCREATESTRUCT lpCreateStruct)
    {
        if (CMDIFrameWnd::OnCreate(lpCreateStruct) == -1)
            return -1;

        if (m_wndMDIClient.Attach(m_hWndMDIClient) == 0)
        {
            TRACE0("Failed to attach MDIClient./n");
            return -1;      // fail to create
        }
        //.................
    }

    //----------------------------------------------------------------
    // This function finds the CMDIChildWnd in the list of windows
    // maintained by the application's MDIClient window following the
    // one pointed to by the member variable m_pWndCurrentChild. If no
    // further CMDIChildWnds are in the list, NULL is returned.
    //----------------------------------------------------------------

    CMDIChildWnd* CMainFrame::GetNextMDIChildWnd()
    {
        if (!m_pWndCurrentChild)
        {
            // Get the first child window.
            m_pWndCurrentChild = m_wndMDIClient.GetWindow(GW_CHILD);
        }
        else
        {
            // Get the next child window in the list.
            m_pWndCurrentChild=
            (CMDIChildWnd*)m_pWndCurrentChild->GetWindow(GW_HWNDNEXT);
        }

        if (!m_pWndCurrentChild)
        {
            // No child windows exist in the MDIClient,
            // or you are at the end of the list. This check
            // will terminate any recursion.
            return NULL;
        }

        // Check the kind of window
        if (!m_pWndCurrentChild->GetWindow(GW_OWNER))
        {
            if (m_pWndCurrentChild->
                            IsKindOf(RUNTIME_CLASS(CMDIChildWnd)))
            {
                // CMDIChildWnd or a derived class.
                return (CMDIChildWnd*)m_pWndCurrentChild;
            }
            else
            {
                // Window is foreign to the MFC framework.
                // Check the next window in the list recursively.
                return GetNextMDIChildWnd();
            }
        }
        else
        {
            // Title window associated with an iconized child window.
            // Recurse over the window manager's list of windows.
            return GetNextMDIChildWnd();
        }
    }

    //-----------------------------------------------------------------
    // This function counts the number of CMDIChildWnd objects
    // currently maintained by the MDIClient.
    //-----------------------------------------------------------------

    int CMainFrame::GetCountCMDIChildWnds()
    {
        int count = 0;

        CMDIChildWnd* pChild = GetNextMDIChildWnd();
        while (pChild)
        {
            count++;
            pChild = GetNextMDIChildWnd();
        }
        return count;
    }

问：为什么UI线程中执行pFrame->GetActiveDocument()语句会出错？

我的目的是希望再UI线程中调用主线程的一个函数。代码如下：

.. code-block:: C++

    CMainFrame* pFrame = (CMainFrame*)AfxGetApp()->m_pMainWnd;
    CHjysxtDoc* pDoc = (CHjysxtDoc*)pFrame->GetActiveDocument();
    switch(pDoc->AddMubiao(mubiao))
    //...

但执行时(CHjysxtDoc*)pFrame->GetActiveDocument();会报错。我怎样才能在我的UI线程中调用CHjysxtDoc中的AddMubiao（）函数？

问：在工作线程中调用UpdateData（）函数怎么抛出异常呢？？？

答：简单的说，不能跨线程访问MFC窗口对象。MFC句柄封装类只在创建句柄的线程中有效，在其它线程中访问会出现无法预料的结果。适当的访问方式是直接访问句柄。更多信息参见\ :ref:`分析MFC中的映射 <blog_analyzing_mfc_maps>`\ 。

你需要另外想办法，例如在线程类中声明一个指针，AfxBeginThread的时候以暂停方式启动线程，设置指针为文档指针之后继续线程的运行。
参考http://support.microsoft.com/default.aspx?scid=kb;en-us;147578 （https://web.archive.org/web/20060301163811/http://support.microsoft.com/default.aspx?scid=kb;en-us;147578）

问：我想在网页的某个Table里插入一个新行，可是成功插入后却不显示。我用IHTMLTable->InsertRow()插入了一个新行，然后IHTMLTableRow->insertCell()插入两个Cell,并设置好了高度，背景色，所有操作都成功了，但是页面并不显示插入的新行。
请教如果用IHTMLTable->InsertRow()插入一个新行，并在网页中显示出来，还需要哪些必要步骤？

答：

.. code-block:: C++

    MSHTML::IHTMLTableRowPtr CDHtmlObjectModel::addTableRow(
        char *table,
        char *type,
        char *inTime,
        char *outTime,
        char *project,
        char *comment)
    {
        // Retrieve all of the page elements.
        MSHTML::IHTMLTablePtr spTable;
        MSHTML::IHTMLElementCollectionPtr spAllElements = m_spDocument2->Getall();

        _variant_t vaTag( table);

        if((spTable = spAllElements->item( vaTag)) != NULL) {
            // We have found the table, so now add a row.
            MSHTML::IHTMLTableRowPtr spRow( spTable->insertRow( 1));

            MSHTML::IHTMLTableCellPtr spType( spRow->insertCell( 0));
            MSHTML::IHTMLTableCellPtr spTimeIn( spRow->insertCell( 1));
            MSHTML::IHTMLTableCellPtr spTimeOut( spRow->insertCell( 2));
            MSHTML::IHTMLTableCellPtr spProject( spRow->insertCell( 3));
            MSHTML::IHTMLTableCellPtr spComment( spRow->insertCell( 4));

            // Here is the compiler trick again.
            // If a series of variables are created
            // that are identical in size, the memory will be
            // reused and it will not cost an extra allocation.
            // Neat trick, eh!
            {
                MSHTML::IHTMLElementPtr spAnElement = spType;
                _bstr_t bstrStr( type);
                spAnElement->PutinnerText( bstrStr);
            }

            {
                MSHTML::IHTMLElementPtr spAnElement = spTimeIn;
                _bstr_t bstrStr( inTime);
                spAnElement->PutinnerText( bstrStr);
            }

            {
                MSHTML::IHTMLElementPtr spAnElement = spTimeOut;
                _bstr_t bstrStr( outTime);
                spAnElement->PutinnerText( bstrStr);
            }

            {
                MSHTML::IHTMLElementPtr spAnElement = spProject;
                _bstr_t bstrStr( project);
                spAnElement->PutinnerText( bstrStr);
            }

            {
                MSHTML::IHTMLElementPtr spAnElement = spComment;
                _bstr_t bstrStr( comment);
                spAnElement->PutinnerText( bstrStr);
            }

            return spRow;
        }
        else
        {
            MSHTML::IHTMLTableRowPtr spRow;
            return spRow;
        }
    }

问：我现在的程序是将资源文件放到主程序中的，我想做一个纯资源文件的DLL文件，将主程序中的资源文件都分离出来，而主程序的代码改动尽量的小。

答：新建一个MFC Extension DLL，删除向导生成的资源文件，把你的程序的资源文件加入工程并且编译。

参考知识库文章 Q198846 HOWTO: Create Localized Resource DLLs for MFC Application (https://www.betaarchive.com/wiki/index.php?title=Microsoft_KB_Archive/198846) 和MFC技术文章TN057: Localization of MFC Components(https://learn.microsoft.com/en-us/cpp/mfc/tn057-localization-of-mfc-components)

问：怎么在ActiveX中加入可视化控件

答：Create一个非模态Dialog就可以了。需要随着控件大小的变化Resize对话框
去看看https://web.archive.org/web/20060701042542/http://www.codeguru.com/Cpp/COM-Tech/activex/controls/article.php/c2615/，那里的评论里面有一些常见问题的解答
http://msdn.microsoft.com/workshop/browser/ext/overview/downloadmgr.asphttp://www.codeguru.com/article.php/c1979
问：下载软件监视浏览器点击是怎么实现啊

答：Implementing a Custom Download Manager (https://web.archive.org/web/20011211033805/http://msdn.microsoft.com/workshop/browser/ext/overview/downloadmgr.asp)



问：一个非模态Dialog里面有两个RichEdit，中间可以分割开，可以上下随意移动中间的间隔条 。不知道如何实现。

答：https://web.archive.org/web/20050815000745/http://www.codeguru.com/article.php/c1979 描述了如何在对话框上使用切分窗口。在切分窗口里面不推荐放CView派生类，因为视图很多时候试图访问文档和框架。http://www.codeguru.com/article.php/c1979

问：我想要实现在局域网内抓屏并广播出去以实现同屏播放该采用什么办法最好?

我尝试了很多种方法:

* 直接抓取屏幕为BMP数据广播出去,但传输的数据太大(一般一幅全屏真彩BMP图片少说也有个一两MB)
* 抓屏后将BMP数据进行格式转换(变成16位色或256色),但抓屏及压缩的时间太长并且画面不理想
* 抓屏后将其生成AVI,但不压缩的AVI同样存在数据量大及难以传输等问题

......

总之,很是苦恼,不知各位有没有更好的办法

答：我在 https://web.archive.org/web/20040217145552/http://blog.joycode.com/jiangsheng/posts/10410.aspx 中提及了增加屏幕录制效率的一些方法

问：怎样打开一个位图文件,然后在X,Y位置写上"OK",后再保存为位图文件

答：

.. code-block:: C++

    #include <windows.h>
    #include <gdiplus.h>
    #include <stdio.h>
    using namespace Gdiplus;
    INT main()
    {
        // Initialize <tla rid="tla_gdiplus"/>.
        GdiplusStartupInput gdiplusStartupInput;
        ULONG_PTR gdiplusToken;
        GdiplusStartup(&gdiplusToken, &gdiplusStartupInput, NULL);
        UINT    size = 0;
        UINT    count = 0;
        Bitmap* bitmap = new Bitmap(L"FakePhoto.jpg");
        Graphics graphics(bitmap);

        FontFamily  fontFamily(L"Times New Roman");
        Font        font(&fontFamily, 24, FontStyleRegular, UnitPixel);
        PointF      pointF(30.0f, 10.0f);
        SolidBrush  solidBrush(Color(255, 0, 0, 255));

        graphics.DrawString(L"Hello", -1, &font, pointF, &solidBrush);
        delete bitmap;
        GdiplusShutdown(gdiplusToken);
        return 0;
    }

问：我需要在CEdit中显示不同颜色的字体。如何做呢，不用关键字那种方法。

答CEdit只支持前景色和背景色。如果需要同时显示不同的颜色，可以自己画，或者用RichEdit

问：

1.使用VC写了个小软件，输出XML文件，手工编写了xsl文件，然后转换成html文件，用chtmlview来浏览和打印。实际也就是ie的打印。但是遇到的问题是：
我生成的xml文件需要用多个表格表现出来，每个表格的行数不固定，表格个数也不固定，这样打印时就发现一行表格如果在页末，就很有可能被从半行的地方打印到上下两页，效果非常不好。请问各位大虾，如何动态插入分页符，让其自动分页？

答：

.. code-block:: html

    <div style="PAGE-BREAK-AFTER: always"></div>

(https://web.archive.org/web/20040222142748/http://blog.joycode.com/cafecat/posts/12778.aspx)

问：编译时出cannot open file "mfcs42ud.lib"

答:VC默认的安装选项不包含Unicode版本的MFC库。

重新运行安装程序，修改安装选项就可以解决这个问题。

问：使用IE控件时，在打开新窗口时会收到onNewWindow2事件，

.. code-block:: C++

    OnNewWindow2(LPDISPATCH* ppDisp, BOOL* Cancel)

使用何种方法，能在此时检测出此时要打开的URL的地址是什么呢？（在把这个指针返回之前）

答：处理NewWindow2创建一个隐藏的窗口，BeforeNavigate2之后决定是显示还是销毁这个窗口。

问：如何在WMA媒体文件里面加入版权信息？

答：wma就是用Windows Media Audio编码的ASF

可以用Reader或者Writer的IWMMetadataEditor结构来访问元数据(Meta Data)

参见

* https://web.archive.org/web/20021015192655/http://msdn.microsoft.com/library/en-us/wmform/htm/overviewoftheasfformat.asp
* :ref:`ASF学习笔记 Part 1 <blog_asf_study_notes_part_1>`
  
问：如何连接局域网内另外的计算机上的ACCESS数据库？

已知计算机的IP:192.168.1.10,机器名：ABC,在硬盘上的位置：C:/PROGRAM FILES/DDD/DATA/H.MDB。如何从局域网内另外的计算机连接该ACCESS数据库？

请帮忙写个连接？

答：不建议采取文件共享的方式访问远程数据库，这样可能造成数据库损坏。

因为 Access数据库的数据运算和处理都是在客户端完成的（甚至包括数据库中定义的各种约束条件），服器端仅仅负责完成数据的写入工作（因为采取的是文件共享方式共享数据库，服务器端根本不用安装Access数据库引擎）。也就是说“就算客户端程序运行完全正确，但只要在从客户端传到服务器端的任何一个环节出错（比如信号干扰，网线接触不良），就有可能导致服务器端接收的数据是错误的。这时候服务器端写入数据，完全可能导致数据库中的数据紊乱”。
建议采用SQL Server等基于服务器的数据库，或者使用C/S或者B/S程序、使用RDS同步数据库操作、WebService来进行客户端和服务器端的交互，客户端控制服务器来完成数据库操作

更多信息参见
HOW TO: Keep a Jet 4.0 Database in Top Working Condition (https://web.archive.org/web/20040102200241/http://support.microsoft.com/?id=300216)

问：Win32下面进程间通讯的方式，以及各种通讯方式的效率比较，特别是进程间大数据量传输的情况？

答：进程之间的通讯，有很多种办法，包括消息、内核对象、管道、套接字(Socket)、邮槽(邮路)、共享内存等等。

一般来说，简单的指令型通讯采用消息，进程间同步和互斥使用关键段、事件之类的内核对象，小数据量高安全性的通讯使用管道，网络间通讯采用Socket，小数据量快速通讯采用邮路，大数据量高自由度采用共享内存。

进程间大数据量的传输，最合适的办法是共享内存。

问：请问橡皮功能是怎样实现的？ 在一张图象中，我用鼠标画一定宽度（10 pixel）的曲线，要想按住鼠标拖动擦掉画的线，请问原理是什么？怎样实现？

答：see the source code of CRectTracker in MFC.

问：如何让2个ControlBar竖直排成一列？

各位，

#. 怎样让多个ControlBar竖直排成一列，另外一个ControlBar单独占一列？
#. 这些ControlBar的上边框都要显示字符,就象.net编辑器里属性窗口的风格而不是象VC6编辑器那种Controlbar的风格？

答：可以在DockControlBar的时候传递区域来指定其停靠位置。 

.. code-block:: C++

    DockControlBar(&m_wndDirTreeBar, AFX_IDW_DOCKBAR_LEFT);

    RecalcLayout();
    CRect rBar;
    m_wndDirTreeBar.GetWindowRect(rBar);
    rBar.OffsetRect(0, 1);

    DockControlBar(&m_wndDirTreeBar1, AFX_IDW_DOCKBAR_LEFT, rBar);

    rBar.OffsetRect(0, 1);
    DockControlBar(&m_wndDirTreeBar2, AFX_IDW_DOCKBAR_LEFT, rBar);
 
问：使用DOM操作XML存盘的时候调用save如何设置编码属性

答：在DOM中添加ProcessInstruction类型的节点

问：如何让工具栏按钮动态变灰/变亮？首先说明：我的工具栏是自己继承了CToolBar类，在代码里动态创建的。而且我想在程序启动时显示该工具栏，但是将工具栏上的按钮全部变灰（无效），只有在特定情况下才变亮（有效），记住，是全部。不是有些人想的按下按钮后再变灰。

答：CMainFrame在应用程序空闲的时候会根据命令处理是否存在来更新界面，包括菜单、工具栏和状态栏。正确的设置界面的方法是在命令流程中增加工具栏命令的更新处理代码。由于应用程序忙的时候可能来不及更新界面，不应该依赖于界面的更新状态

问：使用CHtmlView显示页面,如何屏蔽脚本错误及脚本调试的告警窗口.求助

我要一个程序,用到一个CHtmlView,打开的页面是不定的,在硬盘上,任何一个文件都可能有脚本的错误,请问如何屏蔽脚本错误及脚本调试的告警窗口
如何在里面显示一些非页面格式的文件.如.css文本方式显示它,我把它加了扩展名.htm然后打开会提示说"该文件可能有害,是保存还是打开'不爽,能不能直接显示其文本内容呢?

答：

方法1 重载Internet安全管理器

Create a custom security manager
If your application is a host for the WebBrowser control or MSHTML, implement the IInternetSecurityManager interface to create a security manager to specifically handle those URL policies and actions that are important to your application

Knowledge Base 
Q246227 SAMPLE: Secumgr.exe Overrides Security Manager for WebBrowser Host
https://web.archive.org/web/20080119025048/http://support.microsoft.com/kb/246227

方法2 重载脚本错误处理
Knowledge Base 
Q261003 HOWTO: Handle Script Errors as a WebBrowser Control Host

https://web.archive.org/web/20040521170042/http://support.microsoft.com/default.aspx?scid=kb;en-us;261003

问：请教：如何编译带LockWorkStation的过程

.. code-block:: C++

    if( !LockWorkStation() )
        printf ("LockWorkStation failed with %d/n", GetLastError());

这个LockWorkStation在哪个头文件里？

我在winuser.h里找到了。但是不能编译。（#include <winuser.h>）

提示函数未定义。

答：

#. 访问http://www.microsoft.com/msdownload/platformsdk/sdkupdate/ 升级你的平台SDK。
#. 检查你的SDK相关常量定义，定义_WIN32_WINNT>=0x0500,WINVER>=0x0500之后全部重新编译应该就可以了。MFC工程不需要包含<windows.h>，把你的定义放在stdafx.h开头。

问：为什么向导生成的文档/视图/框架代码的视图类中未包含文档类定义头文件？

答：编译的时候实际上是把源文件中的#include扩展成头文件的，头文件不能单独编译。所以只要在这个文件前面包含文档类的定义，编译就不会有问题。包含顺序可以参考视图类的实现文件。

问：我使用的是BCGCBpro 6.74b.

我利用vc 6.0的BCGCBpro AppWizard创建了一个工程，其中包括CWorkspaceBar(工作区)类和COutputBar(输出区)的类。就是象我们平时使用的vc那样的工作区和输出区.

我想在CWorkspaceBar(工作区)里面显示资源管理器(就是windows下面那种最普通的选择文件夹的显示)，在我生成的工程中，本来是使用的CTreeCtrl  m_wndTree显示一个简单的树形格式，于是我打算在CWorkspaceBar使用CBCGPShellTree 来替换上面的CTreeCtrl类，可是怎么都创建不成功。

答：检查g_pShellManager是否为空，如果为空，你需要在程序启动时调用

.. code-block:: C++

    CBCGPWorkspace::InitShellManager()

问：VC操作Word中，如何设置页眉和页脚？

答：https://web.archive.org/web/20040716061848/http://oldlook.experts-exchange.com:8080/Programming/Programming_Languages/MFC/Q_20806283.html

问：在多文档视图类中，某视图OnInitialUpdate()初期化过程中，想要关闭该未创建完毕的视图，请问如何处理？（注：只是关闭该视图，不退出程序）

答：

.. code-block:: C++

    GetParentFrame()->PostMessage(WM_CLOSE);

或者

.. code-block:: C++

    PostMessage(WM_COMMAND,ID_FILE_CLOSE);

问：如何编写多文档浏览器？

答：参考\ :ref:`脚本化浏览器 <add_scripting_support_to_webbrowser_control>`\ 

问：如何打印一个文件？

答：ShellExecute(0,"print", "c://1.xls","","", SW_SHOW );

问：怎样阻止程序被重复打开？

答：CQA tell the sole instance the name of the file to open   、 September 2000 issue of MSDN Magazine(https://web.archive.org/web/20021105030636/http://msdn.microsoft.com/msdnmag/issues/0900/c/default.aspx)

问：现在知道用GetCommandLine()可以获得所有的参数

但是如何将一个一个的参数放到数组里面供查询使用呢？

就行argv和argc一样

MSDN里面说可以用CommandLineToArgvW

但是这个函数不能用于非Unicode字符集，我的程序需在98下运行

答：

Q How can I parse the command line in an MFC app? My program has several command line options (such as -l, -x, -help). I see there's m_lpCmdLine that points to the command line, but do I have to parse it myself? It seems like there should be some way to make CCommandLineInfo do it, but I can't figure out how. 

https://web.archive.org/web/20031004091111/http://www.microsoft.com/msj/1099/c/c1099.aspx

问：如何在打开一个文件夹（ShellExecute），同时选中某个指定的文件 ？
答：

* 方法1 自动化资源管理器，创建一个Explorer对象，然后用IShellBrowser和IShellView借口控制
* 方法2 使用Explorer.exe的/select开关
  
.. code-block::

    [Windows Explorer Switches]
    Windows Explorer switches are useful in creating rooted folders:

        Explorer [/e][,/root,<object>][[,/select],<sub object>]

    /e
    Use Explorer view (scope and results pane view). The default is
    Open view (results in pane view only).

    /root<object>
    Specify the object in the "normal" name space that is
    used as the root (top level) of this Explorer/Folder (i.e., local
    path or UNC name). The default is the Desktop).
    /Select
    The parent folder opens and the specified object is selected.
    <sub object>   Specify the folder unless /select is used. The
    default is the root.

    Examples:Explorer /e, /root, //Reports

            opens an Explorer window at //Reports.

            Explorer /select, C:/Windows/Calc.exe

            opens a folder at C:/Windows (or activates one that is
            currently open) and selects Calc.exe.


            Explorer/e,/root,//Source/Internal/Design/Users/David/Archive

            opens a folder to the Archive folder above. This is a good
            way to create a dedicated, remote, documents archive
            folder. A link to this folder (//Source/Internal/Design/
            Users/David/Archive) can then be placed in the SendTo folder
            for quick routing of documents.


问：如何用代码设置环境变量？ 我现正用VC开发一个项目，其中要设置几个环境变量；请问在VC中如何用代码设置环境变量？

答：

SUMMARY

You can modify user environment variables by editing the following Registry key:

   HKEY_CURRENT_USER/Environment

You can modify system environment variables by editing the following Registry key:

   HKEY_LOCAL_MACHINE/SYSTEM/CurrentControlSet/Control/Session Manager/Environment

Note that any environment variable that needs to be expanded (for example, when you use %SYSTEM%) must be stored in the registry as a REG_EXPAND_SZ registry value. Any values of type REG_SZ will not be expanded when read from the registry.

Note that RegEdit.exe does not have a way to add REG_EXPAND_SZ. Use RegEdt32.exe when editing these values manually.

However, note that modifications to the environment variables do not result in immediate change. For example, if you start another Command Prompt after making the changes, the environment variables will reflect the previous (not the current) values. The changes do not take effect until you log off and then log back on.

To effect these changes without having to log off, broadcast a WM_SETTINGCHANGE message to all windows in the system, so that any interested applications (such as Program Manager, Task Manager, Control Panel, and so forth) can perform an update.

问：用installshield的脚本如何在目标计算机上的指定位置新建目录？

答：

.. code-block::

    /*--------------------------------------------------------------*/
    *
    * InstallShield Example Script
    *
    * Demonstrates the DeleteDir function.
    *
    * First, CreateDir is called to create a directory.  Then,
    * DeleteDir is called to delete it.
    *
    /*--------------------------------------------------------------*/

    #define EXAMPLE_DIR "C://Newdir"

    // Include Ifx.h for built-in InstallScript function prototypes.
    #include "Ifx.h"

    export prototype ExFn_DeleteDir(HWND);

    function ExFn_DeleteDir(hMSI)
    begin

        // Create a directory.
        if (CreateDir (EXAMPLE_DIR) != 0) then
            // Report the error; then terminate.
            MessageBox ("Unable to create directory.", SEVERE);
        else

            // Report success.
            MessageBox (EXAMPLE_DIR + " was created.", INFORMATION);

            // Delete the directory.  If the directory is not
            // empty, it is not deleted.
            if (DeleteDir (EXAMPLE_DIR, ONLYDIR) = 0) then
                // Report success.
                MessageBox (EXAMPLE_DIR + " was deleted.", INFORMATION);
            else
                MessageBox ("Unable to delete directory.", SEVERE);
            endif;

        endif;

    end;

问：怎样动态显示一个进度对话框呢？ 我在主窗体里面执行一个很耗时的计算过程，现在想启动一个对话框，这个对话框中包含一个进度条，能够动态显示我的计算的进度，如何实现呢？

肯定是要用到多线程了？

答：VC菜单“Project”->"Add components and controls"
有个进度条组件，基本上不要太大修改就可以，

问：怎样把在ACCESS里建立的报表在VC里显示出来

答：DAO对象不能直接访问Access报表和模块，以及在查询中使用这些对象。

在客户机安装了Access的情况下，可以自动化Access,然后把报表另存为HTML,之后用浏览器控件或CHTMLView显示

参见https://web.archive.org/web/20000818013910/www.codeproject.com/database/access_reports_class.asp

https://web.archive.org/web/20050317012206/http://codeguru.earthweb.com/Cpp/data/mfc_database/microsoftaccess/article.php/c1107/

问：为何我的ActiveX显示位图正常，但打印不正常。我开发了一个显示位图的控件，在插入到Word2000里显示图形，显示一切正常
但打印时就巨小。我试着在

.. code-block:: C++

    OnDraw(CDC *pdc)
    
里在

.. code-block:: C++

    if(pdc->IsPrinting()) 

里做放大处理，可是打印时

.. code-block:: C++

    pdc->IsPrinting() 
    
返回还是false，不起作用。我使用的是CPictureHolder显示位图。

答：不要用基于像素的映射模式，用基于实际尺寸的

打印机的像素大小和屏幕不一样。看看你的逻辑坐标系的Y轴是不是反了

MM_HIMETRIC的Y轴方向和MM_TEXT不一样的

问：如何取得鼠标位置的文字

比如鼠标在记事本窗口上，并且在WORD的位置，我怎么得到"word"

我知道可以得到NOTEPAD窗口的文字，但是如果打开的是10M的文件，难道我还要先复制到内存然后来找？

即使我知道了哪个缓冲区，又怎么知道鼠标指的是哪个字呢

DOS到好办，WINDOWS下突然不知道咋办了

| ________________________________
| \|无标题-1                      \|
| --------------------------------
| \| how to get the word  ...     \|
| \|                 $            \|
| \|                              \|
| \|______________________________\|
|

答：Enabling Your Wish and the Needs of Others, Too
Dear Dr. GUI,
How can I grab the text that lies beneath the cursor, independent of the application that the text occurs in?

I am using Visual C++, and, ideally, I would like functionality similar to that found in VC's debugger: When the cursor is placed over a variable, information relevant to the variable is displayed in a box after a short delay, rather like a tool tip.

I have seen translation software give an immediate translation of the word under the cursor, irrespective of the application in which the word resides. How are they doing it? Is it done by using Optical Character Recognition (OCR)? Or is there a more elegant method using the Win32 API?

Thanks in advance,

Henry Brighton

Dr. GUI replies:
Wow, Henry. This turns out to be really interesting because currently there is no single Microsoft Win32&reg; API to get the text underneath the cursor for all Windows-based applications. However, you can get this information for most Windows applications by using the Microsoft Active Accessibility Software Development Kit (SDK).

This technology has been developed by Microsoft for people who have accessibility problems that affect their ability to utilize the standard computer. There are now accessibility aids such as screen review utilities, on-screen keyboard utilities, and so forth. Is this cool or what?

Active Accessibility is based on the Component Object Model (COM) and can be used to obtain or provide information about the system-provided UI elements of Windows applications and the operating system. Currently, it is fully supported on Windows 95, Windows 98, and Windows 2000, and partly supported on Windows NT 4.0 Service Pack 4 and later. The supported UI elements include:

Predefined controls (controls defined in User32.dll), such as list boxes.

Common controls (controls defined in Comctl32.dll), such as toolbars.

Window elements, such as title bars and menus.
Although the UI elements in applications such as Microsoft Office and Visual C++ are supported by this SDK, the Office document content is not.

To obtain more information about the Active Accessibility SDK and where to download its latest version, go to https://web.archive.org/web/20010609025259/http://www.microsoft.com/enable/msaa/

问：为什么用CWnd::CreateControl在视图中创建的控件子窗体不能显示？

我的程序是这样的：

.. code-block:: C++

    void CCreateButtonView::OnRButtonDown(UINT nFlags, CPoint point)
    {

        CWnd m_ax;
        LPCTSTR pszName = "MSDBGrid.DBGrid";
                        //控件的ProgID ，这里我用的是DBGrid32.ocx
        m_ax.CreateControl (pszName,NULL, WS_VISIBLE | WS_CHILD,
            CRect(100,100,200,200), this, AFX_IDW_PANE_FIRST);
        m_ax.ShowWindow(SW_SHOW);

        CView::OnRButtonDown(nFlags, point);
    }

想要实现的功能是：在View中右键单击动态创建DBGrid.ocx控件的子窗体，通过调试发现没有问题，创建成功，但就是不能将创建的控件显示出来。

最奇怪的是，如果我在

.. code-block:: C++

    m_ax.ShowWindow(SW_SHOW);

之后加上一句

.. code-block:: C++

     AfxMessageBox("hehe");

创建的子窗体居然能显示出来了，请高手指点，这到底是怎么回事啊？应该怎么解决？多谢

答：CWnd::~CWnd会调用DestroyWindow。将CWnd m_ax；不定义为局部变量就ok了！

问：在ACTIVEX中开线程，是用_beginthreadEx还是用Afxbeginthread

我在线程中用到了不少c runtime 的函数，如strlen等等。按照道理似乎应该使用beginthreadEx，但是我的activex是用MFC开发的，这样按照道理，似乎又应该使用Afxbeginthread。还有，如果我在项目设置里选择不使用mfc，整个程序正常运行。请问我到底该使用哪个函数。

答：beginthreadEx启动的线程中不使用MFC就没问题。否则还是用MFC的Afxbeginthread吧。MFC里面大把的函数引用线程局部存储的。

问：如何对基于对话框的MFC应用程序加入Accelerator，我已经添加了Accelerator资源，却没有作用

答：Q222829 HOWTO: Using Accelerator Keys Within a Modal Dialog Box

https://web.archive.org/web/20040715222243/http://support.microsoft.com?kbid=222829

问：如何在文件夹浏览对话框中只显示映射文件夹

答：SHGetSpecialFolderLocation/CSIDL_DRIVES

Custom Filtering

Under Microsoft&reg; Windows&reg; XP, SHBrowseForFolder supports custom filtering on the contents of the dialog box. To create a custom filter, follow these steps:

Set the BIF_NEWDIALOGSTYLE flag in the ulFlags member of the BROWSEINFO parameter structure.
Specify a callback function in the lpfn member of the BROWSEINFO parameter structure.
The callback function will receive BFFM_INITIALIZED and BFFM_IUNKNOWN messages. On receipt of the BFFM_IUNKNOWN message, the callback function's LPARAM parameter will contain a pointer to an instance of IUnknown. Call QueryInterface on that IUnknown to obtain a pointer to an IFolderFilterSite interface.
Create an object that implements IFolderFilter.
Call IFolderFilterSite::SetFilter, passing it a pointer to IFolderFilter. IFolderFilter methods can then be used to include and exclude items from the tree.
Once the filter is created, the IFolderFilterSite interface is no longer needed. Call IFolderFilterSite::Release if you have no further use for it.

see also
* https://web.archive.org/web/20021001140010/http://www.codeproject.com/dialog/cfolderdialog.asp
* https://web.archive.org/web/20021222054746/http://msdn.microsoft.com/msdnmag/issues/0800/c/default.aspx
* https://web.archive.org/web/20021105024559/http://msdn.microsoft.com/msdnmag/issues/02/01/c/default.aspx
* https://web.archive.org/web/20030423134005/http://msdn.microsoft.com/msdnmag/issues/0400/c/
* https://web.archive.org/web/20040229025134/http://msdn.microsoft.com/msdnmag/issues/04/03/CQA/default.aspx


问：现在有一个浮动的DialogBar工具条,如保去除其上的系统控制钮,即状态栏上的关闭按钮

答：https://web.archive.org/web/20040517034034/http://www.codeproject.com/docking/disabletoolbarclose.asp

问：用mfc建立了一个dll,dll里有个对话框，但话框上的工具条没有tooltip功能，该怎么做？

答：代码是在DLL还是在EXE并不是这个问题的关键。你需要从CFrameWnd中复制工具提示相关代码。当然，如果对话框是非模态的，那么你还需要用Hook来确保获取鼠标和键盘消息。

参考文档

微软知识库文章Q233263 PRB: Modeless Dialog Box in a DLL Does Not Process TAB Key (https://helparchive.huntertur.net/document/108855)

问：为什么我使用SAFEARRAY通过VB向VC程序传递字符串数组时总是不能成功啊？

答：Q207931 HOWTO: Pass Arrays Between Visual Basic and C (https://www.betaarchive.com/wiki/index.php?title=Microsoft_KB_Archive/207931)

问：如何在我的程序中自动化Office?

答：Q196776 Office Automation Using Visual C++ (https://www.betaarchive.com/wiki/index.php/Microsoft_KB_Archive/196776)

参考文档：
Q216388 FILE: B2CSE.exe Converts Visual Basic Automation Code to Visual C++ (https://www.betaarchive.com/wiki/index.php/Microsoft_KB_Archive/216388)
Q222101 HOWTO: Find and Use Office Object Model Documentation (https://www.betaarchive.com/wiki/index.php?title=Microsoft_KB_Archive/222101)
Q185125 HOWTO: Invoke a Stored Procedure w/ADO Query using VBA/C++/Java (https://helparchive.huntertur.net/document/92827)
Q207931 HOWTO: Pass Arrays Between Visual Basic and C (https://www.betaarchive.com/wiki/index.php?title=Microsoft_KB_Archive/207931)
Q238972 INFO: Using Visual C++ to Automate Office (https://web.archive.org/web/20100416003106/http://support.microsoft.com/kb/238972)

问：如何使CTreeCtrl的节点即使没有子节点也显示+号？ 像资源管理器那样？这样就可以在Expand的时候加载其子节点

答：https://web.archive.org/web/20030809145218/http://www.microsoft.com/msj/archive/S563.aspx

问：在CListCtrl中如何将LVS_EX_CHECKBOXES系统指定的风格换成自己的图标。即可以标识为选中、未选中及当前指针位置所在项目

答：LVS_EX_CHECKBOXES的作用是添加一个包含两个图像的State Image List以及在鼠标点击和键盘操作的时候自动修改ItemState。

自定义方法是重设State Image List或者用Custom Draw自己画State

问：dll中的对话框内ocx控件不能显示,如何解决？

我试图写一个Share MFC DLL，在dll中包含一个属性对话框，属性对话框中的其中一个属性页包含一个vsflexgrid 7.0的控件，在运行时，当我选择含有vsflexgri控件的属性页时，该页立即消失，且属性对话框中对应的tab也不见了。

答：DLL中需要的OLE的初始化最好在放在调用DLL的主应用程序中，而不要放在DLL中。参见Q154320 BUG: AfxOleInit Returns TRUE Without Initializing OLE in a DLL (https://jeffpar.github.io/kbarchive/kb/154/Q154320/)

问：  如何在VC中使用ADO将数据高效地从一个ACCESS数据库移动到另一个ACCESS数据库 
答：Select Into/Insert into到链接表就可以了