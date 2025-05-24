.. meta::
   :description: 1) Introduction

PIC 16F88 Microcontroller Servo Controller Project
==================================================
.. post:: 25, Jul, 2005
   :tags: Hardware,Microcontroller
   :category: ACC
   :author: me
   :nocomments:

.. container:: bvMsg
   :name: msgcns!1BE894DEAF296E0A!198

   .. rubric:: 1) Introduction
      :name: Microcontroller_introduction

   The goal of this assignment is to control the position of a
   servomotor by generate pulses on the output pin for a time specified
   by various voltage of the input pin of the chip. The voltage should
   also be displayed by a 7-segment
   \ `LED <http://en.wikipedia.org/wiki/Light-emitting_diode>`__\ 
   connected to some output pins of the chip.

   .. rubric:: 2) Overview of the PIC 16F88 Microcontroller
      :name: overview-of-the-pic-16f88-microcontroller

   PIC16F88 is a member of the huge Microcontroller Chip Family with 16
   I/O pins and 2 power pins. It contains a lot of functions which are
   abundant to this project. The essential features used by this project
   are
   · Programmable Flash

   · Data Memory

   · Interrupt

   · Internal clock and multiple time modules

   · A/D Module

   Information of other features, such as
   \ `EPROM <http://en.wikipedia.org/wiki/EPROM>`__\  access or power
   management, can be found in the datasheet of this chip, which is
   available at \ `www.microchip.com <http://www.microchip.com/>`__\ .

   .. rubric:: a)\  \ Programmable Flash
      :name: a-programmable-flash

   PIC16F88 has a 13 bit program counter, which can address 8K*14
   addresses, or up to 1FFFh. However, it is paged so that accessing
   above 4K*14 will cause a wraparound. That is, the actual address is
   the address masked with 3FFh. The size of the code in this project is
   far from this limit, however. The starting address after power up,
   named \ `Reset
   vector <http://en.wikipedia.org/wiki/Reset_vector>`__\ , located at
   0000h. The \ `interrupt
   vector <http://en.wikipedia.org/wiki/Interrupt_vector>`__\ , called
   by the chip when an interrupt occurs, located at 0004h. Stack memory
   is hardware implemented, and is indirectly manipulated by some
   instructions such as CALL and RETURN.

   .. rubric:: b)\  \ Data memory
      :name: b-data-memory

   Similar to
   \ `IBM-PC <http://en.wikipedia.org/wiki/IBM_Personal_Computer>`__\ ,
   data memory is divided into several parts, called Banks in this chip,
   and a bank selection must be made before accessing an address outside
   current bank. Each bank has a 128 bytes extent, and some of them are
   mapped to the same position for convenience. The lower part of bank
   is reserved for Special Function Registers, and above them are
   \ `General Purpose
   Registers <http://en.wikipedia.org/wiki/Processor_register>`__\ ,
   implemented as \ `static
   RAM <http://en.wikipedia.org/wiki/Static_random_access_memory>`__\ .
   To reduce bank selection, this project use 70h-7fh, the General
   Purpose Registers mapped to the same position in every bank. Some
   Special Function Registers are also accessed to perform tasks such as
   A/D I/O or timing. Accessing to these registers will be discussed
   later.

   .. rubric:: c)\  \ Interrupt
      :name: c-interrupt

   An interrupt is generated when predefined condition met, and the chip
   will make a call to the interrupt vector located at 0004h in the
   Programmable Flash. Some special flag bit in Some Special Function
   Registers are set before this call. This project use the A/D, Time0
   and Time1 overflow interrupts for asynchronous operation. The general
   tasks of the \ `interrupt
   handler <http://en.wikipedia.org/wiki/Interrupt_handler>`__\  are
   1. First, disable all interrupt to prevent reentry

   2. Save context information, such the value of W register, the Status
   register and program counter.

   3. Check desired flag bits to see if the reveal the desired type of
   the interrupt occurs, and handle it with the flag bits cleared for
   future handling.

   4. Restore context information to enable the program continues as
   usual after the interrupt occurs.

   5. At last, enable interrupts to enable future interrupts

   .. rubric:: d)\  \ Internal clock and multiple time modules
      :name: d-internal-clock-and-multiple-time-modules

   The chip comes with 3 timer modules, and 2 are used by this project.
   TMR0 and TMR1 are prescalable timers with different ranges. The TMR0
   register and TMR1H/TMR1L are readable and writeable counter register
   for these two timers, along with the Status register for synchronous
   operations. Interrupts are also generated when these counters
   overflow, and this project use them to invoke asynchronous operations
   and generate signals with varied time interval.

   .. rubric:: e)\  \ A/D Module
      :name: e-ad-module

   The chip comes with a 10-bit, 7-channel Analog to Digital module to
   convert input signals to 10 bit digital number. If the module is
   configured properly, after a flag bit in the ADCON0 register is set,
   an A/D conversation begins, and when it finishes, the result is
   placed into A/D result registers, namely ADRESH and ADRESL, and the
   flag bit is cleared. An peripheral interrupt is also generated to
   allow asynchronous operations

   .. rubric:: 3) Description of the test circuit
      :name: description-of-the-test-circuit

   Here is a block diagram in the assignment guideline of this project.
   Connection specification:

   ========== =========================== ================
   Pin number Description                 Connected to
   17         A/D input,  0-5V            Variable voltage
   18         Digital output, 33HZ signal Servomotor
   6-13       Digital output              7-segment LED
   5          Ground reference            Ground
   14         Positive supply             Power
   ========== =========================== ================

   .. rubric:: 4) Development of the control program
      :name: development-of-the-control-program

   This program is divided into following modules:

   - Initialization module

     - Port A Configuration
     - Port B Configuration
     - Frequency Setting
     - Interrupt Setting

   - Interrupt handler modules

     - A/D Interrupt
     - TMR1 Interrupt
     - TMR0 Interrupt

   With the reset and interrupt vector fixed, the program placed a jump
   instruction at the reset vector, and the destination of the jump is
   the actual beginning of the program. The program then calls the
   initialization module, and then enters an infinite loop and is ready
   for interrupts.

   .. rubric:: a)\  \ Initialization module
      :name: a-initialization-module

   This module is spitted into 4 modules. These modules are independent,
   so they can be composed into one, but they are separated for easier
   debugging and understanding.

   .. rubric:: i) Port A Configuration
      :name: i-port-a-configuration

   The task of this module is to set analog input and digital out pins.
   TRISA register is set to 1, indicates the pin RA0 is set to analog
   input, and the rest pings on PortA are set to digital output. The
   ANSEL register is also set to 1 to select RA0 for A/D conversation,
   and the ADCON0 is set to b'11000001' in accordance. After the
   configurations are finished, the first A/D conversation is triggered
   after a short wait.

   .. rubric:: ii) Port B Configuration
      :name: ii-port-b-configuration

   Because PortB is used for 7-segment LED display, both TRISB and PORTB
   registers are cleared to display nothing at the beginning.

   .. rubric:: iii) Frequency Setting
      :name: iii-frequency-setting

   The internal clock is set to 4MHZ, which is specified in the
   assignment guideline. This is implemented by setting the OSCCON
   register to b'01101110'.

   .. rubric:: iv) Interrupt Setting
      :name: iv-interrupt-setting

   This project uses 3 interrupts, A/D, TMR0 and TMR1. A/D is used for
   A/D conversations, TMR1 for a 33HZ signal generator, and TMR0 for
   pulses. INTCON and PIE1 are configured to enable these interrupts,
   and T1CON and OPTION_REG are used to scale TMR0 to 1:16, and TMR1 to
   1:1. TMR1L and TMR1H are initialized so that the first TMR1 overflow
   interrupt will occur 1/33 second later, and the timers are started
   when the configurations are done.

   .. rubric:: b)\  \ Interrupt handler modules
      :name: b-interrupt-handler-modules

   After necessary tasks of the interrupt handler are done, the flags
   bits of interrupts will be checked. If a flag bit of an interrupt is
   set, a corresponding handle routine will be called. Routinely
   interrupt handler tasks will be performed at last.

   .. rubric:: i) TMR1 Interrupt
      :name: i-tmr1-interrupt

   Both the initialization and the handler routine set TMR1H and TMR1L
   to 35233 to ensure the overflow interrupt will occur after 30303
   cycles, or 1/33 seconds, thus generate a 33HZ clock. For convenience,
   a high pulse signal output for the Servomotor and an A/D conversation
   request is also placed here. In other words, the pulse is set to high
   every 1/33 seconds, and the A/D conversation is also triggered every
   1/33 seconds. The TMR0 timer is also enabled to set the pulse to low
   after a period of time. This period is calculated after the voltage
   is read.

   .. rubric:: ii) A/D Interrupt
      :name: ii-ad-interrupt

   This interrupt handler does the heaviest job in the program. First,
   it copy the digitalized voltage into user defined variable named
   AnalogResultH and AnalogResultL, and AnalogResultL is abandoned since
   a continuum specified by AnalogResultH is enough. Then the duration
   of the high stage of the output pulse and the LAD output will be
   calculated. According to the document of the Servo, a high stage of
   0.36ms will cause the Servo turn to left, and 2.3 ms will cause it to
   turn right. Suppose the A/D result 0 means left, and 255 means right,
   then the duration of the high stage can be calculated by the
   following formula: Duration       = 0.36+AnalogResultH/256 \* 1.94 ms
   = 360+AnalogResultH*1,940/256   cycles to store the duration in TMR0,
   we need to prescale it to fit. The upper bound of it is 2.3 ms, or
   2,300 cycles. To make the maximum duration fit into a byte, the timer
   need to be prescaled to 1:16. Duration =360/16+(AnalogResultH/256)
   \*(1,940/16) ticks =22.5+ AnalogResultH/256\* 121.25 ticks Of course
   I can not do it with such precision with the little instruction set
   of the chip. Round downs are inevitable Duration ≈22 +
   AnalogResultH/256*121 ≈22 + -AnalogResultH/64 -AnalogResultH/128
   -AnalogResultH/256 So, to make the TMR0 overflows Duration ticks
   after the TMR1 interrupt rise the pulse signal, the TMR0 register
   must be set to TMR0           =256- Duration. This result is stored
   in a variable named Time0Interval, and is used by the TMR1 interrupt
   handler routine. This routine also scales the analog result to one
   digit value and displays it on a 7-segment LED. It is done by getting
   the high 4 bits of the high byte of the analog result.

   .. rubric:: iii) TMR0 Interrupt
      :name: iii-tmr0-interrupt

   This interrupt handler routine merely turn the TMR0 interrupt off,
   and output a low signal to end a pulse. **
   **

   .. rubric:: 5) Overview of testing done before burning the chip
      :name: overview-of-testing-done-before-burning-the-chip

   The test is done in the emulator. After loading the program into
   emulator, and execute it, it reads the value set on RA0, and output a
   pulse every 1/33HZ. 

