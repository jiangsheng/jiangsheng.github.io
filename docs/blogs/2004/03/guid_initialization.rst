.. meta::
   :description: 因为GUID也是结构，所以不能用简单类型的初始化 而要用 真是麻烦……

GUID数组的初始化
==================

.. post:: 10, Mar, 2004
   :tags: CPP, GUID
   :category: Win32, Visual C++
   :author: me
   :nocomments:

因为GUID也是结构，所以不能用简单类型的初始化

.. code-block:: C++

    GUID CModuleDef::moduleGUID[MaxUsedModules]=
    {
        GUID_NULL
    };
    // ……

而要用

.. code-block:: C++

    GUID CModuleDef::moduleGUID[MaxUsedModules]=
    {
        {0x00000000, 0x0000, 0x0000, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00},
        //.....
    }

真是麻烦……
