# Title: Note Editor SaaS Design

Tag: SaaS | toC

Year: 2025

Client: Kspark

Category: Tool

Role: UIUX

Team: Jesse / Alex / William



### About

This is a **multifunction SaaS application, including note editor, md docs, and whiteboard**. It aims to assist college students and professors’ research and study work. The using scenario will be in the lectures and tutorials to take notes, in the discussions to discuss, and in the study \& research session to review notes.



### Competitors

Direct competitor



(Good Notes)

whiteboard

pdf annotation

project planning

handwritten note taking

across platform



Collaboration faced, 

hand written based



Subscription Model

Paid Templates



35% - 45%



(Notability)

study material

handwritten note taking

audio transcript

collaboration

across platform



Study faced, 

hand written based



Subscription Model



10%



Possible Competitors

(OneNote)

Text note taking

annotation

collaboration

audio

across platform



Study faced, 

text based



windows native for free



16% - 20%



conclusion:

1. we need to create different value of product
2. academic scenario has huge potential



##### Online Ethnography

I‘ve done the Online Ethnography to find some feedback from our competitors’ real users. The results showed some problems as below



##### Product Positioning



### User Research

Wrapped up all the information that collected from the research, we concluded the users’ need.

##### Pain Points

scenario 1 Taking Notes

**Hard to record** all the information, when listening the lectures

scenario 2 Reviewing Notes

Lot of content, **difficult to review \& check**

Hard to find **specific content**

**Manage files** burns me out

scenario 3 Writing Papers

**Formulas are difficult to use** directly from handwritten notes

Difficult to text formulas in



##### Needs

1. Speedy note-taking to follow classes.
2. Use it as freely as paper writing.
3. File management \& Content search
4. Making use of notes efficiently \& directly

&#x09;A. Reviewing notes

&#x09;     B. Using Formulas



credit: with product team



### SWOT

##### Analysis

Strength

Based on Sunia’s strength - research in chemistry \& math, fluent technology in OCR, our strength is academic professional assistant tool with strong dataset.

Weakness

Sunia used to be a 2B faced company, lack of brand awareness in 2C market. Besides, competitors have already well-known in this area and owned loyal users.

Opportunity

Entering the market from one aspect we are skillful at, such as academic dataset 

Threat

bloom of AI reduce the value of hand-written tool market.  How could we make use of AI to strength the value of our products is important.



##### Possible Idea

Focused on academic area to maximize the strength

Collaborate with colleges to promote products



credit: with product team



### Opportunity \& Strategy

##### How Might We

1. How Might We:  help user to speed up their note-taking accurately \& usefully?
2. How Might We: adapt both left \& right hand users?
3. How Might We: help user to efficiently manage files \& improve searchability?
4. How Might We: help user improve efficiency?



##### Strategy

1. Use **Voice recording** \& **AI assistant** to help user speed up note-taking and improve efficiency
2. Design **Customizable** \& **movable toolbar** to make it adaptive to different users
3. Designed **Multi-structured file system** to help user efficiently and easily manage their files
4. Use **Smart OCR** to enhance hand-written formulas



### Solution 1

How might we **help user to speed up their note-taking accurately and usefully?**

* Added “**Voice Recording**” , helping users directly translate the voice into text notes. 
* We also used **voice to call the AI assistant**, free users’ hands to improve efficiency.



**How to increasing reliability** \& **reducing cognitive load?**

* font weight to illustrate content confidence
* icons to show source



### What we have done for the edge cases?

1. over capacity to record
when it reaches the capacity, it will automatically open a new record. Pop-up to inform user. It solve the interruption of clicking to open a new one.
with the device vibrates to notify users, in case of users don’t view at screen
2. Background noise
self-supervised and self recognized to modify and use “lines” and “signals” to tag the location to tell users what happened.
If sound exceeds 60–65 dB 
(or when the noise level matches the voice level,  or when noise is louder than the speech) 
show user it cannot be recognized and advice user change to a more quiet environment
3. Voice function calling confliction

only allow recording when it’s recording, auto shut down the other voice calling functions. Give users the instruction to inform them other functions will be closed when recording

4\. When user need write

Voice recording is just a way to support. Of course we set another mode to allow users writing and the recording will work in behind to finally give users the script.



### Solution 2

How might we **adapt both left and right hand users?**

We set the toolbar **movable** and this can adapt all the preferred users. Make the interface clear and adaptable



**We designed the gestures for touch screen, making it easy to use and also match users' mindset**

One finger press the  toolbar (500ms) to activate it to move

Two fingers press (500ms) toolbar to call out the hidden menu to customize the functions showed in toolbar

Two fingers to rotate the canvas

One finger twice click the screen to withdraw content

Two fingers twice click the screen to cancel the withdraw

Two fingers pinch on screen to shrink the canvas

Two fingers slide on screen to enlarge the canvas



Design Coach Mark for new users



Collaborated with other designers



### Solution 3

How might we **help users efficiently manage files \& improve searchability?**

* We designed collection bar to deliver different options, it creates an **efficient** \& **manageable homepage**. 
* We also visually presented the files hierarchy to **reduce the users cognitive load** and improve work efficiency



We designed folders \& files that can be organized in order. So that users can easily manage their files.



**In file management**

In the file, we also allow users to change single page order for better sequence.



**In file links**

It allows users embed files. This helps to **categorize** and **manage files clearly**.

Two fingers press (500ms) anywhere blank on the screen (in file) to call the menu to insert files.



**In file search**

We designed the search function embedded, helping users to easily locate specific content. Except highlighting the key words, we added the **location image** as a support to find content.



### Solution 4

How might we **help user improve efficiency?**

We added **OCR** **function** in the toolkit, and it appeared immediately when pinching, easy to find but cost no more space. This helps users translate their notes or scriptures into standard formation, and can be used into formal essays directly. It hugely **reduce the working** and **rewriting** **time**.



### Design System

Improve work efficiency for 75%, helpful to across-platform design, adaptive for different theme

##### Design Tokens



##### Icons

We use the 24 X 24 px as the base, allowing dev team to scale easily to match across platform and responsive design.





\###colors used:

1. section bg: #F8F8F8 / #EBF9FE / #ECFEFC / #F5F5F5
2. card bg: #EBF9FE / #FFFFFF / #ECFEFC / #F8F8F8 / #FFF1F0 / #EBF7FF / #F0F9FF



\### section title layout and style:

display: inline-flex;

padding: 25.6px;

justify-content: center;

align-items: center;

gap: 25.6px;

border-radius: 28px;

background: rgba(219, 219, 219, 0.20);

backdrop-filter: blur(7.111111640930176px);



