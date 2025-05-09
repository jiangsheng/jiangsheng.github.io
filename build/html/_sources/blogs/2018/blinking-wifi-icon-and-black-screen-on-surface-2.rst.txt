Blinking wifi icon and black screen on Surface 2
================================================
.. post:: 21, Aug, 2018
   :category: Uncategorized
   :author: jiangshengvc
   :nocomments:

This is the second time I run into this problem after a Windows Update. First time was halfway through last year's Microsoft MVP Summit and I had to Remote Desktop to my home machine with a spare android tablet and Bluetooth keyboard/mouse to get access to Windows apps. 

Good that the summit wifi was amazing but a Surface 2 with touch cover was way easier to carry around than the combination of tablet/keyboard/mouse. I got around the problem by `manually uninstalling  KB3033055 with dism remove package in recovery console command
prompt <https://answers.microsoft.com/en-us/surface/forum/surfwinrt-surfupdate/surface-rt-deadblack-screen-after-installing/bf7a38bd-f51e-4ded-8bfc-b0804b6c5ac6>`__ and hide the update afterwards. But recently I got the black screen with blinking wifi icon, again after installing a bunch of Windows Updates. 

So it probably has multiple causes. Anyway this is my way to get update working as of July 2018:
#. factory reset
#. go through initial setup (wifi, microsoft account etc)
#. search for update, this would take a while
#. uncheck everything, only install the 2015 firmware update. 
#. turn wifi off, reboot. 
#. download `kb2919355 <http://download.windowsupdate.com/msdownload/update/software/crup/2014/02/windows8.1-kb2919355-arm_a6119d3e5ddd1a233a09dd79d91067de7b826f85.msu>`__, `KB3173424 <http://download.windowsupdate.com/d/msdownload/update/software/crup/2016/06/windows8.1-kb3173424-arm_e11b6837c0586d2b8d887f3bc33b3372fe83c8c7.msu>`__, `KB3172614 <http://download.windowsupdate.com/c/msdownload/update/software/updt/2016/07/windows8.1-kb3172614-arm_3d918d6c809bf6f57c8fcefa5db5c739e1754426.msu>`__ and `KB3097667 <https://www.microsoft.com/en-us/download/details.aspx?id=49143>`__ on another machine (you need the ARM edition of those updates, not x86 or x64 so the file names should contain arm) to a usb drive. 
#. install in the order of kb2919355, KB3173424, KB3172614 and KB3097667 from usb drive, reboot
#. turn wifi back on and search for updates.
#. install remaining updates and reboot 

Microsoft says `August 14, 2018—KB4343898 (Monthly Rollup) <https://support.microsoft.com/en-us/help/4343898/windows-81-update-kb4343898>`__ fixes an issue with KB3033055 which has the same syndrome. Not sure if
this has anything to do with KB3097667. Hopefully this is the end of black screen with blinking wifi icon for Surface owners.
