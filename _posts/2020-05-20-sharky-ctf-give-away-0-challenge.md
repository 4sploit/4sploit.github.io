---
title: Sharky CTF Give Away 0 Pwn Challenge
author: 4sploit
date: 2020-05-21 15:00:00 +0300
categories: [tutorial]
tags: [ctf, challenges, binary exploitation]
---
In this tutorial, i am going to solve "give-away-0" challenge from Sharky CTF 2020.

[Click Here](https://github.com/sajjadium/CTFium/blob/master/SharkyCTF/2020/give_away_0/give_away_0){:target="_blank"} to download give-away-0 binary.


![]({{ "/assets/img/posts/sharky-ctf-give-away-0-pwn-challenge/1.PNG" | relative_url }})

As you can see, the binary asks us to input a string then exits.

![]({{ "/assets/img/posts/sharky-ctf-give-away-0-pwn-challenge/2.PNG" | relative_url }})

Sending 100 A's instead of some random text leads to buffer overflow.

![]({{ "/assets/img/posts/sharky-ctf-give-away-0-pwn-challenge/3.PNG" | relative_url }})

Here we launch the binary using radare2 to list the binary functions.
We notice the function **vuln**.

![]({{ "/assets/img/posts/sharky-ctf-give-away-0-pwn-challenge/4.PNG" | relative_url }})

By listing vuln function body, we notice that fgets function is vulnerable to buffer overflow,
this explains our previous buffer overflow working attempt.

![]({{ "/assets/img/posts/sharky-ctf-give-away-0-pwn-challenge/5.PNG" | relative_url }})

Here we inspect main function (which is the first function being called on program startup),
we can see vuln function call here.

![]({{ "/assets/img/posts/sharky-ctf-give-away-0-pwn-challenge/6.PNG" | relative_url }})

Here we generate a calculable pattern using pattern_create from metasploit, this enables us to
find the exact offset later on.

![]({{ "/assets/img/posts/sharky-ctf-give-away-0-pwn-challenge/7.PNG" | relative_url }})

We launch the binary using gdb, then send the pattern we previously generated as input to the binary.

![]({{ "/assets/img/posts/sharky-ctf-give-away-0-pwn-challenge/8.PNG" | relative_url }})

This is the value RIP register points at.

![]({{ "/assets/img/posts/sharky-ctf-give-away-0-pwn-challenge/9.PNG" | relative_url }})

We calculate the offset using pattern_offset tool from metasploit.  
So the offset is 40.

We use the following command to construct a payload which enables us to control RIP register:

```console
$ python -c "print('A' * 40 + 'B' * 8)" 
```

Then we send this payload as input to the binary through gdb as follows:

![]({{ "/assets/img/posts/sharky-ctf-give-away-0-pwn-challenge/10.PNG" | relative_url }})

Good, we can now replace B's with an address to jump to.

![]({{ "/assets/img/posts/sharky-ctf-give-away-0-pwn-challenge/11.PNG" | relative_url }})

Here we use checksec command to check the properties of the binary.  
We can see that NX bit is enabled so we can't inject a shellcode.

As we previously listed the binary functions using radare2, we found an interesting function
which enables us to spawn a shell, this function is called win_func.

![]({{ "/assets/img/posts/sharky-ctf-give-away-0-pwn-challenge/12.PNG" | relative_url }})

So basically this function uses execve C function to execute a binary file which
happens to be /bin/bash.

We use **win_func** function address and inject it into RIP register to make a jump to it.

Our final payload is constructed using the following command:

```console
$ (python -c "print('A'*40 + '\xa7\x06\x40\x00' + '\x00'*4)";cat) | ./give_away_0
```

![]({{ "/assets/img/posts/sharky-ctf-give-away-0-pwn-challenge/13.PNG" | relative_url }})

Great, we successfully jumped to win_func function and the shell was spawned as expected.