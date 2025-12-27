Counting and Deleting Emails by Sender In Outlook
==========================================================

.. post:: 23 Dec, 2025
   :tags: Outlook, MAPI, Gmail
   :category: Microsoft, internet
   :author: me
   :nocomments:

You can download the code and binary at https://github.com/jiangsheng/OutlookSenderStatistics/releases .

My Google Drive is getting full. While I am cleaning up large attachments in Gmail, I notice the storage usage did not decrease but actually increased. I am getting more emails everyday. So I decided to write a program to see who's sending me the most email and delete some old mails.

Getting mail info off Google is not an easy task. There's a script https://github.com/GirardT/gmail-analysis with a limitation of 1k max emails per inbox. There's another `Google Apps Script <https://stackoverflow.com/questions/59216693/count-number-of-gmail-emails-per-sender>`_ but the engine itself has `various limitations <https://developers.google.com/apps-script/guides/services/quotas>`_. And there's Nirsoft's `OutlookStatView <https://www.nirsoft.net/utils/outlook_statistics.html>`_\ , but as the name suggests, it is for viewing only and cannot be extended to delete emails.

To solve this problem I decide to use my Office automation skills. First I added Nuget packages Microsoft.Office.Interop.Outlook and MicrosoftOfficeCore. Then I used GetActiveObject from oleaut32.dll to get the Outlook application object. From the application object I can access its MAPI namespace and get its top level folders, those are account folders. For each account folder, I can access its subfolders whose default item type is olMailItem, those are the mail folders in the account. For each folder, I can access its items to see if the item support the  MailItem interface, those are the emails in the folder. Once I got the mail item, I can then sum up the number of emails for each sender and store the result in a dictionary. Finally, I print out the dictionary a csv file, sort by the number of emails I received.

The first problem I encountered is that halfway through my gmail's inbox, Outlook reports an Out Of Memory error. This is obviously caused by the runtime callable wrapper (RCW) `not able to release the COM object in time <https://devblogs.microsoft.com/visualstudio/marshal-releasecomobject-considered-dangerous/>`_. To solve this problem, I use Marshal.ReleaseComObject to release the COM object as soon as possible.

The second problem I encountered is that on the second run, the Outlook application object is not available, despite I just launched it. Microsoft seems to changed the behavior of the Running Object Table (ROT) registration from the old age. It claims to `register objects after losing focus <https://support.microsoft.com/en-us/topic/getobject-or-getactiveobject-cannot-find-a-running-office-application-6cdf21a3-ac90-512b-6bff-badc5f4cc215>`_ but apparently haven't done so. I don't really want to open and close Outlook every time I run the program, so I added a warning when Outlook cannot be accessed, and the user should just wait for the program to register the application object to the ROT.

The third problem I encountered is that I have some mail folders with duplicate names and have to switch to use EntryID instead of folder name to find the right folder. How did I create two folder with the same name on Hotmail? I don't remember. But anyway, EntryID is unique so it works.

After getting the results, I figured since I have a program scanning all my emails, I might as well delete some old emails with the code I have. It is a matter of calling Delete once I figure out if the file is deletable. So I added a delete function to delete emails older than a certain date from a certain sender, and optionally preserve smaller emails. This time I have to be careful to avoid deleting important emails, so I let the user to input the sender's email address, one per line, to be deleted. It is expected that the user searched through the email provider to make sure the sender is not important before running the delete function. I have added the message that the deleted mails are in the DeletedItems folder, in case someone really messed up.

This program helps me to free up 2GB of my Google Drive storage. My next target would be to find a way to delete all but one similar images from Google Photos. I am a bad camera man, so I usually take a lot of pictures hoping to yield a good one. But often I forgot those not so good ones are also backed up to Google Photos. It would mean a lot of work, but the reward would be much higher than the emails. Cleaning up Gmail is just a low hanging fruit.