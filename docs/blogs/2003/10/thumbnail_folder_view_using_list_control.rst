.. meta::
   :description: 本示例演示了列表控件的虚列表和自画功能，也演示了一些系统外壳的函数和接口的使用方法。

使用虚列表和自画实现文件夹的缩略图显示
============================================

.. post:: 23, Oct, 2003
   :tags: thumbnail, Windows Shell
   :category: Microsoft Foundation Classes, Win32
   :author: me
   :nocomments:


.. _thumbnail_folder_view_using_list_control:

本示例演示了列表控件的虚列表和自画功能，也演示了一些系统外壳的函数和接口的使用方法。

单击 https://github.com/jiangsheng/Samples/tree/master/picview 下载本文的代码。如果在编译示例程序的时候出现问题，你需要去http://www.microsoft.com/msdownload/platformsdk/sdkupdate/ 升级你的头文件和库文件

---------------
预备性阅读
---------------
在阅读本文之前，建议先对列表视图控件和系统外壳有一个基本的了解。建议阅读以下SDK文章

* Shell FAQ
* List-View Controls Overview
* Using List-View Controls
* Customizing a Control's Appearance Using Custom Draw

---------------
创建应用程序
---------------
使用MFC应用程序向导创建一个SDI应用程序，在最后一步选择视图的基类为CListView。创建完成之后，在资源中去掉保存、编辑和打印等功能的菜单和工具栏按钮（因为这些功能没有实现）。

---------------
虚列表的创建
---------------

本文采用虚列表技术，使得显示信息是在第一次显示的时候才被获取。为了创建虚列表，在创建之前需要指定列表的风格

.. code-block:: C++

    BOOL CPicViewView::PreCreateWindow(CREATESTRUCT& cs)
    {
        cs.style&=~LVS_TYPEMASK;
        cs.style|=LVS_ICON|LVS_OWNERDATA;
        return CListView::PreCreateWindow(cs);
    }

同时，因为列表项的Overlay图标也是被动态获取的，所以需要设置动态Overlay图标

.. code-block:: C++

    void CPicViewView::OnInitialUpdate()
    {
        CListView::OnInitialUpdate();
        GetListCtrl().SetCallbackMask(LVIS_OVERLAYMASK);
    }

-----------------
缓存显示信息
-----------------

在列表需要显示一个范围的项目之前，列表会发送LVN_ODCACHEHINT通知，应用程序可以捕获这个消息来缓存部分列表的显示信息，以提高性能。

.. code-block:: C++

    void CPicViewView::OnOdcachehint(NMHDR* pNMHDR, LRESULT* pResult)
    {
        NMLVCACHEHINT* pCacheHint = (NMLVCACHEHINT*)pNMHDR;
        PrepCache(0,min(5,m_arpFolderItems.GetSize()));
        PrepCache(pCacheHint->iFrom,pCacheHint->iTo);
        PrepCache(max(0,m_arpFolderItems.GetSize()-5),m_arpFolderItems.GetSize());
        *pResult = 0;
    }

在列表需要显示一个项目之前，列表会发送LVN_GETDISPINFO通知，应用程序可以捕获这个消息来提供项目的显示信息。如果显示时需要显示的列表项在缓存中，那么可以从缓存中获取显示信息。否则需要重新从文件获得。

