ADO和ADOX
==================

.. post:: 10, Mar, 2004
   :tags: ADO
   :category: Visual C++
   :author: me
   :nocomments:


    error C2011: ''LockTypeEnum'' : ''enum'' type redefinition

http://expert.csdn.net/expert/Topicview2.asp?id=2768589中提到了这个问题，是因为两个库都被导入到了默认命名空间

使用不同命名空间可以解决这个问题

.. code-block:: C++

    #import "d:\Program Files\Common Files\system\ado\Msado15.dll" rename("EOF","adoEOF") rename("DataTypeEnum","adoDataTypeEnum") 
    #import "d:\Program Files\Common Files\System\ADO\Msadox.dll"  rename("EOF", "adoXEOF") rename("DataTypeEnum","adoXDataTypeEnum") 
    #import "d:\PROGRAM FILES\COMMON FILES\System\ado\MSJRO.DLL" 