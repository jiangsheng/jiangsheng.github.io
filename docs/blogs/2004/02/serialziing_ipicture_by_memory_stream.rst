.. meta::
   :description: 尽管很久没有用Serialize了，但是接手的工程的数据接口就是CArchive，……所以不得不写了一个IPicture数据到CArchive的接口

Serialziing IPicture by Memory Stream
==========================================

.. post:: 6, Feb, 2004
   :tags: Windows API, MFC
   :category: Microsoft Foundation Classes, Win32
   :author: me
   :nocomments:

尽管很久没有用Serialize了，但是接手的工程的数据接口就是CArchive，……所以不得不写了一个IPicture数据到CArchive的接口

一个下午增加了一个功能……

.. code-block::C++

    class CPicture:public CObject
    {
        DECLARE_SERIAL(CPicture);
        virtual void Serialize(CArchive &ar);
        CPictureHolder m_ph;
        static DWORD m_dwTag;
    };

    IMPLEMENT_SERIAL(CPicture,CObject,0);
    DWORD CPicture::m_dwTag=0x70696331;
    void CPicture::Serialize(CArchive &ar)
    {

        CObject::Serialize(ar);
        if (ar.IsStoring())
        {
            // TODO: add storing code here
            ar<
            COleStreamFile osf;
            LONG lSize=0;
            if(osf.CreateMemoryStream()&&m_ph.m_pPict)
            {
                m_ph.m_pPict->SaveAsFile(osf.GetStream(),TRUE,&lSize);
            }
            osf.Flush();
            osf.SeekToBegin();
            CByteArray baBuf;
            baBuf.SetSize(lSize);
            osf.Read(baBuf.GetData(),lSize);
            baBuf.Serialize(ar);
        }
        else
        {
            // TODO: add loading code here
            DWORD dwTest;
            ar>>dwTest;
            if(dwTest!=m_dwTag)
            AfxThrowArchiveException(CArchiveException::badClass,NULL);
            CByteArray baBuf;
            baBuf.Serialize(ar);
            COleStreamFile osf;
            if(osf.CreateMemoryStream())
            {
                osf.Write(baBuf.GetData(),baBuf.GetSize());
                osf.Flush();
                osf.SeekToBegin();
                if(m_ph.m_pPict){
                    m_ph.m_pPict->Release();
                    m_ph.m_pPict=NULL;
                }
                OleLoadPicture(osf.GetStream(),baBuf.GetSize(),FALSE,IID_IPicture,(LPVOID*)&m_ph.m_pPict);
            }
        }
    }
