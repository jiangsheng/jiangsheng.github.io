Lab3
====
.. post:: 1, Jun, 2005
   :category: ACC
   :author: jiangshengvc
   :nocomments:

.. container:: bvMsg
   :name: msgcns!1BE894DEAF296E0A!185

   .386

   .MODEL flat, stdcall

   option casemap:none

   include windows.inc

   include kernel32.inc

   include masm32.inc

   includelib kernel32.lib

   includelib masm32.lib

   .DATA

   val1 DWORD 10000h

   val2 DWORD 40000h

   val3 DWORD 20000h

   finalVal DWORD ?

   .CODE

   main PROC

   int 3

   mov eax,val1

   add eax,val2

   sub eax,val3

   mov finalVal,eax

   invoke ExitProcess, 0

   main ENDP

   END main

    

   # makefile for Lab3

   PROJECT = Lab3

   NAME = Sheng_Jiang

   Date = 5/25/05

   ROOTDRIVE = C

   VERSION = V1

   SRCS =

   $(PROJECT).asm

   makefile

   MASM32 = $(ROOTDRIVE):/masm32

   ML = $(MASM32)/bin/ml

   LINK = $(MASM32)/bin/link

   Zip = H:/mydoc/Tools/Bin/zip

   DEBUG = H:Progra~1Debugg~1windbg

    

   MLFLAGS = /I. /I $(MASM32)include /Zi /Zd /Zf /c /Fl /coff /Cp

   LINKFLAGS = /subsystem:console /libpath:$(MASM32)lib /debug

   DEBUGFLAGS = -QY -g -G -WF $(PROJECT).WEW

   all: $(PROJECT).exe

   $(PROJECT).obj: $(PROJECT).asm

   $(ML) $(MLFLAGS) $(PROJECT).asm

   $(PROJECT).exe: $(PROJECT).obj

   $(LINK) $(LINKFLAGS) $(PROJECT).obj

   clean:

   del $(PROJECT).exe \*.obj \*.lst \*.map \*.pdb \*.ilk

   zip: clean

   del $(NAME)\_$(PROJECT)\_$(VERSION).zip

   $(Zip) $(NAME)\_$(PROJECT)\_$(VERSION).zip $(SRCS)

   debug: $(PROJECT).exe

   $(DEBUG) $(DEBUGFLAGS) $(PROJECT).exe

    
