---
title: "The DOTS Pattern"
date: 2019-09-01T12:00:00-05:00
image: 
    url: "Rose%20of%20many%20colours"
    alt: "Roses of many colors"
    author: "Photo by Patrick Fore on Unsplash"
---

Today while I was wondering about a **question** I've been asked **several times**, decided I needed a **better way to express and organize** my overall **explanation**.

The question itself was the following:

> What are some ways that you have **ensured** that a **codebase** is well **structured and maintainable**?

Although it might sound as simple as just answering the **typical points**, I've found that it's **not enough** to repeat every time **the same thing**. I just needed a **think-once use-along** solution I could share **whenever needed**.

And that's how I came up with the **DOTS Pattern** ✨

## D(ocument) your implementations

Programming doesn't only consist of just "**making the code work**". Functioning code is just **a part of the whole development process** you are involved and whether that might satisfy your boss (or customer if you are freelancing), you should **always** consider **saving your future self** when you are asked by your actual same boss or customer on why your code **is producing X output when it should do Y**.

Also you might notice an **overall improvement** in your **code readability** because the **need to document** will **force you** to choose **easier implementations**, avoding the bad habit of **over-engineering**.

<twitter-wrapper :is="extraComponentLoader" link="https://twitter.com/compuives/status/1174982340969476096"/>

## O(rganize) yourself

But what does it mean to **organize myself**? When do I know **I'm organized enough**? It may be **hard to answer** those questions, and **even harder** try to find one **unique solution** for **all kinds of tasks**. 

There are some tips like writing down the **requirements**, create an **implementations roadmap** or even following the <a href="https://medium.com/blacklane-engineering/documentation-driven-development-8b2ff119104f" target="_blank" rel="noopener">Documentation-Driven Development</a> pattern.

However as **stated above**, there isn't a **clear answer to the question**. You just need to *do whatever you feel **most confortable** to **organize yourself***.

## T(est) everything

Make sure you fit into your **development workflow** the **testing step**, although it might feel hard to explain at a first **why** to **invest extra valuable time** on testing something that **does already work**, you may find **more** than one surpirse when indeed the implementation **does not match one of the requirements**, or even worse, **breaks something that is already working**. Although it **may not be critical** for MVPs, implementing the testing step from the beginning may allow you to **split things better**.

If you feel **unconfortable writing tests** don't worry, you might not be the only one out there, that's because <a href="https://afontcu.dev/testing-is-hard/" target="_blank" rel="noopener">testing is hard</a>.

## S(tandarize) your codebase

I know you like using **tabs**, we all **love tabs**, but seems that the project you are working on is **using spaces**. What should you do then? 

Of course the answer **is not** getting **rid of the project**, please... 🙈

It's very important when **collaborating in a project** to negotiate **standards** with the **rest of the team**. It would be **really hard** to implement, fix or document anything in a **codebase** that is using **very different** programming **tonalities**.

We are **lucky** to live in a **modern era** and some developers have **invested** their valuable **time** to help you avoid thinking about this and **focus in code**: we have **linters** and **formatters**!

But make sure they are **properly configured** and working in your **environment** before pushing a **single commit**! You can also setup some **commit hooks** to automate this.

## Summing up

So if you are now ever asked about **code maintainability** and **scalability**, what would you answer? 

> *Give me some **DOTS**!*