.. code-block:: C++

    void CPicViewView::OnGetdispinfo(NMHDR* pNMHDR, LRESULT* pResult)
    {
        LV_DISPINFO* pDispInfo = (LV_DISPINFO*)pNMHDR;
        if(pDispInfo->item.iItem==-1)return;
        HRESULT hr=S_OK;
        LPCITEMIDLIST pidlItem=m_arpFolderItems[pDispInfo->item.iItem];
        CFolderItemInfo* pFolderItemInfo=FindItemInCache(pidlItem);
        BOOL bCached=TRUE;
        if(pFolderItemInfo==NULL){
            bCached=FALSE;
            pFolderItemInfo=new CFolderItemInfo;
            GetItemInfo(pidlItem,pFolderItemInfo);
        }
        if(pDispInfo->item.mask&LVIF_TEXT){
            lstrcpyn(pDispInfo->item.pszText,pFolderItemInfo->tszDisplayName,pDispInfo-   >item.cchTextMax);
        }
        if(pDispInfo->item.mask&LVIF_IMAGE){
            pDispInfo->item.iImage=pFolderItemInfo->iIcon;
        }
        if(pDispInfo->item.mask&LVIF_STATE){
            pDispInfo->item.state=pFolderItemInfo->state;
        }
        if(!bCached)
            delete pFolderItemInfo;
        *pResult = 0;
    }

-----------------
文件图标的显示
-----------------

默认情况下，列表项的图标就是其系统图标。首先获得系统图像列表

.. code-block:: C++

    int CPicViewView::OnCreate(LPCREATESTRUCT lpCreateStruct)
    {
        if (CListView::OnCreate(lpCreateStruct) == -1)
            return -1;
        HRESULT hr = SHGetMalloc(&m_pMalloc); if(FAILED(hr)) return -1;
        hr = SHGetDesktopFolder(&m_psfDesktop);if(FAILED(hr)) return -1;
        SHFILEINFO shfi;
        ZeroMemory(&shfi,sizeof(SHFILEINFO));
        HIMAGELIST hi=(HIMAGELIST)SHGetFileInfo(NULL,0,&shfi,sizeof(SHFILEINFO),SHGFI_ICON |SHGFI_SYSICONINDEX|SHGFI_SMALLICON);
        GetListCtrl().SetImageList(CImageList::FromHandle(hi),LVSIL_SMALL);
        hi=(HIMAGELIST)SHGetFileInfo(NULL,0,&shfi,sizeof(SHFILEINFO),SHGFI_ICON |SHGFI_SYSICONINDEX|SHGFI_LARGEICON);
        GetListCtrl().SetImageList(CImageList::FromHandle(hi),LVSIL_NORMAL);
        return 0;
    }

然后在获取文件信息时，从文件获得其图标在系统图像列表中的索引。

如果列表项是图像文件，并且从文件成功载入图像，那么使用自画功能以替换默认的图标。

.. code-block:: C++

    void CPicViewView::OnCustomDraw(NMHDR* pNMHDR, LRESULT* pResult)
    {
        LPNMLVCUSTOMDRAW lpNMCustomDraw = (LPNMLVCUSTOMDRAW) pNMHDR;
        switch(lpNMCustomDraw ->nmcd.dwDrawStage) {
            case CDDS_PREPAINT : *pResult=CDRF_NOTIFYITEMDRAW;return;
            case CDDS_ITEMPREPAINT:*pResult=CDRF_NOTIFYPOSTPAINT;return;
            case CDDS_ITEMPOSTPAINT:
            {
                int iItem=lpNMCustomDraw ->nmcd.dwItemSpec;
                if(iItem==-1){
                    *pResult=CDRF_DODEFAULT;return;
                }
                CFolderItemInfo* pItemInfo=FindItemInCache(m_arpFolderItems[iItem]);
                if(pItemInfo==NULL||pItemInfo->bFailLoadPic||pItemInfo->pic.m_pPict==NULL){
                    *pResult=CDRF_DODEFAULT;return;
                }
                CRect rectIcon;
                GetListCtrl().GetItemRect(iItem,&rectIcon,LVIR_ICON);
                CDC* pDC=CDC::FromHandle(lpNMCustomDraw->nmcd.hdc);
                pItemInfo->pic.Render(pDC,rectIcon,rectIcon);
            }
            *pResult=CDRF_NEWFONT;return;
        }
        * pResult=0;
    }

上面的代码是使用获取的文件显示信息中的图像，在列表项图标的区域画图。

-----------------
获取显示信息
-----------------

