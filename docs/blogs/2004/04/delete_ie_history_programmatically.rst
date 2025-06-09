.. meta::
   :description: 明天出发去西雅图参加微软全球最有价值专家年会了，暂停更新一段时间。 在你调用IUrlHistoryStg:DeleteUrl 之后, 这个URL项目仍旧会出现在IE历史纪录目录中。 你可以使用IContextMenu::InvokeCommand模拟一个手动删除命令，但是这样做的缺点是你不能够跳过删除确认对话框 下面的

编程删除IE历史
=======================

.. post:: 1, Apr, 2004
   :tags: MSHTML
   :category: Win32
   :author: me
   :nocomments:

明天出发去西雅图参加微软全球最有价值专家年会了，暂停更新一段时间。

在你调用IUrlHistoryStg:DeleteUrl 之后, 这个URL项目仍旧会出现在IE历史纪录目录中。

你可以使用IContextMenu::InvokeCommand模拟一个手动删除命令，但是这样做的缺点是你不能够跳过删除确认对话框

下面的代码删除一个IE历史纪录目录中顶层目录的第一项。这通常是最久的历史纪录，但是你可以修改部分代码来删除需要的项目。

.. code-block:: C++

    // Error checking minimized for clarity.
    void DeleteUrlFromHistoryShell()
    {
        HRESULT hr;

        // Call this if needed.
        CoInitialize( NULL );

        IShellFolder* pDesktopFolder = NULL;
        IMalloc* pMalloc = NULL;

        hr = ::SHGetMalloc(&pMalloc;);

        // Get desktop folder.
        hr = ::SHGetDesktopFolder(&pDesktopFolder;);

        // Get the history folder.
        ITEMIDLIST* pidlHistoryFolder = NULL;
        hr = ::SHGetSpecialFolderLocation(NULL, CSIDL_HISTORY, &pidlHistoryFolder;);

        // Get the IShellFolder of the history folder.
        IShellFolder* pHistoryFolder = NULL;
        hr = pDesktopFolder->BindToObject(pidlHistoryFolder, NULL, IID_IShellFolder, (void**)&pHistoryFolder;);

        // Enumerate the history items.
        IEnumIDList* pHistoryEnum = NULL;
        hr = pHistoryFolder->EnumObjects(NULL, SHCONTF_FOLDERS | SHCONTF_NONFOLDERS, &pHistoryEnum;);

        ITEMIDLIST* pidl = NULL;
        ULONG fetched = 0;

        hr = pHistoryEnum->Next(1, &pidl;, &fetched;);

        if (SUCCEEDED(hr))
        {
            const ITEMIDLIST* pidl2 = pidl;

            // Get the IContextMenu interface.
            IContextMenu* pContextMenu = NULL;
            hr = pHistoryFolder->GetUIObjectOf(NULL, 1, &pidl2;, IID_IContextMenu, NULL, (void**)&pContextMenu;);

            if (SUCCEEDED(hr))
            {
                CMINVOKECOMMANDINFO pCommandInfo = { 0 };

                pCommandInfo.cbSize = sizeof(CMINVOKECOMMANDINFO);
                pCommandInfo.lpVerb = _T("delete");
                pCommandInfo.fMask = CMIC_MASK_FLAG_NO_UI; // has no effect
                hr = pContextMenu->InvokeCommand(&pCommandInfo;);
            }

            pContextMenu->Release();
        }

        pHistoryEnum->Release();
        pHistoryFolder->Release();
        pMalloc->Release();
        pDesktopFolder->Release();
    }

IUrlHistoryStg2::ClearHistory从IE历史纪录目录清除一已经被删除的URL项目。IUrlHistoryStg:DeleteUrl 并非设计来用于删除历史纪录中的URL项目，因为很多内部函数依赖于它，所以他的行为不能被改变。
