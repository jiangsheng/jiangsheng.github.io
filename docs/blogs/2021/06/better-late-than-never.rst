.. meta::
   :description: This post originally appeared on Joycode on Sept 17 2004.

Better Late Than Never
===========================
.. post:: 16, Jun, 2021
   :category: Uncategorized
   :author: me
   :nocomments:

This post originally appeared on Joycode on Sept 17 2004.

在文件选择对话框和浏览器中都可以显示文件夹视图，但是有时需要对显示的方式进行控制，例如在文件选择对话框初始化时设置显示方式为详细资料视图或者缩略图视图，有的时候需要用程序来选择一些项目，例如在文件选择对话框中添加全选按钮，或者打开文件所在文件夹并且选中指定文件。

我在大约一年之前的一个Post(`http://blog.joycode.com/jiangsheng/archive/2003/11/09/6152.aspx <https://web.archive.org/web/20160601063730/http://blog.joycode.com/jiangsheng/archive/2003/11/09/6152.aspx>`__)中提及到这个问题，搞定了之后一直忘记公布答案了，今天在CSDN社区看到别人问的类似问题才想起自己已经解决了，所以现在拿出来分享……

| 关于如何设置文件夹视图的显示方式的问题，Paul
  DiLascia在他的MSDN杂志C++Q&A专栏中提供了另一个解决方案。参见
| List View Mode, SetForegroundWindow, and Class
  Protection(`http://msdn.microsoft.com/msdnmag/issues/04/03/CQA/ <https://web.archive.org/web/20160601063730/http://msdn.microsoft.com/msdnmag/issues/04/03/CQA/>`__)。PS:这家伙又用Spy++大法……

浏览器控件显示文件夹视图（例如本地目录或者FTP站点）时在其中双击目录，选中的目录会用新的资源管理器窗口打开的问题，是因为浏览器控件中的文件夹视图在打开文件夹的时候并不触发浏览器的NewWindow2事件，而是调用ShellExecuteEx，用DDE的方式和Shell通讯。微软知识库文章Q189634
WebApp.exe Enables User to Move WebBrowser
Ctrl（\ `http://support.microsoft.com?kbid=189634 <https://web.archive.org/web/20160601063730/http://support.microsoft.com/?kbid=189634>`__\ ）描述了如何处理这样的DDE会话。呃……顺便说一下，这篇文章文不对题……

下面的给出访问文件打开/保存对话框和浏览器控件的文件夹视图的代码(MFC)

   | #ifndef WM_GETISHELLBROWSER
   | #define WM_GETISHELLBROWSER
     (WM_USER+7)//差不多一年过去了，这个消息还是a yet-to-be documented
     message
   | #endif

   | void CCustomFileDialog::OnInitDone()
   | {
   | CFileDialog::OnInitDone();
   | //Remember, when you customize the open file dialog,
   | //your CFileDialog is actually a child of the real dialog,
   | //which explains why you must use GetParent.
   | //(For details see article “Give Your Applications the Hot New
     Interface Look with Cool Menu Buttons”
   | //in the January 1998 issue of C++Q&A, MSJ.)

   | // WARNING! Although this is a non-intrusive customization,
   | // it does rely on unpublished (but easily obtainable)
   | // information. The Windows common file dialog box implementation
   | // may be subject to change in future versions of the
   | // operating systems, and may even be modified by updates of
   | // future Microsoft applications. This code could break in such
   | // a case. It is intended to be a demonstration of one way of
   | // extending the standard functionality of the common dialog boxes.
   | m_pSB=(IShellBrowser
     \*)GetParent()->SendMessage(WM_GETISHELLBROWSER,0,0);

   | //To control the folder view of the webbrowse control (e.g. in
     CHTMLView),
   | //send this message to it and get its IShellBrowser interface.
   | //example:
   | //in CMyHTMLView::OnDocumentComplete()
   | // m_pSB=(IShellBrowser
     \*)GetDlgItem(AFX_IDW_PANE_FIRST)->SendMessage(WM_GETISHELLBROWSER,0,0);
   | //if you create your webbrowser control manually as follows
   | //extern CWnd m_wndBrowser;
   | //m_wndBrowser.CreateControl(CLSID_WebBrowser, lpszWindowName,
   | //   WS_VISIBLE \| WS_CHILD, rectPosition, pwndParent, nChildID))
   | //then send message like this
   | //m_pSB=(IShellBrowser
     \*)m_wndBrowser.SendMessage(WM_GETISHELLBROWSER,0,0);
   | }

通常获得IShellBrowser不足以满足我们的需求，我们要定制的特性通常和界面相关，例如控制文件夹视图选择一些项目。这时候可以调用IShellBrowser::QueryActiveShellView来获得IShellView接口进行选择操作（如果操作系统是WindowsXP，那么也可以从IShellView接口查询IFolderView接口来执行操作）。

