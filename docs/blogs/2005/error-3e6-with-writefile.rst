Error 3e6 with WriteFile
========================
.. post:: 27, Jun, 2005
   :tags: Assembly language
   :category: ACC
   :author: jiangshengvc
   :nocomments:

.. container:: bvMsg
   :name: msgcns!1BE894DEAF296E0A!192

   It looks like you will get error 3E6 when you call write file with an
   address not aligned to DWORD.
   ;=====================================================================
   ; hello.asm - Example `Assembler
   program <http://en.wikipedia.org/wiki/Assembly_language>`__ ;
   ; Author: Sheng Jiang ; Course: COSC 2425 ; Date: 5/23/05
   ;=====================================================================
   .386 .MODEL flat,
   `stdcall <http://en.wikipedia.org/wiki/X86_calling_conventions>`__
   option casemap:none include windows.inc include kernel32.inc include
   masm32.inc includelib kernel32.lib includelib masm32.lib .DATA align
   1 placeholder `byte <http://en.wikipedia.org/wiki/Byte>`__ ? Message
   BYTE  '`Hello
   World <http://en.wikipedia.org/wiki/Hello_world_program>`__!',0
   messegelen
   `dword <http://en.wikipedia.org/wiki/Word_%28computing%29>`__
   $-Message errorcode dword 0 .CODE Hello   PROC int 3 sub
   esp,messegelen mov ecx,messegelen mov edi,esp sub  esp , 8 ;//2 local
   var invoke GetStdHandle, STD_OUTPUT_HANDLE mov  [ebp-4] , eax ;
   mov  eax  ,ebp sub  eax  ,8 mov  [ebp-8] , eax; copystringtostack:
   dec edi mov byte ptr [edi],'a' loop copystringtostack mov byte ptr
   [edi+12],0 invoke WriteFile, [ebp-4], edi, messegelen, near ptr
   [ebp-8],0 add esp,8 add esp,messegelen invoke GetLastError
   mov  errorcode,eax invoke ExitProcess, 0 Hello   ENDP END Hello
