.. meta::
   :description: Assignment1#

Assignment1
===========
.. post:: 9, Jun, 2005
   :tags: Assembly Language
   :category: PIC16F88A
   :author: me
   :nocomments:

.. code-block::

   ;=====================================================================
   ; Assignment1.asm - Homework Assignment 1
   ;
   ; Author: Sheng_Jiang
   ; Course: COSC 2425
   ; Date: 06/08/05
   ;=====================================================================

   .386
   .MODEL flat, stdcall

   option casemap:none

   include windows.inc

   include kernel32.inc

   include masm32.inc

   includelib kernel32.lib

   includelib masm32.lib

   .DATA

   ;Playing with flags

   FlagTest BYTE 0

   SFlagTest SBYTE 0

   ;Summing up a series of unsigned numbers

   DWORDArray DWORD 1,2,3,4,5,6,7,8,9,10

   ;Sum up all the positive and negative values

   SDWORDArray SDWORD 1,-2,3,-4,5,-6,7,-8,9,-10

   .CODE

   main PROC

   int 3

   ;Data for Playing with flags

   mov FlagTest,1;

   add FlagTest,255 ;set Carry flag ,FlagTest=0

   add FlagTest,1 ;clear Carry flag ,FlagTest=1

   sub FlagTest,1 ;set Zero flag ,FlagTest=0

   add FlagTest,1 ;clear Zero flag ,FlagTest=1

   sub SFlagTest,2 ;set Sign flag ,SFlagTest=-2

   add SFlagTest,10 ;clear Sign flag ,SFlagTest=8

   add SFlagTest,127 ;set Overflow flag ,SFlagTest=135

   mov SFlagTest,0;

   sub SFlagTest,100 ;clear Overflow flag,SFlagTest=-100

   ;Summing up a series of unsigned numbers

   mov edi, OFFSET DWORDArray ;Begin

   mov ecx, OFFSET DWORDArray+SIZEOF DWORDArray ;End

   mov eax, 0 ;Initialize Sum

   Sum1 :

   add eax, [edi] ;sum

   add edi, TYPE(DWORDArray) ;step to next

   cmp ecx, edi ;loop test

   jne Sum1 ;loop

   ; eax should be 55(37h) now

   ;Sum up all the positive and negative values

   mov edi, OFFSET SDWORDArray ;Begin

   mov ecx, OFFSET SDWORDArray+SIZEOF SDWORDArray;End

   mov eax, 0 ;Initialize Sum

   mov ebx, 0 ;Initialize Sum

   Sum2 :

   mov edx, [edi] ;compare edi with 0

   cmp edx, 0

   jl Sum2Neg ;jump to Sum2Neg, add to ebx if edi is a negative number

   add eax, [edi] ;otherwise, add to eax

   jmp Sum2Pos ;done, jump to loop point Sum2Pos

   Sum2Neg:

   add ebx, [edi] ;add to ebx if edi is a negative number

   Sum2Pos:

   add edi, TYPE(DWORDArray) ;step to next

   cmp ecx, edi ;loop test

   jne Sum2 ;loop

   ; eax should be 25(19h) now

   ; ebx should be -30(ffffffe2h) now

   invoke ExitProcess, 0

   main ENDP

   END main

   # makefile for Assignment1

   PROJECT = Assignment1

   NAME = Sheng_Jiang

   Date = 5/25/05

   ROOTDRIVE = C

   VERSION = V1

   SRCS =   $(PROJECT).asm

makefile

.. code-block::

   MASM32 = $(ROOTDRIVE):/masm32

   ML = $(MASM32)/bin/ml

   LINK = $(MASM32)/bin/link

   Zip = H:/mydoc/Tools/Bin/zip

   DEBUG = c:/masm32/debug/windbg

    

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

    

