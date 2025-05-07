Use windbg as an external tools of Visual C++
=============================================
.. post:: 27, Jun, 2005
   :tags: Visual C++
   :category: Computers and Internet
   :author: jiangshengvc
   :nocomments:

.. container:: bvMsg
   :name: msgcns!1BE894DEAF296E0A!193

   .. container::

      Title :

   .. container::

      WinDbg

   .. container::

      (or any title you want)

   .. container::

      Command :

   .. container::

      C:\\masm32\\debug\\windbg.exe

   .. container::

      (it is not a typical position, but it is where it is on my pc.)

   .. container::

      Arguments:

   .. container::

      -ee c++ -G -i "$(TargetDir)"  -y "$(TargetDir)" -QY -logo -QSY
      -sdce -WF "$(ProjectFileName).WEW" "$(TargetPath)"

   .. container::

      (The commandline may be too long to execute, remove some switches
      if that happens. For more information about this junk, see
      Debugger Reference in the documentation of Debug Tools for
      Windows, and Macros for Build Commands and Properties, `Visual
      C <http://msdn2.microsoft.com/en-us/visualc/default.aspx>`__\ ++
      Concepts: Building a C/C++ Program, in
      `MSDN <http://en.wikipedia.org/wiki/Microsoft_Developer_Network>`__).

   .. container::

      Initial Directory:

   .. container::

      $(ProjectDir)
