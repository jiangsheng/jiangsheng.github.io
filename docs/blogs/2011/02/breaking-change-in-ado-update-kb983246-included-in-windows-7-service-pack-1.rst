.. meta::
   :description: Update2: Microsoft fixed the issue in Windows 8 in a way that old programs would work without change. Those who recompiled with the KB983246 version either need

Breaking change in ADO update KB983246 (included in Windows 7 Service Pack 1)
=================================================================================

.. post:: 24 Feb, 2011
   :tags: Windows Update, Service Pack, Windows 7 SP1, WIndows Server 2008 R2
   :category: Windows 7, Windows Update, ActiveX Data Objects
   :author: me
   :nocomments:

.. index:: pair: ADO; Breaking change

.. index:: Windows Update KB983246   

Update2: Microsoft `fixed the issue in Windows 8 <https://web.archive.org/web/20120218193112/http://social.msdn.microsoft.com/Forums/en/windowsgeneraldevelopmentissues/thread/280de88a-77dd-455e-9797-b28928206e38>`_ in a way that old programs would work without change. Those who recompiled with the KB983246 version either need to roll out KB983246 to customer computers or switch back to the old type libraries. New programs are encouraged to use the KB983246 version of type library when they no longer need to support computers without KB983246.

Update: please refer to the knowledge base article kb2517589 `An ADO application that is re-compiled on a Windows 7 Service Pack 1-based computer does not run on down-level operating systems <https://support.microsoft.com/en-us/topic/an-ado-application-does-not-run-on-down-level-operating-systems-after-you-recompile-it-on-a-computer-that-is-running-windows-7-sp-1-or-windows-server-2008-r2-sp-1-or-that-has-kb983246-installed-1c59dbe9-62c3-a063-2c48-49487685df6c>`_ for walkarounds

After installing Windows 7 SP1, which shipps with msado15.dll version:6.1.7601.17514, your ADO program may no longer work on a computer without KB983246 (msado15.dll 6.1.7600.20701).

This is caused by a problem in the old ADO type library regarding the ADO_LONG data type. Some methods’ parameters use a ADO_LONG data type whose meaning got changed to the 64bit LONGLONG on 64 bit machines. This does not adhere to the COM interface protocol as the interface used by old applications is still thinking the parameter type is LONG . I guess that’s why KB983246 suggests Office 2010 64 bit, since Office is one of the most common ADO programs on a 64 bit computer, and 64 bit Office would be more likely to be automated from 32bit COM client than other 64 bit programs.

In order to fix the compatibility issue with 64bit COM servers (including for those 32bit clients, since out-of-proc COM works across bitness), Microsoft introduced a breaking change in the ADO COM interface, changing the parameter type to ADO_LONGPTR. The complete list of changed APIs are listed at http://support.microsoft.com/kb/983246#mi. The result of the interface change causes renaming of the old interface with a postfix _deprecated and new interface IDs for the ADO interfaces. The breaking change means a “type mismatch” or 80004003 error in early binding ADO programs, when the ADO hotfix KB983246 is not installed in the user’s computer. If an IDE does early binding at compile time (e.g. VB6 programs who reference ADODB Data Controls using progids such as “Dim conn As ADODB.Connection: Set conn = New ADODB.Connection”), the compilation would fail with errors like “Class does not support Automation or does not support expected interface”.

The walkarounds suggested by Microsoft are to either upgrade customer computers with the KB983246 hotfix or switch to late binding. In addition there are programmers who remove Windows 7 SP1 or bind to an old version of the msado28.tlb file that get copied to the development machine somehow, getting around Windows’s system file protection by taking ownership of the files and grant access to administrators.

I wonder how many other LONG-based data types exist in Microsoft’s COM APIs and how Microsoft is going to fix all of them for 64bit products. Looks like there are in deed some 64bit COM issues, like `The call operation fails with error code “0x800706f7” when you run an application that calls the OleCreateFromFile() function to create an embedded object from the contents of a named file in a 64-bit <https://support.microsoft.com/en-us/topic/the-call-operation-fails-with-error-code-0x800706f7-when-you-run-an-application-that-calls-the-olecreatefromfile-function-to-create-an-embedded-object-from-the-contents-of-a-named-file-in-a-64-bit-version-of-windows-vista-or-windows-7-35debcd1-8e5b-d6d4-4d1e-d49496b081e7>`_

DevExpress support folks `had no clue <https://supportcenter.devexpress.com/ticket/details/b195852/runtime-under-windows-7-64-bit-sp1-rc2-error-when-xpressquantumgrid-is-bound-to-ado>`_ when this issue was reported to them.

Known affected software:

* Microsoft Visual Basic 6
* `Microsoft Access Pivot Table View <https://web.archive.org/web/20140819143054/http://social.technet.microsoft.com/Forums/windowsserver/en-US/602cc61f-994b-4fa3-bfbf-e92a5f4fc21e/pivot-table-view-of-a-query-in-access-fails-after-windows-7-sp1-rc1-is-installed?forum=w7itproSP>`_
* DevExpress XpressQuantumGrid
