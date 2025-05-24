.. meta::
   :description: 微软的桌面搜索API推出也有一段时间了，但是网上可以找到的相关技术资料还不多。官方的资料在https://web.archive.org/web/20051030062212/http://addins.msn.com/devguide.aspx可以看到，而且网页上有SDK和一个C#的示例供下载。

集成桌面搜索，模拟器
======================

.. post:: 24 Aug, 2005
   :tags: MFC,Windows Desktop Search
   :category: Visual C++, Microsoft Foundation Classes
   :author: me
   :nocomments:

微软的桌面搜索API推出也有一段时间了，但是网上可以找到的相关技术资料还不多。官方的资料在https://web.archive.org/web/20051030062212/http://addins.msn.com/devguide.aspx可以看到，而且网页上有SDK和一个C#的示例供下载。


使用搜索API非常的简单，首先创建一个桌面搜索对象

.. code-block:: C++

    BOOL CWDSSampleView::PreCreateWindow(CREATESTRUCT& cs)
    {
    // TODO: Modify the Window class or styles here by modifying
    //  the CREATESTRUCT cs
    if(m_pSearchDesktop.CreateInstance(CLSID_SearchDesktop))
    {
        AfxMessageBox(IDS_FAILED_TO_CREATE_SEARCH_ENGINE);
        return FALSE;
    }
    
之后就可以开始执行搜索了。桌面搜索对象有两个方法，ExecuteSQLQuery和ExecuteQuery，都返回一个ADO记录集对象。ExecuteQuery是对用户比较友好的版本，参数虽然比较多，但是不需要自己构建SQL；而ExecuteSQLQuery是底层版本，只有一个参数——需要自己构造的SQL。相信我，你不会渴望自己来创建SQL的。传递给ExecuteQuery的参数就已经够长的了。字符串表中IDS_COLUMNS_GENERAL的内容是：

.. code-block:: C++

    DocTitle,DocFormat,Url,DocAuthor,PrimaryDate,FileName, FileExt,IsAttachment,Characterization,Rank,PerceivedType, HasAttach,DocTitlePrefix,FileExtDesc,DisplayFolder, DocKeywords,DocComments,ConversationID,Size, Create,Write

.. code-block:: C++

    void CWDSSampleView::Search(LPCTSTR lpszQuery,LPCTSTR lpszSort)
    {
        CString strQuery(lpszQuery);if(strQuery.IsEmpty())return;
        CString strSort(lpszSort);
        USES_CONVERSION;
        HRESULT hr=S_OK;
        GetListCtrl().SetItemCount(0);
        ClearCache();
        try{
            CString strColumns;
            VERIFY(strColumns.LoadString(IDS_COLUMNS_GENERAL));
            if(strSort.IsEmpty())
                m_pRecordset=m_pSearchDesktop->ExecuteQuery(T2OLE(strQuery),
                    T2OLE(strColumns),NULL,NULL);
            else
                m_pRecordset=m_pSearchDesktop->ExecuteQuery(T2OLE(strQuery),
                    T2OLE(strColumns),T2OLE(strSort),NULL);
            int nItemCount=m_pRecordset->GetRecordCount();
            GetListCtrl().SetItemCount(nItemCount);        
        }
        catch(_com_error&e)
        {
            //……
        }
    }


https://github.com/jiangsheng/Samples/tree/master/WDSSample

但是，访问返回的记录集的速度比访问数据库要慢。我不得不用虚列表和缓存来提高性能。在搜索结果很多（例如关键字选择"Microsoft"）时程序有假死现象——当然也不排除我选择的字段过多的原因。


最近在写一个14位CPU的模拟器，CPU指令长度是固定的——13字节，十分的不吉利^_^b，而且CPU指令集中一些特定指令会根据上下文判断是否跳过下一个指令。但是在Intel系统上没有这样的指令，而且指令长度是可变的，所以无法知道下一个指令的长度来跳过它。我现在是在内存中设置一个标志，在执行每个指令之前检查这个标志来判断前一个指令是否指明跳过当前指令——低效，但是可以正常工作。
