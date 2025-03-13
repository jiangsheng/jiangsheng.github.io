.. _blogs_handle_newwindow3_and_showmodaldialog_chtmlview:

Handle NewWindow3 and ShowModalDialog in CHtmlView
========================================================
CHTMLView does not support NewWindow3 as of MFC 9.0. It is relatively easy to add this support, given the event sink code in atlmfcsrcviewhtml.cpp

Add the following into the declaration of the derived CHtmlView class (named CHtmlViewTestView in this example)

.. code-block:: C++

    void NewWindow3(     
        IDispatch **ppDisp,
        VARIANT_BOOL *Cancel,
        DWORD dwFlags,
        BSTR bstrUrlContext,
        BSTR bstrUrl
    );

    DECLARE_EVENTSINK_MAP()


Add the following to the implementation file of the CHtmlViewTestView class

.. code-block:: C++

    #include <exdisp.h> //For IWebBrowser2* and others
    #include <exdispid.h>
    #include <Mshtml.h>
    #include <Mshtmdid.h>
    #include <shobjidl.h>

    BEGIN_EVENTSINK_MAP(CHtmlViewTestView, CHtmlView)
        ON_EVENT(CHtmlViewTestView, AFX_IDW_PANE_FIRST,DISPID_NEWWINDOW3,NewWindow3,VTS_PDISPATCH VTS_PBOOL VTS_I4 VTS_BSTR VTS_BSTR)
    END_EVENTSINK_MAP()

    void CHtmlViewTestView::NewWindow3(     
        IDispatch **ppDisp,
        VARIANT_BOOL *Cancel,
        DWORD dwFlags,
        BSTR bstrUrlContext,
        BSTR bstrUrl
    )
    {
        CDocTemplate* pDocTemplate=GetDocument()->GetDocTemplate();
        CDocument* pDocument=pDocTemplate->OpenDocumentFile(NULL);
        POSITION pos= pDocument->GetFirstViewPosition();
        CHtmlViewTestView* pNewView=(CHtmlViewTestView*)pDocument->GetNextView(pos);
        pNewView->SetRegisterAsBrowser(TRUE);
        *ppDisp=pNewView->GetApplication();
    }


Handling ShowHtmlDialog in CHtmlView needs some extension the browser control site, however, the MFC implementation is not reusable. Heck, for some reason the two MFC HTML Classes, namely CHtmlView and CDHtmlDialog, are NOT reusing their own extension inside the same class library. They use two almost identical extension control sites to redirect IDocHostUIHandler methods. The one used CHtmlView, CHtmlControlSite, is not even in MFC header file, while the one used by CDHtmlDialog, CBrowserControlSite, is in afxdhtml.h, leaving some room to extend it by exposing GetInterfaceHook.

Now back to CHtmlView. To create a control site extension, you need to override CWnd::CreateControlSite, which is added in MFC 7.0 specifically for extending the web browser control ,  but is used in MFC 8.0 for embedding .Net Windows Forms controls.

.. code-block:: C++

    BOOL CHtmlViewTestView::CreateControlSite(COleControlContainer* pContainer,
    COleControlSite** ppSite, UINT /* nID */, REFCLSID /* clsid */)
    {
        ASSERT(ppSite != NULL);
        *ppSite = new CExtendedHtmlControlSite(pContainer,this);
        return TRUE;
    }


Actually, pContainer->m_pWnd is this (CHtmlViewTestView), so I can emit a parameter here and cast the window pointer to CHtmlViewTestView, but this is not obvious to me when I wrote this class.

The control site extension needs to extend COleControlSite, an internal class in MFC 6.0 but is documented in MFC 7.0, again, to support class level customization of the control site. Previously, you can only replace the global control container by calling AfxEnableControlContainer.

.. code-block:: C++

    class CExtendedHtmlControlSite :
        public COleControlSite
    {
    public:
        CExtendedHtmlControlSite(COleControlContainer* pContainer,CHtmlViewTestView* pView);
        virtual ~CExtendedHtmlControlSite(void);
    protected:
        CHtmlViewTestView* m_pView;
    }

    CExtendedHtmlControlSite::CExtendedHtmlControlSite(COleControlContainer* pContainer,CHtmlViewTestView* pView)
    :COleControlSite(pContainer),m_pView(pView)
    {
    }

    CExtendedHtmlControlSite::~CExtendedHtmlControlSite(void)
    {
    }


Here m_pView is saved to delegate INewWindowManager calls to the CHtmlViewTestView class.

Now it is the fun part. The web browser control does not actually query the INewWindowManager interface from the control site, instead, it calls the control site’s implementation of IServiceProvider::QueryService, so I need to implement IServiceProvider first, then answer the service query call with my INewWindowManager implementation.