为了缓存列表项的显示信息，或者显示列表项，需要获取列表项的文字、图标、Overlay图标和缩略图等信息。这里使用了ILCombine来把缓存中的相对PIDL转化为完整的Pidl,再据此获得文件的完整路径，然后调用OleLoadPicturePath函数载入图像。

.. code-block:: C++
    
    void CPicViewView::GetItemInfo(LPCITEMIDLIST pidl,CFolderItemInfo* pItemInfo)
    {
        HRESULT hr = theApp.SHGetDisplayNameOf(pidl,pItemInfo->tszDisplayName);
        IShellIcon* pShellIcon=NULL;
        hr=m_psfFolder->QueryInterface(IID_IShellIcon,(LPVOID*)&pShellIcon);
        if (SUCCEEDED(hr)&&pShellIcon){
            pShellIcon->GetIconOf(pidl,0,&pItemInfo->iIcon);
            pShellIcon->Release();
        }
        IShellIconOverlay* pShellIconOverlay =NULL;
        hr=m_psfFolder->QueryInterface(IID_IShellIconOverlay,(LPVOID*)&pShellIconOverlay);
        if (SUCCEEDED(hr)&&pShellIconOverlay){
            int nOverlay=0;
            pShellIconOverlay->GetOverlayIndex(pidl,&nOverlay);
            pItemInfo->state=INDEXTOOVERLAYMASK (nOverlay);
            pShellIconOverlay->Release();
        }
        LPITEMIDLIST pidlItemFull=ILCombine(m_pidlFolder,pidl);
            if(pidlItemFull){
                if(SHGetPathFromIDList(pidlItemFull,pItemInfo->tszPath)){
                    USES_CONVERSION;
                    hr=OleLoadPicturePath(
                        T2OLE(pItemInfo->tszPath)
                        ,NULL,0,RGB(255,255,255)
                        ,IID_IPicture,(LPVOID*)&pItemInfo->pic.m_pPict);
                if(FAILED(hr)){
                        pItemInfo->bFailLoadPic=TRUE;
                        TRACE("OleLoadPicturePath failed %s/r/n",pItemInfo->tszPath);
                    }
                }
            }
            m_pMalloc->Free(pidlItemFull);
        }
    }

-----------------
缓存目录的数据
-----------------

在更改目录时，需要重建目录内容的缓存。这包括目录的pidl和IShellFolder接口指针，目录内容的相对pidl，以及列表项的显示信息（基于性能上的考虑，列表项的显示信息是在接收到LVN_ODCACHEHINT通知的时候缓存的）。

.. code-block:: C++

    LPITEMIDLIST m_pidlFolder;
    IShellFolder * m_psfFolder;
    CTypedPtrArray<CPtrArray,LPITEMIDLIST> m_arpFolderItems;
    CTypedPtrMap<CMapPtrToPtr,LPITEMIDLIST,CFolderItemInfo*> m_mapCache;
     

    void CPicViewView::EnterFolder(LPCITEMIDLIST pidl)
    {
        USES_CONVERSION;
        m_pidlFolder=ILClone(pidl);
        if(m_pidlFolder){
            LPENUMIDLIST ppenum = NULL;
            LPITEMIDLIST pidlItems = NULL;
            ULONG celtFetched;
            HRESULT hr;
            hr = m_psfDesktop->BindToObject(m_pidlFolder, NULL, IID_IShellFolder, (LPVOID *) &m_psfFolder);
            if(SUCCEEDED(hr)){
                hr = m_psfFolder->EnumObjects(NULL,SHCONTF_FOLDERS | SHCONTF_NONFOLDERS, &ppenum);
                if(SUCCEEDED(hr)){
                    while( hr = ppenum->Next(1,&pidlItems, &celtFetched) == S_OK && (celtFetched) == 1){
                        m_arpFolderItems.Add(pidlItems);
                        }
                }
            }
            GetListCtrl().SetItemCount(m_arpFolderItems.GetSize());
        }
    }

