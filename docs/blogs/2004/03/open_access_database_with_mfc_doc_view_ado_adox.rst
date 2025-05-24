.. meta::
   :description: 本文描述了如何在MFC的文档/视图/框架架构中使用ADO和ADOX来创建和打开数据库。 在阅读本文之前，建议先对COM，数据库和MFC的文档/视图/框架有一个基本的了解。推荐阅读下列文章 TN025: Document, View, and Frame Creation (https://learn.microsoft

结合ADO、ADOX和MFC的文档/视图/框架架构创建和打开Access数据库
==========================================================================================

.. post:: 15, Mar, 2004
   :tags: ADO, MFC
   :category: Microsoft Foundation Classes, ADO
   :author: me
   :nocomments:


本文描述了如何在MFC的文档/视图/框架架构中使用ADO和ADOX来创建和打开数据库。

-------------
预备阅读
-------------

在阅读本文之前，建议先对COM，数据库和MFC的文档/视图/框架有一个基本的了解。推荐阅读下列文章

^^^^^^^^^^^^^^^^^^
MFC技术文章
^^^^^^^^^^^^^^^^^^

* TN025: Document, View, and Frame Creation (https://learn.microsoft.com/en-us/cpp/mfc/tn025-document-view-and-frame-creation)

^^^^^^^^^^^^^^^^^^
微软知识库文章
^^^^^^^^^^^^^^^^^^

* Q183606 ActiveX Data Objects (ADO) Frequently Asked Questions (https://web.archive.org/web/20040514201148/https://support.microsoft.com/default.aspx?scid=kb;EN-US;q183606)
* Q169496 INFO: Using ActiveX Data Objects (ADO) via #import in VC++ (https://web.archive.org/web/20030823233705/https://support.microsoft.com/default.aspx?scid=kb;EN-US;169496)
* Q317881 HOW TO: Create an Access Database Using ADOX and Visual C# .NET (https://web.archive.org/web/20060302034758/https://support.microsoft.com/default.aspx?scid=kb;EN-US;317881)
* Q252908 HOWTO: Create a Table with Primary Key Through ADOX (https://web.archive.org/web/20040124043242/https://support.microsoft.com/default.aspx?scid=kb;en-us;252908)
* Q201826 PRB: Error 3265 When You Access Properties Collection (https://web.archive.org/web/20000304202911/https://support.microsoft.com/support/kb/articles/q201/8/26.asp)

^^^^^^^^^^^^^^^^^^
Office VBA参考
^^^^^^^^^^^^^^^^^^

* Creating and Modifying Access Tables

------------------
步骤
------------------

#. 在计算机上安装MDAC2.5以上版本
#. 打开VC。首先，我们使用MFC应用程序向导创建一个标准的MDI程序，这里我为这个工程起名为Passport,然后在stdafx.h中导入ADOX

   .. code-block:: C++

      #include <shlwapi.h>
      #import "c:/Program Files/Common Files/system/ado/Msado15.dll"  rename("EOF","adoEOF") rename("DataTypeEnum","adoDataTypeEnum")
      #import "c:/Program Files/Common Files/System/ADO/Msadox.dll"  rename("EOF", "adoXEOF") rename("DataTypeEnum","adoXDataTypeEnum")
      #import "c:/PROGRAM FILES/COMMON FILES/System/ado/MSJRO.DLL"

根据你的计算机上ADO的安装路径，这里的路径可能有所不同。

#.  在文档类中声明数据库连接 ADODB::_ConnectionPtr m_pConn;和记录集 ADODB::_RecordsetPtr m_pSet;，并且重载文档类的DeleteContents() 、OnNewDocument()和OnOpenDocument()函数，用于断开数据库连接，创建数据库和表，以及打开现有的数据库。
    （作者的抱怨：CSDN文章中心该改改了，代码排版这么麻烦）

   .. code-block:: C++

      void CPassportDoc::DeleteContents()
      {
         try
         {
            if(m_pSet){
               ESRecordsetClose(m_pSet);
            }
            if(m_pConn)
               if(m_pConn->State&ADODB::adStateOpen)
                  m_pConn->Close();
               m_pConn=NULL; 
         }
         catch(_com_error &e){
            ESErrPrintProviderError(m_pConn);
            ESErrPrintComError(e);
         }
         CDocument::DeleteContents();
      }
      BOOL CPassportDoc::OnNewDocument()
      {
         if (!CDocument::OnNewDocument())
            return FALSE;
         CFileDialog dlgFile(FALSE, _T(".mdb"), NULL, OFN_HIDEREADONLY | OFN_PATHMUSTEXIST, _T("Access 数据库 (*.mdb)|*.mdb|全部文件(*.*)|*.*||"));
         if (dlgFile.DoModal() != IDOK)
            return FALSE;
         CString strDBPath=dlgFile.GetPathName();
            if(!CreateDB(strDBPath))return FALSE;
         //create
         CString strConnect;
       
         strConnect.Format(_T("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=%s"),strDBPath);
         COleVariant Connect(strConnect); 
         // TODO: add reinitialization code here
         // (SDI documents will reuse this document)
         try{
            m_pConn.CreateInstance(_T("ADODB.Connection"));
            m_pSet.CreateInstance(_T("ADODB.Recordset"));
            m_pConn->PutCommandTimeout(30);
            m_pConn->PutConnectionTimeout(30);
            m_pConn->put_CursorLocation(ADODB::adUseClient);
            m_pConn->Open(_bstr_t(strConnect),_bstr_t(),_bstr_t(),ADODB::adConnectUnspecified);
            ::ESRecordsetOpen(_T("Passport"),m_pConn,m_pSet);
            SetPathName(strDBPath);
            return TRUE;
         }
         catch(_com_error &e){
            ESErrPrintProviderError(m_pConn);
            ESErrPrintComError(e);
         }
         catch(...){
         }
         m_pConn=NULL;
         return FALSE;
      }
      BOOL CPassportDoc::OnOpenDocument(LPCTSTR lpszPathName)
      {
         if (!CDocument::OnOpenDocument(lpszPathName))
            return FALSE;
         ADODB::_ConnectionPtr tempConnn;
         CString strConnect;
         CString strDBPath=lpszPathName;
         strConnect.Format(_T("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=%s"),strDBPath);
         COleVariant Connect(strConnect); 
         // TODO: add reinitialization code here
         // (SDI documents will reuse this document)
         try{
            tempConnn.CreateInstance(_T("ADODB.Connection"));
            tempConnn->PutCommandTimeout(30);
            tempConnn->PutConnectionTimeout(30);
            tempConnn->put_CursorLocation(ADODB::adUseClient);
            tempConnn->Open(_bstr_t(strConnect),_bstr_t(),_bstr_t(),ADODB::adConnectUnspecified);
            SetPathName(strDBPath);
            m_pConn=tempConnn;
            m_pSet=NULL;
            m_pSet.CreateInstance(_T("ADODB.Recordset"));
            ::ESRecordsetOpen(_T("Passport"),m_pConn,m_pSet);
            UpdateAllViews(NULL,UpdateHintRefresh);
            return TRUE;
         }
         catch(_com_error &e){
            ESErrPrintProviderError(tempConnn);
            ESErrPrintComError(e);
         }
         catch(...){
         } 
         return FALSE;
      }

#. 编写一个辅助函数，用于创建数据库、表和索引

   .. code-block:: C++
        
      BOOL CPassportDoc::CreateDB(LPCTSTR lpszFile)
      {
         if(::PathFileExists(lpszFile)){
            CString strTemp;
            strTemp.Format(IDS_TARGET_EXISTS,lpszFile);
            AfxMessageBox(lpszFile);
            return FALSE;
         }
         ADODB::_ConnectionPtr tempConnn;
         ADOX::_CatalogPtr pCatalog = NULL;
         ADOX::_TablePtr  pTable = NULL;
         ADOX::_IndexPtr pIndexNew  = NULL;
         ADOX::_IndexPtr pIndex  = NULL;
         CString strConnect;
         CString strDBPath=lpszFile;
         strConnect.Format(_T("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=%s"),strDBPath);
         COleVariant Connect(strConnect); 
         try{
            pCatalog.CreateInstance(_T("ADOX.Catalog"));
            pCatalog->Create((LPCTSTR)strConnect);//创建数据库
            tempConnn.CreateInstance(_T("ADODB.Connection"));
            tempConnn->PutCommandTimeout(30);
            tempConnn->PutConnectionTimeout(30);
            tempConnn->put_CursorLocation(ADODB::adUseClient);
            tempConnn->Open(_bstr_t(strConnect),_bstr_t(),_bstr_t(),ADODB::adConnectUnspecified);
            pCatalog->PutActiveConnection(_variant_t((IDispatch *) tempConnn));
            pTable.CreateInstance(_T("ADOX.Table"));
            pTable->ParentCatalog =pCatalog;
            pTable->Name="Passport";
            ADOX::ColumnsPtr pCols =pTable->Columns;
            pCols->Append(_T("RecordID")  ,ADOX::adInteger,0);//自动编号字段
            pCols->Append(_T("Name")   ,ADOX::adWChar,255);//文本字段
            pCols->Append(_T("DateOfBirth")  ,ADOX::adDate,0);//日期字段
            pCols->Append(_T("OtherInfo"),ADOX::adLongVarWChar,0);//备注字段
            pCatalog->Tables->Refresh();
            long lCount=pCols->Count;
            for(long i=0;i<lCount;i++){
               pCols->GetItem(i)->ParentCatalog =pCatalog;//重要！设置Catalog,参见Q201826 PRB: Error 3265 When You Access Properties Collection
               ADOX::PropertiesPtr pProperties=pCols->GetItem(i)->Properties;
               if(pProperties)
               {
                  //这里是用于调试的属性显示代码
                  long lp=pProperties->Count;
                  TRACE("Properties for Col %s/r/n",(LPCTSTR)pCols->GetItem(i)->Name);
                  for(long j=0;j<lp;j++)
                  {
                     TRACE("/rProperty %s:%s/r/n",g_GetValueString(pProperties->GetItem(j)->Name)
                        ,g_GetValueString(pProperties->GetItem(j)->Value));
                  }
               }
            }
            pCols->GetItem(_T("RecordID"))->Properties->GetItem(_T("Description"))->Value=_T("记录编号");//注释
            pCols->GetItem(_T("RecordID"))->Properties->GetItem(_T("AutoIncrement"))->Value=true;//自动编号
            pCols->GetItem(_T("Name"))->Properties->GetItem(_T("Jet OLEDB:Compressed UniCode Strings"))->Value=true;
            pCols->GetItem(_T("Name"))->Properties->GetItem(_T("Description"))->Value=_T("姓名");
            pCols->GetItem(_T("DateOfBirth"))->Properties->GetItem(_T("Description"))->Value=_T("出生日期");
            pCols->GetItem(_T("OtherInfo"))->Properties->GetItem(_T("Jet OLEDB:Compressed UniCode Strings"))->Value=true;
            pCols->GetItem(_T("OtherInfo"))->Properties->GetItem(_T("Description"))->Value=_T("其他信息");
            pCatalog->Tables->Append(_variant_t ((IDispatch*)pTable));//添加表
            pCatalog->Tables->Refresh();//刷新
            pIndexNew.CreateInstance(_T("ADOX.Index"));
            pIndexNew->Name = "RecordID";//索引名称
            pIndexNew->Columns->Append("RecordID",ADOX::adInteger,0);//索引字段
            pIndexNew->PutPrimaryKey(-1);//主索引
            pIndexNew->PutUnique(-1);//唯一索引
            pTable->Indexes->Append(_variant_t ((IDispatch*)pIndexNew));//创建索引
            pIndexNew=NULL;
            pCatalog->Tables->Refresh();//刷新
            return TRUE;
         }
         catch(_com_error &e){
            ESErrPrintProviderError(tempConnn);
            ESErrPrintComError(e);
         return FALSE;
         }
         catch(...){
         } 
         return FALSE;
      }
#. 辅助的数据库函数。由于这些函数是Jiangsheng以前为一个项目写的。所以命名有些奇怪。借鉴了MFC类CDaoRecordset的部分代码

   .. code-block:: C++

      #define _countof(array) (sizeof(array)/sizeof(array[0]))
      BOOL ESRecordsetOpen(
         LPCTSTR lpszSQL
         ,ADODB::_ConnectionPtr pConnection
         ,ADODB::_RecordsetPtr& rst
         ,ADODB::CursorTypeEnum CursorType//=adOpenDynamic
         ,ADODB::LockTypeEnum LockType//=ado20::adLockOptimistic
         ,long lOptions//=adCmdUnspecified
         )
      {
         _bstr_t bstrQuery;
         const TCHAR _afxParameters2[] = _T("PARAMETERS ");
         const TCHAR _afxSelect2[] = _T("SELECT ");
         const TCHAR _afxTransform2[] = _T("TRANSFORM ");
         const TCHAR _afxTable2[] = _T("TABLE ");
         // construct the default query string
         if ((_tcsnicmp(lpszSQL, _afxSelect2, _countof(_afxSelect2)-1) != 0) &&
         (_tcsnicmp(lpszSQL, _afxParameters2, _countof(_afxParameters2)-1) != 0) &&
         (_tcsnicmp(lpszSQL, _afxTransform2, _countof(_afxTransform2)-1) != 0) &&
         (_tcsnicmp(lpszSQL, _afxTable2, _countof(_afxTable2)-1) != 0)){
            CString strTemp;
            strTemp.Format("SELECT * FROM (%s)",lpszSQL);
            bstrQuery=(LPCTSTR)strTemp;
         }
         else
            bstrQuery=lpszSQL;
         if(rst!=NULL){
            rst->CursorLocation=ADODB::adUseClient;
            rst->Open(bstrQuery,_variant_t(pConnection.GetInterfacePtr(),true),CursorType,LockType,lOptions);  
         }
         TRACE("Open Recordset:%s/n",lpszSQL);
         return ESRecordsetIsOpen(rst);
      }
      BOOL ESRecordsetIsOpen(const ADODB::_RecordsetPtr& rst)
      {
         if(rst!=NULL){
            return rst->State&ADODB::adStateOpen;
         }
         return FALSE;
      }
      void ESRecordsetClose(ADODB::_RecordsetPtr& rst)
      {
         if(rst!=NULL){
            if(rst->State&ADODB::adStateOpen)
               rst->Close();
         }
      }
      CString g_GetValueString(const _variant_t& val)
      {
         CString strVal;
         _variant_t varDest(val);
         if(!g_varIsValid(val))
         {
            return strVal;
         }
         if(val.vt==VT_BOOL)
         {
            if(val.boolVal==VARIANT_FALSE)
            {
               return _T("否");
            }
            else
               return _T("是");
         }
         else{

         }
         if(varDest.vt!=VT_BSTR){
            HRESULT hr=::VariantChangeType(&varDest,&varDest,VARIANT_NOUSEROVERRIDE|VARIANT_LOCALBOOL,VT_BSTR);
            if(FAILED(hr)){
               return strVal;
            }         
         }
         strVal=(LPCTSTR)_bstr_t(varDest); 
         return strVal;
      }

#. 错误处理代码

   .. code-block:: C++

      void ESErrPrintComError(_com_error &e)
      {
         _bstr_t bstrSource(e.Source());
         _bstr_t bstrDescription(e.Description());
         CString strTemp;
         strTemp.Format(_T("´错误/n/t错误代码: %08lx/n/t含义: %s/n/t来自 : %s/n/t描述 : %s/n"),
            e.Error(),e.ErrorMessage(),(LPCSTR) bstrSource,(LPCSTR) bstrDescription);
            // Print COM errors.
         ::AfxMessageBox(strTemp);
         #ifdef _DEBUG
            AfxDebugBreak();
         #endif
      }
      void ESErrPrintProviderError(ADODB::_ConnectionPtr pConnection)
      {
         if(pConnection==NULL) return;
         try{
            // Print Provider Errors from Connection object.
            // pErr is a record object in the Connection's Error collection.
            ADODB::ErrorPtr    pErr  = NULL;
            ADODB::ErrorsPtr pErrors=pConnection->Errors;
            if(pErrors)
            {
               if( (pErrors->Count) > 0)
               {
                  long nCount = pErrors->Count;
                  // Collection ranges from 0 to nCount -1.
                  for(long i = 0;i < nCount;i++)
                  {
                     pErr = pErrors->GetItem(i);
                     CString strTemp;
                     strTemp.Format(_T("/t 错误代码: %x/t%s"), pErr->Number, pErr->Description);
                  }
               }
            }
          }
         catch(_com_error &e){
            ESErrPrintComError(e);
         }
      }

-----------
总结
-----------

在文档/视图/框架架构中集成数据库访问总体来说还是难度不大的。微软提供了很多示例的代码，大部分工作只是把示例代码从其他语言改写到VC。主要的工作是对MFC的文档/视图/框架架构的理解，在适当的时候调用这些代码。

尽管我在打开数据库的同时也打开了一个记录集，但是我并未给出显示记录集内容的代码，这超出了本文的范围。我可以给出的提示是使用现成的数据列表控件来显示，微软知识库文章Q229029 SAMPLE: AdoDataGrid.exe Demonstrates How to Use ADO with DataGrid Control Using Visual C++(https://web.archive.org/web/19991009055314/https://support.microsoft.com/support/kb/articles/q229/0/29.asp)可以作为参考。

