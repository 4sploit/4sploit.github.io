---
title: RPISEC Crackme Challenges
author: 4sploit
date: 2020-05-18 03:00:00 +0300
categories: [tutorial]
tags: [crackme, challenges, reverse engineering]
---
In this tutorial, i am going to solve crackme challenges from RPISEC.

## crackme0x00a

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00a/1.PNG" | relative_url }})

As you can see, we're required to enter a correct password for the success message to be displayed.

We launch the binary using edb debugger and then press run once to point to main function:\
![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00a/2.PNG" | relative_url }})

We notice c functions such as printf, scanf, strcmp.\
We're concerned about the code section following scanf function call,
Since scanf function reads the data we input from keyboard, in our case it's
the password, following that is the logic concerning the inputted password.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00a/3.PNG" | relative_url }})

Here we notice strcmp function and the string "g00dJ0B!".\
We can see that both the inputted password and "g00dJ0B!" string are being loaded
into the stack as arguments to strcmp function which basically compares between
2 given strings. 

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00a/4.PNG" | relative_url }})

Here we set a breakpoint on "g00dJ0B!" mov instruction and then we type it as the password.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00a/5.PNG" | relative_url }})

Excellent, we successfully reached success message by entering the correct password g00dJ0B!.




## crackme0x00b


![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00b/1.PNG" | relative_url }})

We execute the binary and type a random password.

We launch the binary using edb debugger and then press run once to point to main function:\
![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00b/2.PNG" | relative_url }})

As with the previous crackme challenge, here we can also notice c functions such as printf, scanf, etc..\
We notice wcscmp function which compares between 2 given strings, it expects wide strings unlike strcmp function.


![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00b/3.PNG" | relative_url }})

Here We set a breakpoint right after scanf function.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00b/4.PNG" | relative_url }})

We run the binary and notice the triggered breakpoint.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00b/5.PNG" | relative_url }})

We step forward twice to load our inputted string into the stack (lea and mov instructions)

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00b/6.PNG" | relative_url }})

Here, EAX register holds the address of our inputted value, we right click on it then choose "Follow In Stack"
option.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00b/7.PNG" | relative_url }})

As you can see, this is how our inputted value looks like in the stack.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00b/8.PNG" | relative_url }})

We notce "mov dword [esp], 0x804a040" instruction which loads the other string (the correct password)
into the stack.\
So wcscmp functions expects our inputted value and the correct password as arguments, compares them, if there's a match, it outputs
success message.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00b/9.PNG" | relative_url }})

We right click on it then choose "Follow Constant In Stack" to display the correct password's value.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00b/10.PNG" | relative_url }})

Great, so the correct password is w0wgreat.

We run the binary then type the password we found as follows:
![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x00b/11.PNG" | relative_url }})

Excellent, we successfully reached success message by entering the correct password w0wgreat.




## crackme0x01


![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x01/1.PNG" | relative_url }})

We execute the binary and type a random password.

We launch the binary using edb debugger and then press run once to point to main function:\
![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x01/2.PNG" | relative_url }})

Same as previous challenges with the exception of comparison mechanism.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x01/3.PNG" | relative_url }})

The comparison here is done using cmp instruction instead of c function as we saw in the previous challenges.\
Our inputted password is being loaded directly from the stack without using registers, the other operand
is 0x149a which is the correct password in hexadecimal representation.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x01/4.PNG" | relative_url }})

Here we convert the correct password 149a from hexadecimal to decimal value which is 5274.

We run the binary then type 5274 as the password as follows:\
![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x01/5.PNG" | relative_url }})

Excellent, we successfully reached success message by entering the correct password 5274.




## crackme0x02

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x02/1.PNG" | relative_url }})

We execute the binary and type a random password.

We launch the binary using edb debugger and then press run once to point to main function:\
![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x02/2.PNG" | relative_url }})

Same as previous challenges with the exception of comparison mechanism.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x02/3.PNG" | relative_url }})

We set a breakpoint right after scanf function call, run it, then notice the triggered breakpoint.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x02/4.PNG" | relative_url }})

We step forward until we reach the comparison instruction cmp eax, [ebp-0xc].\
The comparison here is done using cmp directly as the previous challenge, the difference here
is that eax holds our inputted password and the correct password is being loaded from the stack.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x02/5.PNG" | relative_url }})

We notice the highlighted value 52b24 in the stack which is located at ebp-0xc address.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x02/6.PNG" | relative_url }})

We convert it to decimal as the previous challenge, the decimal value is 338724.

We run the binary then type 338724 as the password as follows:\
![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x02/7.PNG" | relative_url }})

Excellent, we successfully reached success message by entering the correct password 338724.




## crackme0x03

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x03/1.PNG" | relative_url }})

We execute the binary and type a random password.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x03/2.PNG" | relative_url }})

We notice that the comparison is not present in the current function (main),
instead, a call to test function is present, since test function is not a built in C function,
we need to step into it in order to reach the comparison instruction.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x03/3.PNG" | relative_url }})

We set a breakpoint on test function then run the binary.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x03/4.PNG" | relative_url }})

By stepping into test function we can inspect the function body as seen in the above figure.\
Fortunately we found the comparison cmp instruction.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x03/5.PNG" | relative_url }})

We step forward until we reach the instruction je 0x804848a as shown in the above figure.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x03/6.PNG" | relative_url }})

Since the correct password is stored at ebp+0xc, we follow the shown address in the stack.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x03/7.PNG" | relative_url }})

We calculate the correct address of the password (ebp+0xc).

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x03/8.PNG" | relative_url }})

We notice the highlighted value which happens to be the correct password in hex (52b24).\
We already converted it in the previous challenge, the password is 338724.

We run the binary then type 338724 as the password as follows:\
![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x03/10.PNG" | relative_url }})

Excellent, we successfully reached success message by entering the correct password 5274.




## crackme0x04

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x04/1.PNG" | relative_url }})

We execute the binary and type a random password.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x04/2.PNG" | relative_url }})

We notice check function which happens to have the comparison instruction.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x04/3.PNG" | relative_url }})

We set a breakpoint on check function call then run the binary.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x04/4.PNG" | relative_url }})

By stepping into check function we can see the function's body.\
Initially, the function uses C builtin strlen function which calculates the length of given string,
in our case, the length of our inputted password.\
For instance, if we type test as the password, strlen returns 4.\


![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x04/5.PNG" | relative_url }})

We notice the comparison instruction cmp dword [ebp-8], 0xf\
So Basically, The password length must at least be 15 (f hex is 15 decimal) in order to reach success message.

We run the binary then type any 15 digits password as follows:\
![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x04/6.PNG" | relative_url }})




## crackme0x05

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x05/1.PNG" | relative_url }})

We execute the binary and type a random password.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x05/2.PNG" | relative_url }})

As crackme0x04 challenge, we're encountered with check function.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x05/3.PNG" | relative_url }})

We set a breakpoint on check function call then run the binary.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x05/4.PNG" | relative_url }})

We stepped into check function.\
Briefly, the function sums the digits then expects the sum to be equal to 10 hex (16 decimal).\
Example of correct passwords can be 961, 664.

In case a correct password is entered, the check function calls parell function.

We step into parell function as follows:\
![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x05/6.PNG" | relative_url }})

We notice and eax, 1 instruction which indicates that the inputted password must be even.

In short, the password must meet the following conditions:

1. the sum of digits must be 16.
2. the password itself must be even.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x05/7.PNG" | relative_url }})




## crackme0x06

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/1.PNG" | relative_url }})

We execute the binary and type a random password.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/2.PNG" | relative_url }})

Again, we're encountered with check function.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/3.PNG" | relative_url }})

We set a breakpoint on check function call then run the binary.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/4.PNG" | relative_url }})

We stepped into check function.\
As previous challenge, both conditions must be met.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/5.PNG" | relative_url }})

We restart then use 664 as the password.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/6.PNG" | relative_url }})

We notice the parell function which is reached when we meet both conditions, we step into it.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/7.PNG" | relative_url }})

In order to reach success message we need to meet an additional condition in dummy function.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/8.PNG" | relative_url }})

We set a breakpoint on dummy function.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/9.PNG" | relative_url }})

We notice strncmp function which compares between 2 given functions up to n characters.\
We step forward until strncmp instruction.

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/10.PNG" | relative_url }})

We notice ESP register, it holds the address of strncmp arguments in the stack

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/11.PNG" | relative_url }})

We can conclude here that the function searches for LOL in environment variables (env).

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/12.PNG" | relative_url }})

Here we add LOL in environment variables list since it doesn't exist there to meet the final condition

![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/13.PNG" | relative_url }})

Here we are met with a final condtion, the password must end with 0 digit

We type  6730 as password since it meets all conditions as follows:
![main function]({{ "/assets/img/posts/rpisec-Crackme-Challenges/crackme0x06/14.PNG" | relative_url }})




## crackme0x07

Same solution as crackme0x06, the only difference is the symbol information.