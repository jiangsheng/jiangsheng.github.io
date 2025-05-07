Getting local FTP home directory from IIS programmatically
==========================================================
.. post:: 22, Nov, 2009
   :tags: Active Directory,File Transfer Protocol,Internet Information Services,Metadata,Microsoft Windows
   :category: enmsdn,Visual C++
   :author: jiangshengvc
   :nocomments:

User xiaoc1026 `wants to
know <http://topic.csdn.net/u/20091118/09/2f26b4bb-e534-4252-a00d-d4222258baf8.html>`__
how to access `IIS <http://www.microsoft.com/iis>`__ to get the `home
directory <http://en.wikipedia.org/wiki/Home_directory>`__ of the
`FTP <http://en.wikipedia.org/wiki/File_Transfer_Protocol>`__ web site
in `Visual
C <http://msdn2.microsoft.com/en-us/visualc/default.aspx>`__\ ++. Before
IIS6 you need to access the
`metadata <http://en.wikipedia.org/wiki/Metadata>`__ in IIS
configuration via
`IMSAdminBase::GetData <http://msdn.microsoft.com/en-us/library/ms525079(VS.90).aspx>`__.
The hard part to find the path of the IIS setting. Before IIS 6, the
metadata isn’t saved in `XML <http://en.wikipedia.org/wiki/XML>`__.
However you can `search the path of a property though the admin
script <http://blogs.msdn.com/b/david.wang/archive/2005/07/08/howto-search-and-replace-any-iis-metabase-property-value-automatically.aspx>`__.
You can find the `path
property <http://msdn.microsoft.com/en-us/library/ms524600(v=VS.90).aspx>`__
from the IIS metadata propertiy reference documentation. The IIS WMI
provider, introduced in IIS6, makes the query a lot easier. Now you can
query for
`IIsFtpVirtualDirSetting.Path <http://msdn.microsoft.com/en-us/library/ms524913(VS.90).aspx>`__
directly, though querying metadata should still work.