为了偷懒，我的代码基于微软知识库文章Q195034 HOWTO: OfnKing Demonstrates
CFileDialog Customization
(http://support.microsoft.com/?kbid=195034)的代码，增加了一个全选按钮，在按钮的响应函数中编写了下面的代码选择文件夹视图中的全部文件。如果操作系统是WindowsXP，还同时切换到缩略图视图。

   | //If you don’t have VS.NET, you need to download Platform SDK:
   | //http://www.microsoft.com/msdownload/platformsdk/sdkupdate/
   | #define GetPIDLFolder(pida)
     (LPCITEMIDLIST)(((LPBYTE)pida)+(pida)->aoffset[0])
   | #define GetPIDLItem(pida, i)
     (LPCITEMIDLIST)(((LPBYTE)pida)+(pida)->aoffset[i+1])
   | //a similar ILIsFolder function is included in the sample code of
     my article
   | //”Folder Thumbnail View Using Virtual List and Custom Draw”
     //http://dev.csdn.net/article/22/22243.shtm
   | BOOL    ILIsFile(LPCITEMIDLIST pidl) {
   |       BOOL bRet=FALSE;
   |       LPCITEMIDLIST  pidlChild=NULL;
   |       IShellFolder\* psf=NULL;
   |       HRESULT    hr = SHBindToParent(pidl, IID_IShellFolder,
     (LPVOID\*)&psf, &pidlChild);
   |       if (SUCCEEDED(hr) && psf)     {
   |           SFGAOF rgfInOut=SFGAO_FOLDER|SFGAO_FILESYSTEM ;
   |           hr=psf->GetAttributesOf(1,&pidlChild,&rgfInOut);
   |           if (SUCCEEDED(hr))         {
   |               //in file system, but is not a folder
   |               if( (~rgfInOut&SFGAO_FOLDER) &&
     (rgfInOut&SFGAO_FILESYSTEM) )
   |               {
   |                   bRet=TRUE;
   |               }
   |           }
   |           psf->Release();
   |       }
   |       return bRet;
   |   }
   | void CCustomFileDialog::OnSelectAll() {
   |       if(m_pSB&&m_bMulti&&m_bExplorer)//Using IShellBrowser to
     Communicate with folder view
   |       {
   |           IShellView  \* pIShellView  =NULL;
   |           LPMALLOC pMalloc = NULL;
   |           IDataObject\* pIDataObject=NULL;
   |           IFolderView\* pFolderView=NULL;
   |           FORMATETC fmte;
   |           STGMEDIUM stgmedium ;
   |           ZeroMemory( (LPVOID)&fmte, sizeof(STGMEDIUM) );
   |           ZeroMemory( (LPVOID)&fmte, sizeof(FORMATETC) );
   |           fmte.tymed = TYMED_HGLOBAL;
   |           fmte.lindex = -1;
   |           fmte.dwAspect = DVASPECT_CONTENT;
   |           fmte.cfFormat =
     RegisterClipboardFormatA(CFSTR_SHELLIDLIST);
   |          LPITEMIDLIST pidlFull=NULL;
   |           do
   |           {
   |               HRESULT hr=m_pSB->QueryActiveShellView(&pIShellView);
   |               if(FAILED(hr))break;
   |              
     hr=pIShellView->QueryInterface(IID_IFolderView,(LPVOID\*)&pFolderView);
   |               if(pFolderView)//change view mode
   |               {
   |                   pFolderView->SetCurrentViewMode(FVM_THUMBNAIL);
   |                   //pFolderView->SetCurrentViewMode(FVM_DETAILS);
   |               }
   |               hr=::SHGetMalloc(&pMalloc); //Get pointer to shell
     alloc
   |               if(FAILED(hr))break;
   |               hr=pIShellView->GetItemObject(SVGIO_ALLVIEW
     ,IID_IDataObject,(LPVOID\*)&pIDataObject);
   |               if(FAILED(hr))break;
   |               if(pIDataObject==NULL)break;
   |               hr=pIDataObject->GetData(&fmte,&stgmedium);
   |               if(FAILED(hr))break;
   |               LPIDA pida = (LPIDA) GlobalLock(stgmedium.hGlobal);
   |               if (pida)
   |               {
   |                   LPCITEMIDLIST    pidlFolder=GetPIDLFolder(pida);
   |                   for(UINT i=0;i<pida->cidl;i++)
   |                   {
   |                       //filter folders
   |                       LPCITEMIDLIST pidl=GetPIDLItem(pida,i);
   |                       pidlFull=ILCombine(pidlFolder,pidl);
   |                       if(ILIsFile(pidlFull))
   |                       {
   |                          
     hr=pIShellView->SelectItem(pidl,SVSI_SELECT);
   |                           if(FAILED(hr))
   |                               break;
   |                       }
   |                       pMalloc->Free(pidlFull);
   |                       pidlFull=NULL;
   |                   }
   |                   //Move focus to the folder view so that
   |                   //the selected items show properly
   |                   pIShellView->UIActivate(SVUIA_ACTIVATE_FOCUS);
   |                   OnSelectButton();
   |               }
   |           }
   |           while(FALSE);
   |           //Clean up
   |           GlobalUnlock(stgmedium.hGlobal);
   |           ReleaseStgMedium(&stgmedium);
   |           if(pIDataObject)
   |               pIDataObject->Release();
   |           if(pIShellView)
   |               pIShellView->Release();
   |           if(pMalloc){
   |               if(pidlFull)
   |                   pMalloc->Free(pidlFull);
   |               pMalloc->Release();
   |           }
   |           if(pFolderView)
   |               pFolderView->Release();
   |       }
   |   }

