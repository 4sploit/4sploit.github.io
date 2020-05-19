---
title: SecTalks Brisbane CTF Cracknet Challenge
author: 4sploit
date: 2020-05-19 10:30:00 +0300
categories: [tutorial]
tags: [ctf, challenges, reverse engineering, dotnet, dnspy]
---
In this tutorial, i am going to solve "cracknet" challenge from SecTalks Brisbane CTF 2017.

[Click Here](https://github.com/codingo/cracknet/blob/master/ctf.sectalks_bne.crackme/bin/Debug/cracknet.exe){:target="_blank"} to download cracknet.exe.

![]({{ "/assets/img/posts/sectalks-brisbane-ctf-cracknet-crackme-challenge/1.PNG" | relative_url }})

As we can see, the application prompts us to input a password, it also gives us 5 password guesses.

Since we're dealing with a .NET application, we can use dnspy to decompile it.  
We launch the application using dnspy as follows:  
![]({{ "/assets/img/posts/sectalks-brisbane-ctf-cracknet-crackme-challenge/2.PNG" | relative_url }})

Next, we select Program Class in ctf.sectalks_bne.crackme assembly as follows:  
![]({{ "/assets/img/posts/sectalks-brisbane-ctf-cracknet-crackme-challenge/3.PNG" | relative_url }})

In C# (as the case with other programming languages), the starting function is called Main,
this function is called by the operating system on program startup, since we're dealing
with OOP language, Main is a method since it's a part of a class.

We notice that main method contains the logic of retrieving the flag, so inspecting other
classes such as Crypt is not needed.

In order to output the flag, we need to enter a password equivalent to the decrypted string in value variable,
and we have 5 guesses to do so.

flag2 boolean variable indicates whether our password is equivalent to the decrypted string or not.

![]({{ "/assets/img/posts/sectalks-brisbane-ctf-cracknet-crackme-challenge/4.PNG" | relative_url }})

Here we notice the highlighted statement where the application outputs the correct flag to the screen.

![]({{ "/assets/img/posts/sectalks-brisbane-ctf-cracknet-crackme-challenge/5.PNG" | relative_url }})

Since dnspy allows us to modify the decompiled code, we right click on Main method and then click on Edit Method
option


![]({{ "/assets/img/posts/sectalks-brisbane-ctf-cracknet-crackme-challenge/6.PNG" | relative_url }})

This is how edit mode looks like.

![]({{ "/assets/img/posts/sectalks-brisbane-ctf-cracknet-crackme-challenge/7.PNG" | relative_url }})

Here we comment the unneeded logic and only keep the flag output statement with Console.Read() statement
which enables us to exit the console application on key press.

We then click Compile button to compile the modified code.

![]({{ "/assets/img/posts/sectalks-brisbane-ctf-cracknet-crackme-challenge/8.PNG" | relative_url }})

Here we click on Save All... option to export the modified application.

![]({{ "/assets/img/posts/sectalks-brisbane-ctf-cracknet-crackme-challenge/9.PNG" | relative_url }})

We add the postfix _cracked to export a modified executable console application instead of changing the existing one.

![]({{ "/assets/img/posts/sectalks-brisbane-ctf-cracknet-crackme-challenge/10.PNG" | relative_url }})

Excellent, we execute cracknet_cracked.exe and we can see the correct flag is being displayed on screen.