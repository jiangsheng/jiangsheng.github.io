Lab5 Draft1
===========
.. post:: 20, Jun, 2005
   :category: Uncategorized
   :author: me
   :nocomments:

.. container:: bvMsg
   :name: msgcns!1BE894DEAF296E0A!188

   ;=====================================================================

   ; lab5.asm - build a program that displays the Fibonacci numbers for
   a user defined input upper bound

   ; Author: Sheng_Jiang

   ; Course: COSC 2425

   ; Date: 6/15/05

   ;=====================================================================

   .386

   .MODEL flat, stdcall

   option casemap:none

   include windows.inc ; always first

   include macros.asm ; MASM support macros

   ; -----------------------------------------------------------------

   ; include files that have MASM format prototypes for function calls

   ; -----------------------------------------------------------------

   include masm32.inc

   include gdi32.inc

   include user32.inc

   include kernel32.inc

   ; ------------------------------------------------

   ; Library files that have definitions for function

   ; exports and tested reliable prebuilt code.

   ; ------------------------------------------------

   includelib masm32.lib

   includelib gdi32.lib

   includelib user32.lib

   includelib kernel32.lib

   ;costants

   CR EQU 0Dh

   LF EQU 0Ah

   DOCOMMAND_CONTINUE equ 1

   DOCOMMAND_END equ 0

   .Data

   menuSelection DWORD 0

   DoCommandResult DWORD 0

   .Code

   ShowMenu Proc

   print chr$("Menu",CR,LF,"[I,N,F,X]")

   ret

   ShowMenu EndP

   ;

   ;usage:

   ;push someThingToAllocateTheReturnValue

   ;push command

   ;call DoCommand

   ;pop command

   ;pop someThingToAllocateTheReturnValue

   ;the return value can be one of the following:

   ; DOCOMMAND_CONTINUE equ 1

   ; DOCOMMAND_END equ 0

   DoCommand PROC

   push ebp

   mov ebp, esp

   push eax

   push ebx

   mov bl, BYTE PTR [ebp+8]

   cmp bl, 'x'

   je DoCommandEnd

   cmp bl, 'X'

   je DoCommandEnd

   mov eax, DOCOMMAND_CONTINUE

   jmp DoCommandCleanup

   DoCommandEnd:

   mov eax, DOCOMMAND_END

   DoCommandCleanup:

   mov [ebp+12],eax

   pop ebx

   pop eax

   mov esp,ebp

   pop ebp

   ret

   DoCommand ENDP

    

   main PROC

   int 3

   cls

   ShowMenuLoop:

   call ShowMenu

   mov menuSelection, input()

   push DoCommandResult

   mov eax,menuSelection

   push [eax]

   call DoCommand

   pop menuSelection

   pop DoCommandResult

   cmp DoCommandResult,DOCOMMAND_CONTINUE

   je ShowMenuLoop

   exit

   main ENDP

   END main

   #=====================================================================

   # lab5 - build a program that displays the Fibonacci numbers for a
   user defined input upper bound

   # Author: Sheng_Jiang

   # Course: COSC 2425

   # Date: 6/15/05

   #=====================================================================

   PROJECT = Lab5

   NAME = Sheng_Jiang

   Date = 6/15/05

   ROOTDRIVE = C

   VERSION = V1

   SRCS =

   $(PROJECT).asm

   makefile

   MASM32 = $(ROOTDRIVE):/masm32

   ML = $(MASM32)/bin/ml

   LINK = $(MASM32)/bin/link

   Zip = H:/mydoc/Tools/Bin/zip

   DEBUG = c:/masm32/debug/windbg

    

   MLFLAGS = /I. /I $(MASM32)include /I $(MASM32)macros /Zi /Zd /Zf /c
   /Fl /coff /Cp

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

    
