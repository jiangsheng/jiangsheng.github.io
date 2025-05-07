Can we run 32 bit and 64 bit code in the same process?
======================================================
.. post:: 18, Jun, 2018
   :category: Computers and Internet
   :author: jiangshengvc
   :nocomments:

User redstone001 `wants to
know <https://www.zhihu.com/question/267742897>`__ if it is possible to
run 32 bit and 64 bit code in the same process – maybe in a different
thread?

As `Betteridge's law of
headlines <https://en.wikipedia.org/wiki/Betteridge%27s_law_of_headlines>`__
say, any news ending with a question mark can be answered with the word
no. But this isn’t news, so … the answer is … yeah? Kind of.

The way that Windows `implements a 32 bit
emulator <https://msdn.microsoft.com/en-us/library/windows/desktop/aa384274(v=vs.85).aspx>`__
(e.g. making  Program Files (x86) appear as Program Files to 32 bit
processes) is to load 64 bit **system** dlls in 32 bit code… but
specially crafted 64 bit dlls indeed. To be callable from a 32 bit
process, everything they generate have to be 32 bit compatible. E.g. do
not provide access outside of the x86 memory address space, and zero out
higher 32 bit of handles etc. The way it is written is practically
creating 64 bit dlls that enjoy none of the 64 bit benefits, but become
much slower and heavier thanks to `marshal 32 bit calls to 64 bit before
calling other system
dlls <https://helgeklein.com/blog/2008/03/windows-x64-all-the-same-yet-very-different-part-5/>`__.
Because there is no up side except compatibility, Windows only allows
its own 64 bit DLLs to be callable inside a 32 bit process. If you want
to reuse your code written for a different CPU architecture, it would be
much faster to run a separate process and do `interprocess
communication <https://msdn.microsoft.com/en-us/library/windows/desktop/aa365574(v=vs.85).aspx>`__.
