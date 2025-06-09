.. meta::
   :description: 方法基本同Knowledge Base文章Q220844 HOWTO: Insert a Bitmap Into an RTF Document Using the RichEdit Control (https://jeffpar.github.io/kbarchive/kb/220/Q220844/)

自定义在RichEdit中插入对象的图标
==================================

.. post:: 4, Mar, 2004
   :tags: RichEdit
   :category: Win32
   :author: me
   :nocomments:

方法基本同Knowledge Base文章Q220844 HOWTO: Insert a Bitmap Into an RTF Document Using the RichEdit Control (https://jeffpar.github.io/kbarchive/kb/220/Q220844/)

 只是在最后插入之前调用一下IOleCache::SetData,用一个HGLOBAL作为参数，HGLOBAL里面的数据是一个METAFILEPICT结构，包含自己提供的图片

 .. code-block:: C++ 

    ASSERT_VALID(this);
    ASSERT(m_lpObject != NULL);

    // get IOleCache interface
    LPOLECACHE lpOleCache = QUERYINTERFACE(m_lpObject, IOleCache);
    if (lpOleCache == NULL)
    {
        TRACE0("Warning: object does not support IOleCache interface.\n";
        return FALSE;
    }
    ASSERT(lpOleCache != NULL);

    // new cache is for CF_METAFILEPICT, DVASPECT_ICON
    FORMATETC formatEtc;
    formatEtc.cfFormat = CF_METAFILEPICT;
    formatEtc.ptd = NULL;
    formatEtc.dwAspect = DVASPECT_ICON;
    formatEtc.lindex = -1;
    formatEtc.tymed = TYMED_MFPICT;

    // setup the cache so iconic aspect is now included
    DWORD dwConnection;
    SCODE sc = lpOleCache->Cache(&formatEtc;,
    ADVF_NODATA|ADVF_PRIMEFIRST|ADVF_ONLYONCE, &dwConnection;);
    if (FAILED(sc))
    {
        lpOleCache->Release();
        return FALSE;
    }

    // set data if iconic image provided
    if (hMetaPict != NULL)
    {
        STGMEDIUM stgMedium;
        stgMedium.tymed = TYMED_MFPICT;
        stgMedium.hGlobal = hMetaPict;
        stgMedium.pUnkForRelease = NULL;

        sc = lpOleCache->SetData(&formatEtc;, &stgMedium;, FALSE);
        if (FAILED(sc))
        {
            lpOleCache->Release();
            return FALSE;
        }
    }
    lpOleCache->Release();

    return TRUE;

