.. meta::
   :description: BUG: ClassWizard Omits Methods with BYTE or BYTE* As Parameters (http://support.microsoft.com/kb/q241862/)

VC的自动化向导的BUG
=======================

.. post:: 19, Apr, 2005
   :tags: MFC,Bug
   :category: Visual Studio
   :author: me
   :nocomments:

* BUG: ClassWizard Omits Methods with BYTE or BYTE* As Parameters (http://support.microsoft.com/kb/q241862/)
* BUG: VTS_UI1 and VTS_PUI1 are Defined Incorrectly in AfxDisp.h (http://support.microsoft.com/kb/242588/)
* FIX: Method with BOOL* Parameter Type Overwriting Memory in Visual Basic (http://support.microsoft.com/kb/199315/)
  
VC.Net 2003:

VC6的向导产生的封装类对VARIANT类型的属性的处理是传地址

.. code-block:: C++

    void CAxCtrlAV::SetFoo(const VARIANT& propVal)
    {
        SetProperty(0x1, VT_VARIANT, &propVal);
    }

VC7的向导产生的封装类对VARIANT类型的属性的处理是传值

.. code-block:: C++

    void CAxCtrlAV::SetFoo(VARIANT propVal)
    {
        SetProperty(0x1, VT_VARIANT, propVal);
    }

因为VC7的va_list/va_start的行为改为替换栈层次而不是实际上保存参数的地址，对属性的访问最终会在COleDispatchDriver::InvokeHelperV中导致程序崩溃。

解决该问题的方法是手工将VC7的类向导产生的封装类的定义和实现更改为VC6风格的，或者不使用VARIANT做为属性的类型。
