.. meta::
   :description: END; all: $(PROJECT).exe

Lab5 Step4
==========
.. post:: 24, Jun, 2005
   :category: Machine Language
   :author: me
   :nocomments:


   | ;=====================================================================
   | ; DrawLine.asm - help routine to draw table lines
   | ; Author: Sheng_Jiang
   | ; Course: COSC 2425
   | ; Date: 6/24/05
   | ;=====================================================================

   |  INCLUDE lab5.inc
   |  .Code 
   | DrawTableLine  PROC   USES eax ecx esi, 
   |  \_TableWidth : DWORD,
   |  beginChar : BYTE,
   |  textBuffer:PTR BYTE,
   |  textLen :DWORD,
   |  fillChar:BYTE,
   |  endChar:BYTE
   |  LOCAL printtextlen : DWORD, totalTextLen :DWORD
   |  mov  eax,_TableWidth
   |  sub  eax,2
   |  mov  totalTextLen,eax   ;totalTextLen=_TableWidth-2
   |  .IF(totalTextLen>0)
   |   ;beginChar, the left border
   |   mov   al,beginChar
   |   call  WriteChar
   |   
   |   ;cut the text if it is too long 
   |   ;printtextlen=min(\_TableWidth-2,textlen);
   |   mov   eax,textLen
   |   .IF(eax>totalTextLen)
   |    mov eax,totalTextLen
   |    mov printtextlen,eax ;overflow
   |   .ELSE
   |    mov printtextlen,eax
   |   .ENDIF
   |   mov   ecx, printtextlen
   |   
   |   ; print the text part
   |   mov  esi,textBuffer
   | DrawTableLinePrintText:
   |   ;if no text left,jump to fill the line
   |   jcxz DrawTableLineFillLine
   |   mov  al,byte ptr [esi] 
   |   call  WriteChar
   |   inc  esi
   |   loop DrawTableLinePrintText
   |   
   | DrawTableLineFillLine:
   |   ;fill the rest of table line
   |   ;will \_TableWidth-2-printtextlen fillchars
   |   mov  ecx,totalTextLen
   |   sub  ecx,printtextlen
   |   mov  al,fillChar
   | DrawTableLineFillLineLoop:
   |   ;if no text left,jump to end the line
   |   jcxz DrawTableLineFillEndLine
   |   call WriteChar
   |   loop DrawTableLineFillLineLoop
   | DrawTableLineFillEndLine:
   |   mov  al,endChar
   |   call WriteChar
   |   call Crlf
   |  .ENDIF
   |  ret
   | DrawTableLine ENDP

    END;

   | =====================================================================
   | ; drawwrap.asm - help routine to draw table lines
   | ; wrap to seperate lines if the text is too long, or delimiters
     were found in the text
   | ; Author: Sheng_Jiang
   | ; Course: COSC 2425
   | ; Date: 6/24/05
   | ;=====================================================================
   |  INCLUDE lab5.inc
   |  .Code
   | DrawTableLineWithWrap PROC USES eax edx esi edi,
   |  \_TableWidth : DWORD,
   |  beginChar : BYTE,
   |  textBuffer: PTR BYTE,
   |  textLen :DWORD,
   |  fillChar:BYTE,
   |  endChar:BYTE,
   |  \_Delimiter:BYTE
   |  LOCAL EndOfBuffer:PTR BYTE,  ; stop point of a
     buffer;textBuffer+textLen-1
   |  EndOfLineWrap:DWORD,    ; stop point of a line;_TableWidth -3
   |  curlinebase:PTR BYTE ,    ; pointer to the beginning of the
     current line
   |  curlineLen:DWORD,    ; length of the current line
   |  bTerminate:BYTE,    ; stop scanning
   |  bDelimiter:BYTE     ; include the current char in printing or not
   |  
   |  ;edi=esi=textBuffer;
   |  ;while(!bTerminate)
   |  ;{
   |  ; if(edi==EndOfBuffer){bDelimiter=(\_Delimiter==[edi];bTerminate=TRUE;}
   |  ; else if([edi]==''){bDelimiter=TRUE;bTerminate=TRUE;}
   |  ; else if([edi]==_Delimiter)
   |  ; {
   |  ;  if(edi==curlinebase){edi++; curlinebase=edi;continue;}//skip
     leading delimiters
   |  ;  else bDelimiter=TRUE;
   |  ; }  
   |  ; else if(edi==curlinebase+_TableWidth -3)
     /\*wrap*/{bDelimiter=FALSE;}
   |  ; else {edi++; continue;}
   |  ; DrawTableLine(\_TableWidth
     ,MLBORDER,curlinebase,bDelimiter?edi-curlinebase:edi-curlinebase+1,FILLSPACE,MRBORDER);
   |  ; edi++;
   |  ; curlinebase=edi;
   |  ;}
   |  mov   esi,textBuffer
   |  mov   edi,esi
   |  mov   eax,esi
   |  add   eax,textLen
   |  sub   eax,1
   |  mov   EndOfBuffer,eax
   |  mov   eax,_TableWidth
   |  sub   eax,3
   |  mov   EndOfLineWrap,eax
   |  mov   bTerminate,0
   |  mov   bDelimiter,0
   |  mov   curlinebase,esi
   |  .WHILE(bTerminate==0)
   |   mov eax,curlinebase
   |   add eax,EndOfLineWrap
   |   mov dl,byte ptr [edi]
   |   .IF(edi==EndOfBuffer)
   |    mov bTerminate,1
   |    .IF(dl==_Delimiter)
   |     mov bDelimiter,1
   |    .ELSE
   |     mov bDelimiter,0
   |    .ENDIF
   |   .ELSEIF(dl==0)
   |    mov bDelimiter,1
   |    mov bTerminate,1
   |   .ELSEIF(dl==_Delimiter)
   |    mov bDelimiter,1
   |   .ELSEIF(edi==eax)
   |    mov bDelimiter,0
   |   .ELSE
   |    inc edi
   |    .CONTINUE
   |   .ENDIF
   |   mov eax,edi
   |   sub eax,curlinebase
   |   .IF(bDelimiter==0)
   |    inc eax
   |   .ENDIF
   |   mov curlineLen,eax
   |   invoke DrawTableLine,
     \_TableWidth,beginChar,curlinebase,curlineLen,fillChar,endChar
   |   inc edi
   |   mov curlinebase,edi   
   |  .ENDW
   |  ret
   | DrawTableLineWithWrap ENDP
   | END;

   | =====================================================================
   | ; lab5.asm - build a program that displays the Fibonacci numbers
     for a user defined input upper bound
   | ; Author: Sheng_Jiang
   | ; Course: COSC 2425
   | ; Date: 6/21/05
   | ;
   | ;=====================================================================
   |  
   |  
   |  INCLUDE lab5.inc
   |  
   |     ;costants

   | 
   |  .Data
   |  menuSelection     BYTE 0
   |  menustring      BYTE "Menu\| \|Press [I] to Display program
     instructions|Press [N] to enter an integer number (0 - 20)|Press
     [F] - Display the first N Fibonacci numbers on the console|Press
     [X] - Quit the program",0
   |  menustringLen     DWORD $-menustring
   |  menuDelimiter     BYTE "\|"
   |  menuPromptstring    BYTE "Enter your selection(upper case or lower
     case)[I/N/F/X]:",0
   |  instructionString    BYTE "This program displays the Fibonacci
     numbers for a user defined input upper bound(up to 20)|Type N to
     input the number, and type F to display results.",0
   |  instructionStringLen   DWORD $-instructionString 
   |  numberPromptstring    BYTE "Enter a upper bound (0-20) and press
     ENTER:",0
   |  invalidNumberPromptstring  BYTE "only numbers from 0 to 20 are
     allowed",0
   |  ExitPromptstring    BYTE "Exiting...",0
   |  invalidSelectionPromptstring BYTE "Invalid selection. the
     selection must be one of I/N/F/X",0
   |  ShowFibPromptString    BYTE "The requested Fibonacci numbers
     are:",0
   |  ExitFlag      BYTE SHOWMENU_CONTINUE
   |  isNumberEntered     BYTE 0
   |  number       SDWORD ?
   |  PUBLIC  menustring
   |  PUBLIC  menuDelimiter
   |  PUBLIC  menustringLen
   |  PUBLIC menuPromptstring
   |  PUBLIC ShowFibPromptString
   |  .CODE
   |  

   | 
   | ;invoke WriteFile,hOutPut,lpszText,sl,ADDR bWritten,NULL
   | main  PROC
   |    .REPEAT
   |     invoke ShowMenu,offset menuSelection
   |     mov  ExitFlag,al
   |     ;toupper(menuSelection)
   |     .IF(menuSelection>'Z')
   |      mov al,menuSelection
   |      sub al,32
   |      mov menuSelection,al
   |     .ENDIF
   |     .IF(menuSelection=='I')
   |      call Clrscr
   |      invoke DrawTableLine,TABLEWIDTH,ULCORNER,0,0,HBAR,URCORNER
   |      invoke  DrawTableLineWithWrap,TABLEWIDTH,
     VBAR,OFFSET instructionString,instructionStringLen,BLACKSPACE,VBAR,menuDelimiter
   |      invoke DrawTableLine,TABLEWIDTH,LLCORNER,0,0,HBAR,LRCORNER
   |      call Crlf
   |     .ELSEIF(menuSelection=='N')
   |      call Crlf
   |      mov isNumberEntered,0
   |      .REPEAT 
   | ReadNumber:
   |       call Crlf
   |       mov  edx,offset numberPromptstring
   |       call WriteString
   |       call ReadInt
   |       jno  ReadNumberSuccess
   |       call Crlf
   |       mov  edx,OFFSET invalidNumberPromptstring
   |       call WriteString
   |       call Crlf
   |       jmp  ReadNumber   ;go input again
   | ReadNumberSuccess:  ;validate number
   |       
   |       .IF(eax>20)
   |        mov isNumberEntered,0
   |       .ELSEIF(eax<0)
   |        mov isNumberEntered,0
   |       .ELSE
   |        mov isNumberEntered,1
   |        mov  number,eax   ;store good value
   |       .ENDIF
   |       
   |       .IF(isNumberEntered==0)
   |        mov  edx,OFFSET invalidNumberPromptstring
   |        call WriteString
   |        call Crlf
   |        .CONTINUE
   |       .ENDIF
   |      .UNTIL(isNumberEntered)
   |     .ELSEIF(menuSelection=='F')
   |      invoke ShowFibonaccinumbers,number
   |     .ELSEIF(menuSelection=='X')
   |      call Crlf
   |      call Crlf
   |      mov  edx,OFFSET ExitPromptstring
   |      call WriteString
   |      call Crlf
   |     .ELSE
   |      call Crlf
   |      call Crlf
   |      mov  edx,OFFSET invalidSelectionPromptstring
   |      call WriteString
   |      call Crlf
   |     .ENDIF
   |    .UNTIL(ExitFlag==SHOWMENU_EXIT)
   |    exit
   | main  ENDP
   |    END  main;
   | =====================================================================
   | ; lab5.inc - build a program that displays the Fibonacci numbers
     for a user defined input upper bound
   | ; Author: Sheng_Jiang
   | ; Course: COSC 2425
   | ; Date: 6/24/05
   | ;=====================================================================

   |  .386
   |  option casemap:none

   |  ;
     -----------------------------------------------------------------
   |  ; include files that have MASM format prototypes for function
     calls
   |  ;
     -----------------------------------------------------------------
   |  INCLUDE Irvine32.inc
   |  ; ------------------------------------------------
   |  ; Library files that have definitions for function
   |  ; exports and tested reliable prebuilt code.
   |  ; ------------------------------------------------
   |  includelib gdi32.lib
   |  includelib user32.lib
   |  includelib kernel32.lib
   |  includelib Irvine32.lib
   |  ;constants
   |  CR EQU 0Dh
   |  LF EQU 0Ah
   |  TABLEWIDTH EQU  79
   |  HBAR        EQU  196
   |  VBAR        EQU  179
   |  ULCORNER    EQU  218
   |  URCORNER    EQU  191
   |  MLBORDER EQU  195
   |  MRBORDER EQU  180
   |  LLCORNER    EQU  192
   |  LRCORNER    EQU  217
   |  BLACKSPACE EQU  32
   |  SHOWMENU_EXIT equ 1
   |  SHOWMENU_CONTINUE equ 0 
   |  LAB5DEBUG EQU  1
   |  
   |  DrawTableLine  PROTO,_TableWidth : DWORD,
   |   beginChar : BYTE,
   |   textBuffer: PTR BYTE,
   |   textLen :DWORD, 
   |   fillChar:BYTE, 
   |   endChar:BYTE
   |  
   |  DrawTableLineWithWrap PROTO, \_TableWidth : DWORD,
   |   beginChar : BYTE,
   |   textBuffer: PTR BYTE,
   |   textLen :DWORD,
   |   fillChar:BYTE,
   |   endChar:BYTE,
   |   \_Delimiter:BYTE
   |  ShowMenu PROTO, pcharTyped: PTR BYTE
   |  ShowFibonaccinumbers PROTO, boundary:SDWORD

   | #=====================================================================
   | # lab5 - build a program that displays the Fibonacci numbers for a
     user defined input upper bound
   | # Author: Sheng_Jiang
   | # Course: COSC 2425
   | # Date: 6/21/05
   | #=====================================================================
   | PROJECT = Lab5
   | NAME = Sheng_Jiang
   | Date = 6/21/05
   | ROOTDRIVE  = C
   | VERSION   = V1

   | SRCS   =
   |     $(PROJECT).asm
   |     drawline.asm
   |     drawwrap.asm
   |     showmenu.asm
   |     makefile

   | MASM32   = $(ROOTDRIVE):/masm32
   | ML    = $(MASM32)/bin/ml
   | LINK   = $(MASM32)/bin/link
   | Zip    = H:/mydoc/Tools/Bin/zip
   | DEBUG   = c:/masm32/debug/windbg
   | Irvine32  = H:/mydoc/MyProjct/COSC2425/Lib32

   | MLFLAGS   = /I. /I $(MASM32)include /I $(MASM32)macros /I
     $(Irvine32) /Zi /Zd /Zf /c /Fl /coff /Cp
   | LINKFLAGS  = /subsystem:console
     /libpath:$(MASM32)lib /libpath:$(Irvine32) /debug 
   | DEBUGFLAGS  = -g -G -QY -logo $(PROJECT).log -QSY -sdce -WF
     $(PROJECT).WEW

   all: $(PROJECT).exe

   | $(PROJECT).obj: $(PROJECT).asm DrawLine.obj DrawWrap.obj
     showmenu.obj showFib.obj
   |  $(ML) $(MLFLAGS) $(PROJECT).asm

   | $(PROJECT).exe: $(PROJECT).obj
   |  $(LINK) $(LINKFLAGS) /out:$(PROJECT).exe  $(PROJECT).obj
     DrawLine.obj DrawWrap.obj showmenu.obj showFib.obj
   |  
   | DrawLine.obj: DrawLine.asm
   |  $(ML) $(MLFLAGS) DrawLine.asm
   |  
   | DrawWrap.obj: DrawWrap.asm DrawLine.obj
   |  $(ML) $(MLFLAGS) DrawWrap.asm
   |  
   | ShowMenu.obj: ShowMenu.asm DrawWrap.obj
   |  $(ML) $(MLFLAGS) ShowMenu.asm
   | showFib.obj: showFib.asm
   |  $(ML) $(MLFLAGS) showFib.asm

   | clean:
   |  del $(PROJECT).exe \*.obj \*.lst \*.map \*.pdb \*.ilk \*.log

   | zip: clean
   |   del $(NAME)\_$(PROJECT)\_$(VERSION).zip
   |   $(Zip) $(NAME)\_$(PROJECT)\_$(VERSION).zip $(SRCS)
   | debug: $(PROJECT).exe
   |   $(DEBUG) $(DEBUGFLAGS) $(PROJECT).exe

   | 
   | ;=====================================================================
   | ; ShowFib.asm - help routine to draw table lines, and get user
     input
   | ; Author: Sheng_Jiang
   | ; Course: COSC 2425
   | ; Date: 6/24/05
   | ;=====================================================================
   |  INCLUDE lab5.inc
   |  .Data
   |  extern ShowFibPromptString:BYTE
   |  .Code 
   |  
   | Fibonacci PROC USES ecx edx, x:SDWORD
   |  .IF(x<2)
   |   mov eax,x
   |  .ELSE
   |   mov edx,0
   |   mov ecx,x
   |   dec ecx
   |   invoke Fibonacci,ecx
   |   mov edx,eax
   |   dec ecx
   |   invoke Fibonacci,ecx
   |   add edx,eax
   |   mov eax,edx  
   |  .ENDIF
   |  ret
   | Fibonacci ENDP
   | ShowFibonaccinumbers Proc USES ecx edx, boundary :SDWORD
   |    call Crlf
   |    mov edx,OFFSET ShowFibPromptString
   |    call Crlf
   |    mov ecx,0
   |    .WHILE(ecx<=boundary)
   |     invoke Fibonacci,ecx
   |     call WriteInt
   |     mov al,BLACKSPACE
   |     call WriteChar
   |     inc ecx
   |    .ENDW

   |    ret
   | ShowFibonaccinumbers EndP
   |  END 
   | ;=====================================================================
   | ; ShowMenu.asm - help routine to draw table lines, and get user
     input
   | ; Author: Sheng_Jiang
   | ; Course: COSC 2425
   | ; Date: 6/24/05
   | ;=====================================================================
   |  INCLUDE lab5.inc
   |  .Data
   |  extern menustring  :BYTE 
   |  extern menustringLen :DWORD 
   |  extern menuDelimiter :BYTE 
   |  extern menuPromptstring :BYTE
   |  .Code 
   |  
   | ShowMenu Proc USES edx, pcharTyped: PTR BYTE
   |    call Crlf
   |    invoke DrawTableLine,TABLEWIDTH,ULCORNER,0,0,HBAR,URCORNER
   |    invoke  DrawTableLineWithWrap,TABLEWIDTH,
     VBAR,OFFSET menustring,menustringLen,BLACKSPACE,VBAR,menuDelimiter
   |    invoke DrawTableLine,TABLEWIDTH,LLCORNER,0,0,HBAR,LRCORNER
   |    call Crlf
   |    mov edx,offset menuPromptstring
   |    call WriteString
   |    call ReadChar
   |    mov edx,dword ptr [pcharTyped]
   |    mov byte ptr [edx],al
   |    .IF(al=='X')
   |     mov al,SHOWMENU_EXIT
   |    .ELSEIF(al=='x')
   |     mov al,SHOWMENU_EXIT
   |    .ELSE
   |     mov al,SHOWMENU_CONTINUE
   |    .ENDIF
   |    ret
   | ShowMenu EndP
   |  END

