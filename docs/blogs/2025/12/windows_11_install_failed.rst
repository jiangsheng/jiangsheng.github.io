.. meta::
   :description: this blog post describes a problem I fixed while install Windows 11 (windows 11 install failed ) and 10 （Windows could not prepare the computer to boot into the next phase of installation）.
    :keywords: Windows 11 installation, Windows 10 installation

Windows 11: install failed, windows 10: Windows could not prepare the computer to boot into the next phase of installation
============================================================================================================================================================

.. post:: 21 Dec, 2025
   :tags: Windows installation 
   :category: Microsoft
   :author: me
   :nocomments:

When I was trying to install Windows 11 on my spare computer that used to run out-of-support Windows 10. After backing up data and deleting all partitions on the disk in Windows RE, I encountered an error message that read "Windows 11 install failed." It doesn't give much information about what went wrong. 

I then tried again with another install media created by Rufus to check if the issue was with the installation media. However, the problem persisted.

Since the machine is not officially supported by Windows 11, errors are to be expected. I then decided to roll back to Windows 10, however the Windows 10 installer now errors up on me, reporting "Windows could not prepare the computer to boot into the next phase of installation".

As I am installing to unallocated space on a disk, the MBR/GPT partition type should not have a play here, as the partition should be created by the installer. I double checked the secure boot option in the BIOS and it matches the options I set in Rufus. 

I remember when inside Windows RE disk, the drive letters are messed up, the second disk's partition 0 became the C: drive, and the first disk's partition 0 became the D: drive. I had to manually reassign the drive letter each time I boot into Windows RE. Perhaps the installer is having trouble with the drive letters as well.

I unplugged the SATA cables for the second, third and fourth disks, and tried to install Windows 10 again. The installer was able to proceed without any issues. It seems that the drive letter assignment was indeed the cause of the problem.

After Windows 10 was installed, I decided to give Windows 11 another shot. To avoid the drive letter issue, I left the additional disks unplugged during the installation process. This time, the installation was successful. I then reconnected the second, third and fourth disks, and the drive letter assignment was back to normal. Now everything worked fine.

I have seen removable devices like printers failing Windows installation, but this is the first time I encountered a drive letter issue causing Windows installation to fail. I hope my experience can help someone else.



