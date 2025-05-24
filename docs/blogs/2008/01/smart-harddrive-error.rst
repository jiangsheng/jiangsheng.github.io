.. meta::
   :description: In case anyone is googling this message

Smart harddrive error
=====================
.. post:: 9, Jan, 2008
   :category: Computers and Internet
   :author: me
   :nocomments:

In case anyone is googling this message

   Hard Drive SELF MONITOR SYSTEM has reported that a parameter
   has exceed its normal operating range

   Dell recommends that you back up your data regularly

   Press F1 to continue, Press F2 to enter setup

After running event log viewer and look for warning messages. I have
several messages looked like this

   C:Program FilesMicrosoft Windows OneCare LiveDatabaseWinSS_st.edb (3612) C:Program FilesMicrosoft Windows OneCare LiveDatabaseWinSS_st.edb: A request to read from the file "C:Program FilesMicrosoft Windows OneCare LiveDatabaseWinSS_st.edb" at offset 180224 (0x000000000002c000) for 4096 (0x00001000) bytes succeeded, but took an abnormally long time (60 seconds) to be serviced by the OS. In addition, 0 other I/O requests to this file have also taken an abnormally long time to be serviced since the last message regarding this problem was posted 0 seconds ago. This problem is likely due to faulty hardware. Please contact your hardware vendor for further assistance diagnosing the problem.
   msnmsgr (2980) \.C:UsersjiangshengAppDataLocalMicrosoftMessenger<windows live id>SharingMetadataWorkingdatabase_8E6C_5899_6C58_7E41dfsr.db: A request to write to the file "\.C:UsersjiangshengAppDataLocalMicrosoftMessenger<windows live id>SharingMetadataWorkingdatabase_8E6C_5899_6C58_7E41fsr.log" at offset 19456 (0x0000000000004c00) for 512 (0x00000200) bytes succeeded, but took an abnormally long time (75 seconds) to be serviced by the OS. This problem is likely due to faulty hardware. Please contact your hardware vendor for further assistance diagnosing the problem.

The reaction is obvious: contact Dell Customer
Support.

Thankfully, I have daily incremental backup and weekly
full system backup, but my daily has been
failing. So I will lose a week's data, not a big deal.

