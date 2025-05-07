Lab5 Draft2
===========
.. post:: 21, Jun, 2005
   :category: ACC
   :author: jiangshengvc
   :nocomments:

.. container:: bvMsg
   :name: msgcns!1BE894DEAF296E0A!189

   ;=====================================================================

   ; lab5.asm - build a program that displays the Fibonacci numbers for
   a user defined input upper bound

   ; Author: Sheng_Jiang

   ; Course: COSC 2425

   ; Date: 6/21/05

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

   TABLEWIDTH EQU 10

   HBAR EQU 196

   VBAR EQU 179

   ULCORNER EQU 218

   URCORNER EQU 191

   MLBORDER EQU 195

   MRBORDER EQU 180

   LLCORNER EQU 192

   LRCORNER EQU 217

   .Data

   menuSelection BYTE 0

   menustring BYTE "Menu|I - Display program instructions|N - The user
   is to enter an integer number from 0 to 20|Display the first N
   Fibonacci numbers on the console|Quit the program"

   menustringLen DWORD $-menustring

   menuDelimiter DWORD "\|"

   IsExitSelected BYTE 0

   number BYTE 0

   .CODE

   ;print a string

   ;usage: push stringBuffer

   ; push stringlen

   ;

   ;call OutputStringN

   ; pop stringlen

   ; pop stringBuffer

   OutputStringN PROC

   push ebp

   mov ebp , esp

   sub esp , 8 ;//2 local var

   push eax

   push ecx

   push edx

   ;eax=GetStdHandle(STD_OUTPUT_HANDLE)

   invoke GetStdHandle, STD_OUTPUT_HANDLE

   mov [ebp-4] , eax ;

   ;[ebp-8]=ebp-8;

   mov eax ,ebp

   sub eax ,8

   mov [ebp-8] , eax;

   ;WriteFile outputHandle, stringBuffer,stringlen,&bytesWritten,0

   invoke WriteFile, [ebp-4], near ptr [ebp+12], [ebp+8], near ptr
   [ebp-8],0

   ;cleanup

   pop edx

   pop ecx

   pop eax

   add esp , 8

   mov esp,ebp

   pop ebp

   ret

   OutputStringN ENDP

   ;print a char for count times.

   ;usage: push char

   ; push count

   ; call OutputCharN

   ; pop count

   ; pop char

   OutputCharN PROC

   push ebp

   mov ebp , esp

   push eax

   push ecx

   push edi

   mov ecx,[ebp+8] ;ecx=count

   JCXZ OutputCharNCleanup; do nothing if count=0

   ;allocate count bytes on the stack

   ;from esp-count to esp

   ;and initialize to char

   ;BYTE buffer[count]

   ;edi=buffer;

   ;push ecx;

   ;while(ecx)

   ;{

   ; edi[ecx]=char

   ;}

   ;pop ecx

   mov al,BYTE PTR [ebp+12]

   mov edi,esp

   sub esp,ecx

   push ecx

   OutputCharNLoop:

   dec edi

   mov [edi], al

   loop OutputCharNLoop

   pop ecx

   ;call OutputStringN(buffer,ecx)

   push edi

   push ecx

   call OutputStringN

   pop ecx

   add esp,4

   ;free count bytes on the stack

   add esp,ecx

   OutputCharNCleanup:

   pop edi

   pop ecx

   pop eax

   mov esp,ebp

   pop ebp

   ret

   OutputCharN ENDP

   ;print a char

   ;by calling OutputStringN with a count of 1

   ;usage: push char

   ; call OutputChar

   ; pop char

   OutputChar PROC

   push ebp

   mov ebp , esp

   push eax

   ;DWORD dwchar;

   sub esp,4

   mov eax,[ebp+8] ;eax=char

   mov dword ptr[ebp-8],0 ;dwchar=0

   mov byte ptr[ebp-8],al ;dwchar=char & 0x000000FF

   ;call OutputStringN(&dwchar,1)

   mov eax,ebp

   sub eax,8

   push eax

   push 1

   call OutputStringN

   add esp,12

   pop eax

   mov esp,ebp

   pop ebp

   ret

   OutputChar ENDP

   ;draw a table line with text and delimiters

   ;usage:

   ;push TableWidth

   ;push beginChar

   ;push textbuffer

   ;push textlen

   ;push fillchar

   ;push endChar

   ;call DrawTableLine

   ;pop endChar

   ;pop fillchar

   ;pop textlen

   ;pop textbuffer

   ;pop beginChar

   ;pop TableWidth

   DrawTableLine PROC

   push ebp

   mov ebp , esp

   push eax

   push ebx

   push ecx

   ; do nothing if TableWidth<2

   mov ecx,[ebp+28] ;ecx=TableWidth

   cmp ecx,2

   jb DrawTableLineCleanup

   ;beginChar, the left border

   push [ebp+24]

   call OutputChar

   add esp,4

   ;the text

   ;ebx=min(TableWidth-2,textlen);

   mov ebx,[ebp+16] ;ebx=textlen

   mov eax,ebx

   add eax,2 ;eax=textlen+2

   cmp eax,ecx ;textlen+2<=TableWidth?

   jbe DrawTableLinePrintText ;yes, print it

   mov ebx,ecx ;otherwise cut the string to TableWidth-2 characters

   sub ebx,2 ;ebx=TableWidth-2

   DrawTableLinePrintText:

   ;if no text to print,jump to fill the whole line

   cmp ebx,0

   je DrawTableLineFillLine

   ; call OutputStringN to print the text part

   push [ebp+20]

   push ebx

   call OutputStringN

   pop ebx

   add esp,4

   DrawTableLineFillLine:

   ;fill the rest of table line

   ;call OutputCharN(fillchar,TableWidth-2-ebx)

   mov eax, [ebp+28]

   sub eax, 2

   sub eax, ebx

   push [ebp+12]

   push eax

   call OutputCharN;

   add esp,8

   ;endChar, the right border

   push [ebp+8]

   call OutputChar

   add esp,4

   ;change line

   push CR

   call OutputChar

   add esp,4

   push LF

   call OutputChar

   add esp,4

   DrawTableLineCleanup:

   pop ecx

   pop ebx

   pop eax

   mov esp,ebp

   pop ebp

   ret

   DrawTableLine ENDP

   ;draw a table top line(using ASCII code)

   ;usage:

   ;push TableWidth

   ;call DrawTableTop

   ;pop TableWidth

   DrawTableTop PROC

   push ebp

   mov ebp , esp

   ;call DrawTableLine(TableWidth,ULCORNER,NULL,NULL,HBAR,URCORNER)

   push [esp+8];TableWidth

   push ULCORNER

   push 0;

   push 0;

   push HBAR

   push URCORNER

   call DrawTableLine

   add esp,24

   mov esp,ebp

   pop ebp

   ret

   DrawTableTop ENDP

   ;draw a table buttom line(using ASCII code)

   ;usage:

   ;push TableWidth

   ;call DrawTableButtom

   ;pop TableWidth

   DrawTableButtom PROC

   push ebp

   mov ebp , esp

   ;call DrawTableLine(TableWidth,LLCORNER,NULL,NULL,HBAR,LRCORNER)

   push [esp+8];TableWidth

   push LLCORNER

   push 0;

   push 0;

   push HBAR

   push LRCORNER

   call DrawTableLine

   add esp,24

   mov esp,ebp

   pop ebp

   ret

   DrawTableButtom ENDP

   ;draw a table middle line(using ASCII code)

   ;usage:

   ;push TableWidth

   ;call DrawTableMiddleLine

   ;pop TableWidth

   DrawTableMiddleLine PROC

   push ebp

   mov ebp , esp

   ;call DrawTableLine(TableWidth,MLBORDER,NULL,NULL,HBAR,MRBORDER)

   push [esp+8];TableWidth

   push MLBORDER

   push 0;

   push 0;

   push HBAR

   push MRBORDER

   call DrawTableLine

   add esp,24

   mov esp,ebp

   pop ebp

   ret

   DrawTableMiddleLine ENDP

   ;draw table lines and print text (using ASCII code)

   ;wrap to seperate lines if the text is too long, or delimiters were
   found in the text

   ;usage:

   ;push TableWidth

   ;push stringbuffer

   ;push stringlen

   ;push delimiter

   ;call DrawTableLineWithWrap

   ;pop delimiter

   ;pop stringlen

   ;pop stringbuffer

   ;pop TableWidth

   DrawTableLineWithWrap PROC

   push ebp

   mov ebp , esp

   push eax ;

   push ebx ;

   push ecx ;

   push edx ;

   push edi ;

   push esi ;

   mov ebx ,[ebp+8] ;delimiter

   mov ecx ,[ebp+12] ;stringlen

   mov edx ,[ebp+20] ;TableWidth

   mov esi ,[ebp+16] ;stringbuffer

   ;DWORD curlinebase=esi;

   ;BOOL bTerminate=FALSE;

   ;BOOL bDelimiter;

   ;edi=esi;

   ;

   ;while(!bTerminate&&edi<esi+ecx)

   ;{

   ; if(edi==esi+ecx-1 /\*end of
   buffer*/){bDelimiter=FALSE;bTerminate=TRUE;}

   ; else if([edi]==''){bDelimiter=TRUE;bTerminate=TRUE;}

   ; else if([edi]==ebx /\*delimiter*/{bDelimiter=TRUE;}

   ; else if(edi=curlinebase+TableWidth-2) /\*wrap*/{bDelimiter=FALSE;}

   ; else {edi++; continue;}

   ;
   DrawTableLine(TableWidth,MLBORDER,curlinebase,bDelimiter?edi-curlinebase:edi-curlinebase+1,HBAR,MRBORDER);

   ; edi++;

   ; curlinebase=edi;

   ;}

   mov edi ,esi

   ;allocate local vars

   sub esp ,12

   ;DWORD& curlinebase=*(ebp-36);6 pushed registers

   ;BOOL& bTerminate=*(ebp-32)

   ;BOOL& bDelimiter=*(ebp-28)

   mov dword ptr [ebp-36],esi

   mov dword ptr [ebp-32],0

   DrawTableLineWithWrapLoop:

   ;if(bTerminate==TRUE) goto DrawTableLineWithWrapCleanup

   cmp dword ptr [ebp-32],0

   jne DrawTableLineWithWrapCleanup

   ;if(edi>=esi+ecx) goto DrawTableLineWithWrapCleanup

   mov eax,esi

   add eax,ecx

   cmp edi,eax

   jae DrawTableLineWithWrapCleanup

   dec eax

   ;if(edi==esi+ecx-1) goto DrawTableLineWithWrapEndOfBuffer

   cmp edi,eax

   je DrawTableLineWithWrapEndOfBuffer

   ;if([edi]==0) goto DrawTableLineWithWrapNullTerminator

   cmp byte ptr [edi],0

   je DrawTableLineWithWrapNullTerminator

   ;if([edi]==ebx) goto DrawTableLineWithWrapDelimiter

   cmp byte ptr [edi],bl

   je DrawTableLineWithWrapDelimiter

   ;if(edi==curlinebase+TableWidth-2) goto DrawTableLineWithWrapLineWrap

   mov eax,[ebp-36]

   add eax,edx

   sub eax,2

   cmp edi,eax

   je DrawTableLineWithWrapLineWrap

   inc edi

   jmp DrawTableLineWithWrapLoop

   DrawTableLineWithWrapEndOfBuffer:

   ;bTerminate=TRUE,bDelimiter=FALSE;

   mov dword ptr [ebp-32],1

   mov dword ptr [ebp-28],0

   jmp DrawTableLineWithWrapDrawLine

   DrawTableLineWithWrapNullTerminator:

   ;bTerminate=TRUE,bDelimiter=TRUE;

   mov dword ptr [ebp-32],1

   mov dword ptr [ebp-28],1

   jmp DrawTableLineWithWrapDrawLine

   DrawTableLineWithWrapDelimiter:

   ;bDelimiter=TRUE;

   mov dword ptr [ebp-28],1

   jmp DrawTableLineWithWrapDrawLine

   DrawTableLineWithWrapLineWrap:

   ;bDelimiter=FALSE;

   mov dword ptr [ebp-28],0

   ;jmp DrawTableLineWithWrapDrawLine

   DrawTableLineWithWrapDrawLine:

   ;
   DrawTableLine(TableWidth,MLBORDER,curlinebase,bDelimiter?edi-curlinebase:edi-curlinebase+1,HBAR,MRBORDER);

   push edx ;TableWidth

   push MLBORDER ;beginchar

   push [ebp-36] ;stringbuffer

   ;eax=bDelimiter?edi-curlinebase:edi-curlinebase+1

   mov eax,edi

   sub eax,[ebp-36]

   cmp dword ptr [ebp-28],0

   jne DrawTableLineWithWrapDrawLine2

   add eax,1

   DrawTableLineWithWrapDrawLine2:

   push eax ;bufferlen

   push HBAR ;fillchar

   push MRBORDER ;endchar

   call DrawTableLine

   add esp,24

   ; edi++;

   ; curlinebase=edi;

   inc edi

   mov [ebp-36],edi

   jmp DrawTableLineWithWrapLoop

   DrawTableLineWithWrapCleanup:

   add esp ,12

   pop esi

   pop edi

   pop edx

   pop ecx

   pop ebx

   pop eax

   mov esp,ebp

   pop ebp

   ret

   DrawTableLineWithWrap ENDP

    

   ShowMenu Proc

   push ebp

   mov ebp , esp

   push TABLEWIDTH

   call DrawTableTop

   ;add esp,4

   ;push TABLEWIDTH

   push OFFSET menustring

   push menustringLen

   push menuDelimiter

   call DrawTableLineWithWrap

   sub esp,12

   ;push TABLEWIDTH

   call DrawTableButtom

   add esp,4

   mov esp,ebp

   pop ebp

   ret

   ShowMenu EndP

   ;invoke WriteFile,hOutPut,lpszText,sl,ADDR bWritten,NULL

   main PROC

   int 3

   ; call ShowMenu

   ;text code of OutputChar

   ; push VBAR

   ; call OutputChar

   ; add esp,4

   ;test code of DrawTableLineWithWrap

   push TABLEWIDTH

   push OFFSET menustring

   push menustringLen

   push menuDelimiter

   call DrawTableLineWithWrap

   sub esp,12

   exit

   main ENDP

   END main

   #=====================================================================

   # lab5 - build a program that displays the Fibonacci numbers for a
   user defined input upper bound

   # Author: Sheng_Jiang

   # Course: COSC 2425

   # Date: 6/21/05

   #=====================================================================

   PROJECT = Lab5

   NAME = Sheng_Jiang

   Date = 6/21/05

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

    
