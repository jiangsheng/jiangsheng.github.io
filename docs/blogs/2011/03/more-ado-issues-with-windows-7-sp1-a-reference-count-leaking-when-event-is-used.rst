.. meta::
   :description: Update: Microsoft fixed the issue in Windows 8. User Angus Robertson is reporting that in an application that references ADO 2.1 type library and getting record

More ADO issues with KB983246/Windows 7 SP1: a reference count leaking when event is used
=========================================================================================
.. post:: 14, Mar, 2011
   :tags: ActiveX Data Objects
   :category: Microsoft
   :author: me
   :nocomments:

Update: Microsoft `fixed the issue in Windows
8 <http://social.msdn.microsoft.com/Forums/en/windowsgeneraldevelopmentissues/thread/280de88a-77dd-455e-9797-b28928206e38>`__.

User `Angus
Robertson <http://social.msdn.microsoft.com/forums/en-US/user/threads?userid=7bbf7b11-2c59-4de0-a0ee-50f23c738764>`__
is `reporting <http://social.msdn.microsoft.com/Forums/en/sqldataaccess/thread/68e23681-f6b5-4ed5-b963-e63e34eeac2f>`__
that in an application that references
`ADO <http://en.wikipedia.org/wiki/ActiveX_Data_Objects>`__ 2.1 type
library and getting records using the adAsyncExecute method, each
execute call  leaks three handles and about 20K of memory.

A fix is
promised in a future version of windows but since
`MDAC <http://en.wikipedia.org/wiki/Microsoft_Data_Access_Components>`__
is an in-band `OS <http://en.wikipedia.org/wiki/Operating_system>`__
component, an widely-available update would be in a `service
pack <http://en.wikipedia.org/wiki/Service_pack>`__ just like how
`kb983246 was
delivered <http://jiangsheng.wordpress.com/2011/02/24/breaking-change-in-ado-update-kb983246-included-in-windows-7-service-pack-1/>`__.

Concerned ADO users should contact
`Microsoft <http://en.wikipedia.org/wiki/Microsoft>`__ `Customer
Support <http://en.wikipedia.org/wiki/Technical_support>`__ service and
request a hotfix, once that is available. 

By the way, if you are still
in `XP <http://en.wikipedia.org/wiki/Windows_XP>`__ or 2003, there is a
`deadlock issue <http://support.microsoft.com/kb/955843>`__ when using
the same adAsyncExecute option. This issue is fixed on
`Vista <http://en.wikipedia.org/wiki/Windows_Vista>`__.