.. code-block:: C++

    BEGIN_INTERFACE_PART(ServiceProvider, IServiceProvider)
        STDMETHOD(QueryService)(REFGUID,REFIID,void**);
    END_INTERFACE_PART(ServiceProvider)

    BEGIN_INTERFACE_PART(NewWindowManager, INewWindowManager)       
        STDMETHOD(EvaluateNewWindow)(
            LPCWSTR pszUrl,
            LPCWSTR pszName,
            LPCWSTR pszUrlContext,
            LPCWSTR pszFeatures,
            BOOL fReplace,
            DWORD dwFlags,
            DWORD dwUserActionTime);
    END_INTERFACE_PART(NewWindowManager);

    ULONG FAR EXPORT CExtendedHtmlControlSite::XServiceProvider::AddRef()
    {
        METHOD_PROLOGUE(CExtendedHtmlControlSite, ServiceProvider)
        return pThis->ExternalAddRef();
    }

    ULONG FAR EXPORT CExtendedHtmlControlSite::XServiceProvider::Release()
    {                           
        METHOD_PROLOGUE(CExtendedHtmlControlSite, ServiceProvider)
        return pThis->ExternalRelease();
    }

    HRESULT FAR EXPORT CExtendedHtmlControlSite::XServiceProvider::QueryInterface(REFIID riid,
        void** ppvObj)
    {
        METHOD_PROLOGUE(CExtendedHtmlControlSite, ServiceProvider)
        HRESULT hr = (HRESULT)pThis->ExternalQueryInterface(&riid, ppvObj);
        return hr;
    }
    STDMETHODIMP CExtendedHtmlControlSite::XServiceProvider::QueryService(REFGUID guidService, 
        REFIID riid,
        void** ppvObject)
    {
        if (riid == IID_INewWindowManager)
        {
            METHOD_PROLOGUE(CExtendedHtmlControlSite, ServiceProvider);
            HRESULT hr = (HRESULT)pThis->ExternalQueryInterface(&riid, ppvObject);
            return hr;
        }
        else
        {
            *ppvObject = NULL;

        }
        return E_NOINTERFACE;
    }

    ULONG CExtendedHtmlControlSite::XNewWindowManager::AddRef()
    {
        METHOD_PROLOGUE(CExtendedHtmlControlSite, NewWindowManager);

        return pThis->ExternalAddRef();
    }

    ULONG CExtendedHtmlControlSite::XNewWindowManager::Release()
    {
        METHOD_PROLOGUE(CExtendedHtmlControlSite, NewWindowManager);

        return pThis->ExternalRelease();
    }

    HRESULT CExtendedHtmlControlSite::XNewWindowManager::QueryInterface(REFIID riid, void ** ppvObj)
    {
        METHOD_PROLOGUE(CExtendedHtmlControlSite, NewWindowManager);

        return pThis->ExternalQueryInterface( &riid, ppvObj );
    }

    HRESULT CExtendedHtmlControlSite::XNewWindowManager::EvaluateNewWindow(
    LPCWSTR pszUrl,
    LPCWSTR pszName,
    LPCWSTR pszUrlContext,
    LPCWSTR pszFeatures,
    BOOL fReplace,
    DWORD dwFlags,
    DWORD dwUserActionTime
    )
    {
        METHOD_PROLOGUE(CExtendedHtmlControlSite, NewWindowManager);

        return pThis->m_pView->EvaluateNewWindow(
            pszUrl,
            pszName,
            pszUrlContext,
            pszFeatures,
            fReplace,
            dwFlags,
            dwUserActionTime);
    }


Actually, I can implementation INewWindowManager in another class and return another object in QueryService, but since INewWindowManager is used exclusively for web browser customization, this INewWindowManager implementation is not going to be reusable anyway.

Finally, to make CHtmlView's IDocHostUIHandler implementation happy, I have to redirect IDocHostUIHandler method calls to it:

