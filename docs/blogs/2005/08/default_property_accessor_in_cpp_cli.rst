.. meta::
   :description: 目前版本的VC2005测试版中，default关键字不仅用于指定类级别的索引器，而且也用于访问默认属性。但是奇怪的是，默认属性的原名不能访问了，也就是说，如果要把下面的代码段从托管C++移植到VC2005附带的C++/CLI，不仅需要更改指针的类型，而且要把属性的名称更改为default：

C++/CLI中的默认属性访问
==============================
.. post:: 30 Aug, 2005
   :tags: CPP
   :category: Visual Studio
   :author: me
   :nocomments:

目前版本的VC2005测试版中，default关键字不仅用于指定类级别的索引器，而且也用于访问默认属性。但是奇怪的是，默认属性的原名不能访问了，也就是说，如果要把下面的代码段从托管C++移植到VC2005附带的C++/CLI，不仅需要更改指针的类型，而且要把属性的名称更改为default：

.. code-block:: C++

    //[System::Reflection::DefaultMemberAttribute("Fields")] interface _Recordset
    //托管C++语法
    //extern _Recordset* results;
    Fields* ResultFields=results->Fields;

    //C++/CLI语法
    //extern _Recordset^ results;
    Fields^ ResultFields=results->default;

如果继续使用原来名字来访问属性的话，会报告编译错误：

.. code-block:: C++
    
    Fields^ ResultFields=results->Fields;//C3293: 'Fields': use 'default' to access the default property (indexer)。


这是一个Breaking Change。在语言规范中，默认索引属性只使用一个名字“default”，而且只有这一个实现。更进一步，默认索引属性只能用如下方式访问：

.. code-block:: C++

    obj[index]
    obj->default[index]
    obj->default::get(index)
    obj->default::set(index, value)

顺便说一下，在C++/CLI中也可以使用类似C#里面的for each语句了( http://msdn2.microsoft.com/library/ms177202(en-us,vs.80).aspx)，而且对于非托管的STL容器也有效，不过看起来真不习惯。


参考

* New C++ Language Features (http://msdn2.microsoft.com/library/xey702bw(en-us,vs.80).aspx)
* Breaking Changes in the Visual C++ 2005 Compiler(https://learn.microsoft.com/en-us/cpp/porting/visual-cpp-change-history-2003-2015)
