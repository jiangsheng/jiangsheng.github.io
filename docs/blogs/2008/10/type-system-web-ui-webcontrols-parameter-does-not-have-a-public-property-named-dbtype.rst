.. meta::
   :description: In Visual C# 2005 SP1, I added an object data source to a web page that uses my business class as the select method. The method has one parameter of type Guid.

Type ‘System.Web.UI.WebControls.Parameter’ does not have a public property named ‘DbType’
=========================================================================================
.. post:: 6, Oct, 2008
   :tags: ASP.Net
   :category: .Net Framework
   :author: me
   :nocomments:

In Visual C# 2005 SP1, I added an object data source to a web page
that uses my business class as the select method. The method has one
parameter of type
`Guid <http://en.wikipedia.org/wiki/Globally_unique_identifier>`__.
The data source wizard generates code like this

   <asp:Parameter DbType="Guid" Name="rowId" /> 

Although the web server has `.Net
2.0 <http://msdn.microsoft.com/netframework/>`__ SP1 installed (I
checked the registry), it still throws an error 

   Type 'System.Web.UI.WebControls.Parameter' does not have a public property named 'DbType' 

The walk around is easy:

   <asp:Parameter Type="Object" Name="rowId" />

