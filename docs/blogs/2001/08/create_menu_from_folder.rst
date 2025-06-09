.. meta::
   :description:
       This post outlines a method for dynamically generating a Windows application menu based on the contents of a specified directory. 

使用目录内容建立菜单
========================

.. post:: 2, Aug, 2001
   :tags: MFC
   :category: UI
   :author: me
   :nocomments:


目的：根据目录内容，建立一个菜单。菜单项为目录中的文件和子目录（以弹出方式显示）。

解决方案：遍历子目录，建立一个文件路径数组。菜单项的ID是数组的索引。当用户单击某个菜单项时，从数组中读取文件路径并执行相应的操作。

细节：

首先，我们需要一个菜单。新建立的菜单将作为此菜单的子菜单。

.. code-block:: C++
    
    CMenu*          pmenuFavorites=new CMenu;
    pmenuFavorites->CreatePopupMenu();

然后读取目录，建立菜单

.. code-block:: C++
    
    BuildFavoritesMenu(szPath, 0, pmenuFavorites);

最后，将菜单连接到已有菜单上面去

.. code-block:: C++

    CMenu* pMenu=m_menuPopup.GetSubMenu(0);
    pMenu->ModifyMenu(m_iMenuPosition,MF_BYPOSITION|MF_POPUP| MF_STRING,(UINT)(pmenuFavorites->GetSafeHmenu()),_T("动态菜单"));
    pmenuFavorites->Detach();
    delete pmenuFavorites;


其它的都很简单，但是建立这个菜单很麻烦

申明一个变量来存文件路径

.. code-block:: C++

   CStringArray m_astrFavoriteURLs;
   int CWorkBenchDlg::BuildMenu(LPCTSTR pszPath, int nStartPos, CMenu* pMenu)
   {
      CString         strPath(pszPath);//path to start from
      CString         strPath2;//path to start from,with trailing backslash
      CString         str;//menu item text
      WIN32_FIND_DATA wfd;
      HANDLE          h;
      int             nPos;
      int             nEndPos;
      int             nNewEndPos;
      int             nLastDir;
      TCHAR           buf[INTERNET_MAX_PATH_LENGTH];
      CStringArray    astrFavorites;
      CStringArray    astrDirs;
      CMenu*          pSubMenu;
      
      // make sure there's a trailing backslash
      if(strPath[strPath.GetLength() - 1] != _T('/'))
         strPath += _T("/");

      strPath2 = strPath;
      strPath += _T("*.*");
      // now scan the directory, first for files and then for subdirectories
      //make a array of full path names.
      h = FindFirstFile(strPath, &wfd);
      if(h != INVALID_HANDLE_VALUE)
      {
         nEndPos = nStartPos;
         do
         {
            if((wfd.dwFileAttributes & (FILE_ATTRIBUTE_DIRECTORY|FILE_ATTRIBUTE_HIDDEN|FILE_ATTRIBUTE_SYSTEM))==0)
            {
               str = wfd.cFileName;//file name
               lstrcpy(buf,strPath2 + str);//file full pathname
               if(str.Right(4) .CompareNoCase(_T(".url"))==0)
               {
                  // an .URL file is formatted just like an .INI file, so we can
                  // use GetPrivateProfileString() to get the information we want
                  //fill the buf with URL
                  ::GetPrivateProfileString(_T("InternetShortcut"), _T("URL"),
                                             _T(""), buf, INTERNET_MAX_PATH_LENGTH,
                                             strPath2 + str);
                  str = str.Left(str.GetLength() - 4);//the name of URL
               }
               if(str.Right(4) .CompareNoCase( _T(".lnk"))==0)
               {
                  //fill the buf with link target
                  CGlobal::ResolveShortCut(NULL,strPath2 + str,buf);
                  str = str.Left(str.GetLength() - 4);
               }
               //TODO:add other format process here

               //这里对.url文件和.lnk文件做了处理，去掉了扩展名。lnk文件的处理参见http://support.microsoft.com/support/kb/articles/Q130/6/98.asp 。可以对其他格式的文件进行处理并更改菜单文字。

               // scan through the array and perform an insertion sort
               // to make sure the menu ends up in alphabetic order
               for(nPos = nStartPos ; nPos < nEndPos ; ++nPos)
               {
                  if(str.CompareNoCase(astrFavorites[nPos]) < 0)
                        break;
               }
               astrFavorites.InsertAt(nPos, str);
               m_astrFavoriteURLs.InsertAt(nPos, buf);
               ++nEndPos;
            }
         } 
         while(FindNextFile(h, &wfd));

         FindClose(h);
         // Now add these items to the menu
         for(nPos = nStartPos ; nPos < nEndPos ; ++nPos)
         {
               pMenu->AppendMenu(MF_STRING | MF_ENABLED, 0xe00 + nPos, astrFavorites[nPos]);
         }


         // now that we've got all files, check the subdirectories for more
         nLastDir = 0;
         h = FindFirstFile(strPath, &wfd);
         ASSERT(h != INVALID_HANDLE_VALUE);
         do
         {
            if(wfd.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY)
            {
               // ignore the current and parent directory entries
               if(lstrcmp(wfd.cFileName, _T(".")) == 0 || lstrcmp(wfd.cFileName, _T("..")) == 0)
                  continue;

               for(nPos = 0 ; nPos < nLastDir ; ++nPos)
               {
                  if(astrDirs[nPos].CompareNoCase(wfd.cFileName) > 0)
                        break;
               }
               pSubMenu = new CMenu;
               pSubMenu->CreatePopupMenu();

               // call this function recursively.
               nNewEndPos = BuildFavoritesMenu(strPath2 + wfd.cFileName, nEndPos, pSubMenu);
               if(nNewEndPos != nEndPos)
               {
                  // only insert a submenu if there are in fact files in the subdirectory
                  nEndPos = nNewEndPos;
                  pMenu->InsertMenu(nPos, MF_BYPOSITION | MF_POPUP | MF_STRING, (UINT)pSubMenu->m_hMenu, wfd.cFileName);
                  pSubMenu->Detach();
                  astrDirs.InsertAt(nPos, wfd.cFileName);
                  ++nLastDir;
               }
               delete pSubMenu;
            }
         } 
         while(FindNextFile(h, &wfd));
         FindClose(h);
      }
      return nEndPos;
   }


好了，菜单建立完了。万事大吉？没有。还要写命令处理函数。

.. code-block:: C++

    afx_msg void OnMenu(UINT nID)

    {

        ShellExecute(NULL,NULL,m_astrFavoriteURLs[nID-0xe00],NULL,NULL,SW_SHOWDEFAULT);

    }

和消息映射

.. code-block:: C++

    //}}AFX_MSG_MAP
    ON_COMMAND_RANGE(0xe00, 0xfff, OnMenu)
    END_MESSAGE_MAP()

这里我使用了0xe00到0xfff作为命令ID的范围，所以最多有512个文件菜单项（够用吗？不够用自己写一个数好了）。因为通常命令的ID大于327xx,所以不会和其他菜单冲突（倒是可能会和按钮ID冲突，自己注意一下资源ID范围就OK啦）。

好了，编译，运行，通过！

唯一的遗憾是没有文件的图标。由于我对操作系统不是很熟悉，不知道怎么才能得到文件的图标并画到菜单上面去。欢迎各方高人指教！

在Windows ME和Visual C++6 SP5下测试通过。
