.. meta::
   :description: C#程序员可以用三个斜杠来开始XML格式的注释，而且编译器可以据此生成可用于自动生成帮助文档的XML文件。Visual C++ 2005中的编译器也支持了这个功能，而且对非托管函数也生效，前提是必须打开/clr和/DOC开关，并且不能使用/clr:oldSyntax开关编译。

.. post:: 5 Nov, 2005
   :tags: CPP
   :category: Visual Studio
   :author: me
   :nocomments:   

Visual C++ 2005 中的XML注释
=============================
C#程序员可以用三个斜杠来开始XML格式的注释，而且编译器可以据此生成可用于自动生成帮助文档的XML文件。Visual C++ 2005中的编译器也支持了这个功能，而且对非托管函数也生效，前提是必须打开/clr和/DOC开关，并且不能使用/clr:oldSyntax开关编译。

.. code-block:: C++
    
    ///
    ///Use two bubble sort steps 
    ///to show the performance information
    ///of different function calls.
    ///


    int main(array<System::String ^> ^args)
    {
        bubbleSort<bubble1>(ARRAY_SIZE);
        bubbleSort<bubble2>(ARRAY_SIZE);
        return 0;
    }

    #pragma unmanaged
    ///
    ///testing unmanaged function...
    ///

    int foo()
    {
        return 0;
    }

有空的话，多去微软的反馈中心提提对产品的建议是很有好处的……


参考

* /doc (Process Documentation Comments) (C/C++)( http://msdn2.microsoft.com/en-us/library/ms173501.aspx )
* XML Comments for Managed C++ Applications (http://www.codeproject.com/dotnet/MCXDoc.asp)
* NDoc Code Documentation Generator for .NET(http://ndoc.sourceforge.net)
