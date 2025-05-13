

程序员之懒
===========

.. post:: 19, Apr, 2005
   :tags: MFC
   :category: Visual C++, Microsoft Foundation Classes
   :author: me
   :nocomments:

程序员在我看来是比较会偷懒的一个群体。为了在开发软件的时候减少人工操作，他们会使用各种各样的软件和语言特性，例如IDE和预处理宏。李建忠在他的BLOG(http://blog.joycode.com/lijianzhong/archive/2005/05/08/50440.aspx)中提到，为了简化声明属性的工作，他的同事自己写了一些小工具来生成需要的代码。在C++托管扩展中，这个工作稍微简单一些，用预处理宏就可以了。

.. code-block::

    #define DECLARE_PROPERTY_DOUBLE_PUBLIC(propertyName)

        protected: double _##propertyName;
        public: __property double get_##propertyName()
        { 
            return _##propertyName; 
        } 
        __property void set_##propertyName( double new_##propertyName )
        { 
            _##propertyName= new_##propertyName;
        }

    public __gc __sealed class Vector {
        public:
        // ...
        DECLARE_PROPERTY_DOUBLE(x)
        DECLARE_PROPERTY_DOUBLE(y)
        DECLARE_PROPERTY_DOUBLE(z)

    };

当然，如果使用C++/CLI的话，这个工作更加简单：

.. code-block:: 

    public ref class Vector sealed
    {
        public:
        property double x;
        property double y;
        property double z;
    };

我在编程的时候也是个彻底的实用主义者，需要大量重复编写的代码都是尽量用宏实现。例如，我用如下的宏来简化CCmdTarget派生类对IOleCommandTarget类的处理：

.. code-block:: 

    #define DECLARE_IOLECOMMANDTARGET 

        STDMETHOD(QueryStatus)(const GUID* pguidCmdGroup, ULONG cCmds, OLECMD prgCmds [],OLECMDTEXT* pcmdtext); 
        STDMETHOD(Exec)(const GUID*,DWORD nCmdID, DWORD nCmdExecOpt,VARIANTARG* pvarargIn, VARIANTARG* pvarargOut);

    #define IMPLEMENT_IOLECOMMANDTARGET(theClass,localclass)
    
        STDMETHODIMP theClass::X##localclass::Exec(const GUID* pguidCmdGroup,DWORD nCmdID, DWORD nCmdExecOpt,VARIANTARG* pvarargIn, VARIANTARG* pvarargOut)
        {
            METHOD_PROLOGUE_EX(theClass, localclass) 
            ASSERT_VALID(pThis); 
            return pThis->Exec(pguidCmdGroup,nCmdID,nCmdExecOpt,pvarargIn,pvarargOut);
        }
        STDMETHODIMP theClass::X##localclass::QueryStatus(const GUID* pguidCmdGroup, ULONG cCmds, OLECMD prgCmds[],OLECMDTEXT* pcmdtext)
        { 
            METHOD_PROLOGUE_EX(theClass, localclass)
            ASSERT_VALID(pThis);
            return pThis->QueryStatus(pguidCmdGroup,cCmds,prgCmds,pcmdtext);
        }

        #define IMPLEMENT_LOCALCLASS_UNKNOWN(theClass,localclass)
        STDMETHODIMP_(ULONG) theClass::X##localclass::AddRef() 
        { 
            METHOD_PROLOGUE_EX(theClass, localclass)
            ASSERT_VALID(pThis);
            return pThis->ExternalAddRef();
        } 
        STDMETHODIMP_(ULONG) theClass::X##localclass::Release()
        { 
            METHOD_PROLOGUE_EX(theClass, localclass)
            ASSERT_VALID(pThis);
            return pThis->ExternalRelease(); 
        } 
        STDMETHODIMP theClass::X##localclass::QueryInterface( REFIID iid, LPVOID* ppvObj) 
        { 
            METHOD_PROLOGUE_EX(theClass, localclass)
            ASSERT_VALID(pThis);
            return pThis->ExternalQueryInterface(&iid, ppvObj); 
        }

这样要在CCmdTarget派生类中实现IOleCommandTarget接口的话，只需要编写实现函数就行了：

.. code-block:: C++

    //声明
    class CScreenCaptureGDI : public CScreenCaptureBase
    {
        DECLARE_OLECOMMANDTARGET
        //……
        DECLARE_INTERFACE_MAP()
        BEGIN_INTERFACE_PART(OleCommandTarget, IOleCommandTarget)
        DECLARE_OLECOMMANDTARGET
        END_INTERFACE_PART(OleCommandTarget)
        //……
    }

    //实现
    IMPLEMENT_DYNCREATE(CScreenCaptureDirectX, CCmdTarget)
    BEGIN_INTERFACE_MAP(CScreenCaptureDirectX, CScreenCaptureBase)
    //……
    INTERFACE_PART(CScreenCaptureDirectX, IID_IOleCommandTarget , OleCommandTarget)
    END_INTERFACE_MAP()
    IMPLEMENT_LOCALCLASS_UNKNOWN(CScreenCaptureDirectX,OleCommandTarget)
    IMPLEMENT_IOLECOMMANDTARGET(CScreenCaptureDirectX,OleCommandTarget)

和微软知识库文章Q177551(http://support.microsoft.com/kb/177551)比较一下就知道可以少写多少代码了。

MFC对COM接口的宏支持在MFC技术文章TN038(http://msdn.microsoft.com/library/en-us/vclib/html/_MFCNOTES_TN038.asp)中有详细说明。

使用宏在编写程序的时候有时可以减少很多工作量，但是缺点是调试比较麻烦。MFC中包含大量的宏，在编写自己的宏的时候可以作为参考。