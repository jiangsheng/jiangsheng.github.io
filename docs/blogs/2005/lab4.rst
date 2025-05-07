Lab4
====
.. post:: 13, Jun, 2005
   :category: ACC
   :author: jiangshengvc
   :nocomments:

.. container:: bvMsg
   :name: msgcns!1BE894DEAF296E0A!187

   ;=====================================================================

   ; lab4.asm - Example function call to get the 20th Fibonacci number

   ;; Author: Sheng_Jiang

   ; Course: COSC 2425

   ; Date:
   6/13/05;=====================================================================

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

   cr equ 0dh

   lf equ 0ah

   .Data

   .STACK 4096h ;RECURSION need large stacks

   .CODE

   ;Function Fibonacci returns n'th Fibonacci number

   ;It uses RECURSION

   ;\__stdcall unsigned int f(int x)

   ;{

   ; return (x<2) ? 1 : f(x-1) + f(x-2);

   ;}

   ;usage:

   ;push SomethingToAllocateTheReturnValue

   ;push Parameter;

   ;call Fibonacci

   ;stack changes during function call:12

   Fibonacci PROC

   push ebp

   mov ebp , esp

   push ecx ; this register is used to calculate the parameters of the
   function calls

   push esi ; sum goes here

   FibonacciFunctionBegin:

   mov ecx,[ebp+8] ;ecx=param1 = esp/\*old*/+4/\*new esp*/+4/\*pushed
   ebp*/

   cmp ecx,2 ;ecx<2 ?

   jge FibonacciRecursion ;return f(x-1) + f(x-2);

   mov esi,1 ;otherwise return 1

   jmp FibonacciCleanup ;exit function

   FibonacciRecursion:

   dec ecx ;calculate f(x-1)

   push ecx ;allocate the returnValue

   push ecx ;ecx=x-1

   call Fibonacci

   pop esi

   dec ecx ;calculate f(x-2)

   push ecx ;allocate the returnValue

   push ecx ;ecx=x-2

   call Fibonacci

   pop ecx

   add esi,ecx

   FibonacciCleanup:

   mov dword ptr [ebp+12],esi; //set return values

   pop esi

   pop ecx

   mov esp,ebp

   pop ebp

   ret 4

   Fibonacci ENDP

   ;int main(int argc, char\* argv[])

   ;{

   ; printf("the 20th Fibonacci number is:rn";

   ; return 0;

   ;}

   main PROC

   int 3

   push ecx ;allocate the return value

   push 13 ;

   call Fibonacci

   print chr$("the 20th Fibonacci number is:",cr,lf)

   pop ecx

   print str$(ecx);

   print chr$(cr,lf)

   exit

   main ENDP

   END main

    

   # makefile for Lab4

   PROJECT = Lab4

   NAME = Sheng_Jiang

   Date = 6/13/05

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

    