打开文件夹
本应用程序显示文件夹的内容而不是显示文档的内容，所以我重载了打开文件时的处理，显示目录选择对话框而不是文件打开对话框。

.. code-block:: C++

    void CPicViewApp::OnFileOpen()
    {
        TCHAR tszDisplayName[_MAX_PATH];
        TCHAR tszPathSelected[_MAX_PATH];
        LPITEMIDLIST pidlSelected=PidlBrowse(m_pMainWnd->GetSafeHwnd(),0,tszDisplayName);
        if(pidlSelected){
            if(SHGetPathFromIDList(pidlSelected,tszPathSelected)){
                CDocument* pDocument=OpenDocumentFile(tszPathSelected);
                pDocument->SetTitle(tszDisplayName);
                ILFree(pidlSelected);
            }
        }
    }

注意从外壳调用获得的PIDL一般都需要调用ILFree或者IMalloc::Free释放。一个例外是调用函数SHBindToParent获得的相对pidl，因为它是输入的参数完整pidl的一部分，所以不必另外释放。

在新建或者打开“文件”时候，文档需要通知视图当前文件夹的更改，这是通过调用CDocument::UpdateAllViews和重载CView::OnUpdate实现的。视图对这个通知的处理是清除上一个目录的缓存数据，缓存新目录的数据，以及更新文档标题。
 
-----------------
打开文件或者目录
-----------------

为了使用方便，双击列表项时可以在同一窗口打开子目录，或者调用系统的默认处理程序打开文件。如果文件是快捷方式，那么打开快捷方式的目标。

.. code-block:: C++

    void CPicViewView::OnDblclk(NMHDR* pNMHDR, LRESULT* pResult)
    {
        LPNMLISTVIEW lpnm=(LPNMLISTVIEW)pNMHDR;
        if(lpnm->iItem==-1)return;
        *pResult = 0;
        HRESULT hr=S_OK;
        LPCITEMIDLIST pidlItem=m_arpFolderItems[lpnm->iItem];
        LPITEMIDLIST pidlItemFull=ILCombine(m_pidlFolder,pidlItem);
        LPITEMIDLIST pidlItemTarget=NULL;
        hr=theApp.SHGetTargetFolderIDList(pidlItemFull,&pidlItemTarget);
        if(pidlItemTarget){
            if(theApp.ILIsFolder(pidlItemTarget)){
                CFolderChange FolderChange;
                FolderChange.m_pidlFolder=pidlItemTarget;
                OnFolderChange(&FolderChange);
            }
            else{
                SHELLEXECUTEINFO ShExecInfo;
                ShExecInfo.cbSize = sizeof(SHELLEXECUTEINFO);
                ShExecInfo.fMask = SEE_MASK_IDLIST;
                ShExecInfo.hwnd = NULL;
                ShExecInfo.lpVerb = NULL;
                ShExecInfo.lpFile = NULL;
                ShExecInfo.lpIDList= pidlItemTarget;
                ShExecInfo.lpParameters = NULL;
                ShExecInfo.lpDirectory = NULL;
                ShExecInfo.nShow = SW_MAXIMIZE;
                ShExecInfo.hInstApp = NULL;
                ShellExecuteEx(&ShExecInfo);
            }
            m_pMalloc->Free(pidlItemTarget);
            m_pMalloc->Free(pidlItemFull);
        }
    }
 
-----------------
性能的优化
-----------------

为了更好的用户体验，可以使用自定义的图标大小（这需要完全自行绘制列表项的图标区域），用单独的线程来载入图像，或者使用调整到图标大小的缩略图缓冲（这样每次绘制时不必拉伸图像）。但是这超出了本文的范围。有兴趣的读者可以自己试一下。

-----------------
参考
-----------------

需要更多信息的话，可以参考

* Shell FAQ
* List-View Controls Overview
* Using List-View Controls
* Customizing a Control's Appearance Using Custom Draw



