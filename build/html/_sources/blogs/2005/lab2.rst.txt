Lab2
====
.. post:: 25, May, 2005
   :category: Uncategorized
   :author: me
   :nocomments:



   # makefile for program 1

   PROJECT = Lab2

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

   MLFLAGS = /I. /I $(MASM32)include /Zi /Zd /Zf /c /Fl /coff /Cp

   LINKFLAGS = /subsystem:console /libpath:$(MASM32)lib

   all: $(PROJECT).exe

   $(PROJECT).obj: $(PROJECT).asm

   $(ML) $(MLFLAGS) $(PROJECT).asm

   $(PROJECT).exe: $(PROJECT).obj

   $(LINK) $(LINKFLAGS) $(PROJECT).obj

   clean:

   del $(PROJECT).exe \*.obj \*.lst \*.map

   zip: clean

   del $(NAME)\_$(PROJECT)\_$(VERSION).zip

   $(Zip) $(NAME)\_$(PROJECT)\_$(VERSION).zip $(SRCS)

   ;=====================================================================

   ; hello.asm - Example Assembler program

   ; Propose: a program that displays the following information on the
   console:

   ; Line 1: full name

   ; Line 2: birthday

   ; Line 3: ACC student ID number

   ; Line 4: preferred email address

   ; Course: COSC 2425

   ; Author: Sheng Jiang

   ; Date: 5/23/05

   ;=====================================================================

   .386

   .MODEL flat, stdcall

   ; define a few constants

   cr equ 0dh

   lf equ 0ah

   STD_OUTPUT_HANDLE equ -11

   ; win32 declarations

   ; kernel32.exe

   GetStdHandle proto near32 stdcall,

   nStdHandle:dword

   WriteFile proto near32 stdcall,

   hfile:dword, lpbuff:near32,

   lmsg:dword, lwrt:near32, lpovr:near32

   ExitProcess proto near32 stdcall,

   dwExitCode:dword

   ;masm32 includes

   include masm32.inc

   includelib masm32.lib

   ;win32 includes

   includelib kernel32.lib

   ;variables

   .DATA

   ;Handle of the standard output

   nStdHandle dword ?

   ;string to print

   lpBuffer BYTE 'Sheng
   Jiang',cr,lf,'',cr,lf,'',cr,lf,'sheng_jiang',cr,lf,0

   ;string length

   nNumberOfBytesToWrite dword $-lpBuffer

   ;bytes written

   nNumberOfBytesWritten dword ?

   .CODE

   SayHello PROC

   ; first get a handle to stdout for output from win32

   invoke GetStdHandle, STD_OUTPUT_HANDLE

   ; save it for later

   mov nStdHandle,eax

   ; now print the message - lots of parameters needed for this one!

   invoke WriteFile, nStdHandle, near ptr lpBuffer,
   nNumberOfBytesToWrite, near ptr nNumberOfBytesWritten,0

   ; go back to the operating system when done

   invoke ExitProcess, 0

   SayHello ENDP

   END SayHello
