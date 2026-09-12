.. meta::
   :description: 

Exception 0xc0000409 in when launching StarCraft.exe
===================================================================

.. post:: 12 Sep, 2026
   :tags: Starcraft
   :category: Security
   :author: me
   :nocomments:

Windows Exploit Protection includes a feature called Control Flow Guard (CFG), which frequently conflicts with poorly written legacy games, resulting in a 0xc0000409 crash inside ntdll.dll. 

To disable CFG for a specific program on Windows 11, follow these steps:

* Click the Windows Start menu, type Windows Security, and press Enter.
* Select App & browser control from the left or main menu.
* Click on Exploit protection settings at the bottom.
* Switch from the System settings tab to the Program settings tab.
* Click Add program to customize -> Choose exact file path.
* Navigate to your StarCraft install directory and select StarCraft.exe. By default it is C:\Program Files (x86)\StarCraft, the exe to select is in x86 or x86_64 subfolder, depending on your Battle.Net launcher settings. Click Open.  
* Scroll down the list of settings to Control Flow Guard (CFG).
* Check the box for Override system settings, toggle the switch to Off, and click Apply.
  
Some background information: 

Control Flow Guard (CFG) is a security feature in Windows that helps prevent memory corruption vulnerabilities by ensuring that the program's control flow follows a valid path. It basically maintain a list of valid function pointers and checks them at call runtime to prevent attackers from executing malicious code created by buffer overrun. The list is provided by the compiler, so any dynamically generate code would trigger a CFG violation. Programmers now have to register any dynamically generated code entry points with a SetProcessValidCallTargets call. Except the base address of a memory page marked using VirtualAlloc or VirtualProtect as executable (PAGE_EXECUTE_READWRITE or PAGE_EXECUTE_READ), a page allocation base is a valid indirect call target by default.

The reason why StarCraft Remake and Warcraft III: Reforged violate CFG is most likely due to extensive their assembly code usage. When Blizzard release those games, they didn’t write a brand-new engine from scratch. They took the original C++ and Assembly source code and updated 4K assets and fixed compatibility issues. At the time of the original release, they are targeting Pentium processors, and assembly code are a given, as functions come with all the stack management costs. Even when the remake uses a modern C++ compiler, it is not cost effective to port all the assembly codes to C++. The assembly code are still assembled, not compiled, and the compiler has no knowledge of the entry points of the assembly code to comply with CFG.

The original StarCraft flopped at E3, eventually everyone moved to the Diablo, whose release raised expectation high. When everyone get back to StarCraft, they have to play catch up, with an engine made for DOS and a lot of unexperienced developers. There are dozens of RTS games in development, including Westwood Studios's Red Alert. Blizzard had to release StarCraft fast. They were given only 2 months to launch. In fact it took fourteen months. People, including people who are trained on the job, worked long, long hours, and with assembly code, it should not surprise anybody that dangling pointers are everywhere. You can see former mistakes in the source code like

.. code-block:: c++

    #define ALLOW_CIRCLE_MOVE_DELAY (10*60) //don't xxxx change this without talking to frank or mike

Mike Morhaime and Frank Pearce are the lead developers.

The code could be called brilliantly written for its time, running a complex RTS game with hundreds of units on a Pentium and16MB of RAM. But we have been long passed that hardware limitation, now security is the focus. 