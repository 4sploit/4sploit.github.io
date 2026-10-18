---
title: 'Reading large files in Python'
description: 'Why read() blows up on huge files, and how iterators, iterables, generators and the yield keyword let you process them one line at a time.'
publishedAt: 2022-11-12
updatedAt: 2022-11-22
tags: ['Python', 'Programming', 'Files']
category: 'Programming'
---

**What will you learn?**

- Opening files
- Reading files
- Iteration
- Iterators
- Iterables
- Generators
- Yield

## How to open a file in Python?

Opening a file in Python is done by means of the built-in function **`open`**:

```python
open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
```

Let's say you have a text file named **words**, you can open it as follows:

```python
words = open("words.txt", "r")
```

where **`words`** is a file stream object and **`r`** stands for read mode.

## How to read a file in Python?

Upon opening a file, the **`open` function** returns a **file stream object**. That file stream object has methods which enable us to read the file content.

One way to open, read, then close a file is as follows:

```python
fstream = open("words.txt", "r")
content = fstream.read()
# do something with the content
print(content)
# close file
fstream.close()
```

where `content` is a string variable holding the file content in memory.

If we wish to close the file implicitly, we can do it as follows:

```python
with open("words.txt") as fstream:
    content = fstream.read()
```

where the **`with`** statement takes care of closing the file, since it knows how to deal with file streams.

## What's wrong with the above approach?

Reading a large file using the above method is problematic and will unnecessarily overflow the memory, since it attempts to load the **whole** content into memory at once — and there may never be enough room for that huge amount of data.

## So, how to get around that?

Introducing iteration, iterators, iterables, generators and the `yield` keyword…

## What is iteration?

It's the process of iterating/looping through the items in a collection (lists, dictionaries and tuples are examples of collections).

## What is an iterator?

An object representing a sequence of data which can be accessed one item at a time.

A Python iterator follows **the iterator protocol**, so it implements and exposes a **`__next__()`** method which returns the next element of an **iterable** object.

It's also important to note that iterators are how Python (the PVM) is able to iterate through a collection such as a list (e.g. in a `for … in` statement). In other words, under the hood, a `for … in` loop makes use of the collection's iterator to walk through its items.

## What is an iterable?

Any object which implements the **`__iter__`** function is called an iterable. That function returns an **iterator**.

Lists, dictionaries and tuples in Python are examples of iterables, since they implement that function:

```python
>>> numbers = [1,2,3]
>>> numbers_iter = numbers.__iter__()
>>> numbers_iter.__next__()
1
>>> numbers_iter.__next__()
2
>>> numbers_iter.__next__()
3
>>> numbers_iter.__next__()
Traceback (most recent call last):
  File "<pyshell#31>", line 1, in <module>
    numbers_iter.__next__()
StopIteration
```

Notice that the iterator raises a **`StopIteration`** exception when there are no remaining values.

## What is a generator?

A special type of iterator where a sequence of data is lazily loaded into memory, one item at a time. This makes it perfect for reading large amounts of data.

Looking at the generator definition:

```python
class Generator(Iterator[_T_co], Generic[_T_co, _T_contra, _V_co]):
    def __next__(self) -> _T_co: ...
    @abstractmethod
    def send(self, __value: _T_contra) -> _T_co: ...
    @overload
    @abstractmethod
    def throw(
        self, __typ: Type[BaseException], __val: BaseException | object = ..., __tb: TracebackType | None = ...
    ) -> _T_co: ...
    @overload
    @abstractmethod
    def throw(self, __typ: BaseException, __val: None = ..., __tb: TracebackType | None = ...) -> _T_co: ...
    def close(self) -> None: ...
    def __iter__(self) -> Generator[_T_co, _T_contra, _V_co]: ...
```

It can be understood from the above definition that a generator is an **iterator** as well as an **iterable**.

## What is the `yield` keyword?

This keyword is used to **return** a generator from generator functions. In other words, what makes a function a generator function is the presence of `yield` in the function body.

What's special about `yield` is its ability to **suspend** the generator function's execution and **return** the **yielded value** to the caller. Meanwhile, the **function state** and other details are saved for the **next hit**.

## Putting the pieces together

Let's suppose we have a text file named **words**. This file contains random words separated by newlines, and we want to find the **longest** word and print it out. Let's also suppose that the file size is **100 MB**.

This is how it can be done:

```python title="longest_word.py"
# this generator function returns a generator in each yield hit
def read_words(filename):
    file = open(filename, "r")
    for line in file:
        yield line
    # the file won't close automatically since
    # we don't use with statement thus we need to explicitly close it
    file.close()

def find_max_word() -> str:
    max_word_len = 0
    max_word = None
    # since the generator function returns a generator
    # and the generator is a special type of iterator
    # we can simply iterate over it using for .. in
    for yielded_word in read_words("words.txt"):
        # remove newline and line break characters
        word = yielded_word.strip()
        len_of_word = len(word)
        if len_of_word > max_word_len:
            max_word = word
            max_word_len = len_of_word
    return max_word

max_word = find_max_word()
print(max_word)
```

where **`read_words`** is the generator function.