.. code-block:: C++
        
    DECLARE_INTERFACE_MAP()
        BEGIN_INTERFACE_PART(DocHostUIHandler, IDocHostUIHandler)
            STDMETHOD(ShowContextMenu)(DWORD, LPPOINT, LPUNKNOWN, LPDISPATCH);
            STDMETHOD(GetHostInfo)(DOCHOSTUIINFO*);
            STDMETHOD(ShowUI)(DWORD, LPOLEINPLACEACTIVEOBJECT,
                LPOLECOMMANDTARGET, LPOLEINPLACEFRAME, LPOLEINPLACEUIWINDOW);
            STDMETHOD(HideUI)(void);
            STDMETHOD(UpdateUI)(void);
            STDMETHOD(EnableModeless)(BOOL);
            STDMETHOD(OnDocWindowActivate)(BOOL);
            STDMETHOD(OnFrameWindowActivate)(BOOL);
            STDMETHOD(ResizeBorder)(LPCRECT, LPOLEINPLACEUIWINDOW, BOOL);
            STDMETHOD(TranslateAccelerator)(LPMSG, const GUID*, DWORD);
            STDMETHOD(GetOptionKeyPath)(OLECHAR **, DWORD);
            STDMETHOD(GetDropTarget)(LPDROPTARGET, LPDROPTARGET*);
            STDMETHOD(GetExternal)(LPDISPATCH*);
            STDMETHOD(TranslateUrl)(DWORD, OLECHAR*, OLECHAR **);
            STDMETHOD(FilterDataObject)(LPDATAOBJECT , LPDATAOBJECT*);
        END_INTERFACE_PART(DocHostUIHandler)

    

    STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::GetExternal(LPDISPATCH *lppDispatch)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->m_pView->OnGetExternal(lppDispatch);
    }STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::ShowContextMenu(
        DWORD dwID, LPPOINT ppt, LPUNKNOWN pcmdtReserved, LPDISPATCH pdispReserved)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->m_pView->OnShowContextMenu(dwID, ppt, pcmdtReserved, pdispReserved);
    }STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::GetHostInfo(
        DOCHOSTUIINFO *pInfo)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->m_pView->OnGetHostInfo(pInfo);
    }STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::ShowUI(
        DWORD dwID, LPOLEINPLACEACTIVEOBJECT pActiveObject,
        LPOLECOMMANDTARGET pCommandTarget, LPOLEINPLACEFRAME pFrame,
        LPOLEINPLACEUIWINDOW pDoc)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->m_pView->OnShowUI(dwID, pActiveObject, pCommandTarget, pFrame, pDoc);
    }STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::HideUI(void)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)

        return pThis->m_pView->OnHideUI();
    }
    STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::EnableModeless(BOOL fEnable)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->m_pView->OnEnableModeless(fEnable);
    }STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::OnDocWindowActivate(BOOL fActivate)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->m_pView->OnDocWindowActivate(fActivate);
    }STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::OnFrameWindowActivate(
        BOOL fActivate)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->m_pView->OnFrameWindowActivate(fActivate);
    }

    STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::ResizeBorder(
        LPCRECT prcBorder, LPOLEINPLACEUIWINDOW pUIWindow, BOOL fFrameWindow)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->m_pView->OnResizeBorder(prcBorder, pUIWindow, fFrameWindow);
    }
    STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::TranslateAccelerator(
        LPMSG lpMsg, const GUID* pguidCmdGroup, DWORD nCmdID)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->m_pView->OnTranslateAccelerator(lpMsg, pguidCmdGroup, nCmdID);
    }
    STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::GetOptionKeyPath(
        LPOLESTR* pchKey, DWORD dwReserved)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->m_pView->OnGetOptionKeyPath(pchKey, dwReserved);
    }STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::GetDropTarget(
        LPDROPTARGET pDropTarget, LPDROPTARGET* ppDropTarget)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->m_pView->OnGetDropTarget(pDropTarget, ppDropTarget);
    }

    STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::TranslateUrl(
        DWORD dwTranslate, OLECHAR* pchURLIn, OLECHAR** ppchURLOut)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->m_pView->OnTranslateUrl(dwTranslate, pchURLIn, ppchURLOut);
    }STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::FilterDataObject(
        LPDATAOBJECT pDataObject, LPDATAOBJECT* ppDataObject)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->m_pView->OnFilterDataObject(pDataObject, ppDataObject);
    }
    STDMETHODIMP_(ULONG) CExtendedHtmlControlSite::XDocHostUIHandler::AddRef()
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->ExternalAddRef();
    }
    STDMETHODIMP_(ULONG) CExtendedHtmlControlSite::XDocHostUIHandler::Release()
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->ExternalRelease();
    }

    STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::QueryInterface(
            REFIID iid, LPVOID far* ppvObj)    
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)
        return pThis->ExternalQueryInterface(&iid, ppvObj);
    }STDMETHODIMP CExtendedHtmlControlSite::XDocHostUIHandler::UpdateUI(void)
    {
        METHOD_PROLOGUE_EX_(CExtendedHtmlControlSite, DocHostUIHandler)

        return pThis->m_pView->OnUpdateUI();
    }


That's it, you can handle ShowModalDialog now

.. code-block:: C++

    HRESULT CHtmlViewTestView::EvaluateNewWindow(
        LPCWSTR pszUrl,
        LPCWSTR pszName,
        LPCWSTR pszUrlContext,
        LPCWSTR pszFeatures,
        BOOL fReplace,
        DWORD dwFlags,
        DWORD dwUserActionTime
    )
    {
        CString url(pszUrl);
        if(url.MakeLower().Find(_T("showdialogtest.htm"))!=-1)
        {
            return S_FALSE;//block the new window
        }
        return E_FAIL;//default
    }


Well, here you can add as many policies as you like , people can never be creative enough on making policies.

This should be enough for adding your web browser customization. If you want to add more interfaces, such as IDocHostUIHandler2, IInternetSecurityManager, IDocHostShowUI, IOleCommandTarget or IAuthenticate, to of the customized control site, simply add more interface parts and answer QueryService calls if necessary.
