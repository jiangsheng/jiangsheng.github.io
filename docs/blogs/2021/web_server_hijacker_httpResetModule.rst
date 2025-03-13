New web server hijacker HttpResetModule.dll
=============================================
.. index:: pair: HttpResetModule; IIS

Today a friend’s server was hacked. The web site displays normally if visited directly. The content is highjacked when visit from a Baidu Search result, similar to what user 41nbow experienced at https://www.freebuf.com/articles/web/222060.html.

A file system wide search for recent changed files shows that %windir%\system32\inetsrv\config\applicationHost.config file was recently updated. New entries were added to the end of the <globalModules> section. Despite their location being C:\Windows\Microsoft.NET\Framework\v2.0.50727 and C:\Windows\Microsoft.NET\Framework64\v2.0.50727, they bear no Microsoft signature nor any other version information. Also, the file name HttpResetModule is suspicious, why a web server want do reset a connection?

Removing the modules from IIS manager stopped the hijack, but how they are dropped there need further investigation. There is also a C:\Program Files (x86)\Google\svchost.exe that claims to be a 360 Safeguard executable, which is obviously an imposter.

When I began writing only 2 providers flagged the ISAPI module files as malicious on VirusTotal. When I finished writing, 2 more providers flagged them as malicious. That was quick.

https://www.virustotal.com/gui/file/1443a0adbc38ff4bf7dcb04ae8e138b538389b9e55610bd892eacd4236296674

https://www.virustotal.com/gui/file/53454d7d7c80c0f2443c665380bf903a84c1a89e4b11c422b465e01234cdf386