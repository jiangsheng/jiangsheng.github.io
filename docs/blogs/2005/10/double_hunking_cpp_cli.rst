.. meta::
   :description: 在VC.Net中使用默认设置/clr编译时，一个托管函数会产生两个入口点，一个是托管的，供托管代码调用，另外一个是非托管的，供非托管代码调用。但是函数地址，特别是虚函数指针只能有一个值，所以需要有一个默认的入口。

托管C++中函数调用的双重转换(Double Thunking)
==================================================
.. post:: 7 Oct, 2005
   :tags: C++/CLI, Performance
   :category: Visual C++
   :author: me
   :nocomments:

在VC.Net中使用默认设置/clr编译时，一个托管函数会产生两个入口点，一个是托管的，供托管代码调用，另外一个是非托管的，供非托管代码调用。但是函数地址，特别是虚函数指针只能有一个值，所以需要有一个默认的入口。

非托管入口点可能是所有调用的默认入口（在 Visual Studio .NET2003 中，编译器总是会选择非托管入口，但是在Visual Studio 2005中，如果参数或者返回值中包含托管类型，那么编译器会选择托管入口），而另外一个只是使用托管C++中的互操作功能对默认入口的调用。在一个托管函数被另一个托管函数调用的时候，这可能会造成不必要的托管/非托管上下文切换和参数/返回值的复制。如果函数不会被非托管代码使用指针调用，那么可以在声明函数时用VC2005新增的__clrcall修饰符阻止编译器生成两个入口。
现在用简单的冒泡排序算法来比较一下使用__clrcall之后的性能改善程度。

.. code-block:: C++

    using namespace System;
    #define ARRAY_SIZE 1000

    struct bubbleBase
    {
        int value;
    };
    class bubble1:public bubbleBase
    {
        public:
        virtual int getvalue(){return value;}
        virtual void setvalue(int newvalue){value=newvalue;}
    };
    class bubble2:public bubbleBase
    {
        public:
        virtual int __clrcall getvalue(){return value;}
        virtual void __clrcall setvalue(int newvalue){value=newvalue;}
    };
    template<class T>
    void bubbleSort(int length)
    {
        TimeSpan ts;
        T* array1=new T[ARRAY_SIZE];
        for (int i=0;i<ARRAY_SIZE ;i++)
        {
            array1[i].setvalue(ARRAY_SIZE-i-1);
        }
        Int64 ticks=DateTime::Now.Ticks;
        int i, j,temp, test;
        for(i = length - 1; i > 0; i--)
        {
            test=0;
            for(j = 0; j < i; j++)
            {
                if(array1[j].getvalue() > array1[j+1].getvalue())
                {
                    temp = array1[j].getvalue();
                    array1[j].setvalue(array1[j+1].getvalue());
                    array1[j+1] .setvalue(temp);
                    test=1;
                }
            }
            if(test==0) break;
        }
        ts=TimeSpan::FromTicks(DateTime::Now.Ticks-ticks);
        Console::WriteLine("BubbleSort {0} Items: {1} Ticks",
            ARRAY_SIZE,
            ts.Ticks );
        delete array1;
    }
    int main(array<System::String ^> ^args)
    {
        bubbleSort<bubble1>(ARRAY_SIZE);
        bubbleSort<bubble2>(ARRAY_SIZE);
        return 0;
    }


运行结果是

    BubbleSort 1000 Items: 3281250 Ticks
    BubbleSort 1000 Items: 312500 Ticks

可以看到，__clrcall会大大加快在托管代码中调用托管函数的速度。

顺便说一下，在随VC8.0发布的STL中增加了很多安全特性，但是这也会造成程序的运行速度减慢。如果你确认程序不会有缓冲区溢出或者内存越界访问的问题，那么可以把_SECURE_SCL定义成0来关掉这个特性。
参考



* __clrcall https://learn.microsoft.com/en-us/cpp/cpp/clrcall
* Checked Iterators https://learn.microsoft.com/en-us/cpp/standard-library/checked-iterators
