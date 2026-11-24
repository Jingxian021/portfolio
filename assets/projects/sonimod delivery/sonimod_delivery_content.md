\#Title: Robot Delivery Management System Design

tag: Delivery / toB / Research
Client: Sonimod
Year: 2026
Category: Case Study
Role: UIUX Design



Background

What is the system for ?
To B-side operation system, building to help Sonimod manage their restaurants, and provide automatic robot delivery to reduce operation cost. It contains Dashboard, robot management, store operations modules.

About Sonimod
An Italian restaurant chain, famous for its pizza. They decide to use automotive vehicle - robot delivery to offer their food delivery service.

Users' Needs Analysis
CEO
Hard to compare the data with market trend
Lack robot usage data to compare the profits after using it
Manager
Don’t know robot’s issue when delivery, so hard to deal with customers, resulting low customer satisfaction
Hard to track the operator, who make mistakes. Sometimes, repeated operations may happen, and cannot credit the performance
Staff
Easy to fill in wrong information in forms
Easy to forget deal with customers' feedback in time, due to busy work in store. Result in high complaints
There so many cases, we don't know the food status when reach the customer. It may have some issues but we don't know, so we need to carefully avoid it.
Kitchen Clerk
Check food status and fill in one by one, really consuming time
Easy to fill in wrong data when busy



Strategy

01 RBAC Model Design
Customizable dashboard
Role-based permissions



02 Real Time Feedback
Robot edge cases feedback
Real time robot delivery monitor



03 Issues First
Prioritize to place important issues in the first place to make them visible



Design
Dashboard Overview
We used dashboard to helps users digest data from multiple sources at a glance. We design tailored dashboards for different users based on their needs.



Staff's Focusing on specific cases
CEO's Focusing on overall data
Manager's Focusing on managing



Robot Delivery Flow
We draw the diagram to illustrate the users and robot's roles and operations in delivery. So, clarify the responsibilities, recognize the possible problems and find the opportunities.

Delivery Management
Choose the robot
To reduce the robot issue caused by low battery, we provide the instruction for users to help them choose the battery at least over 85% robot to process the task.
Choose the route
To reduce the traffic issue, we provide different routes for users to choose. If the robot meet the traffic congestion (wait over 10min), they would auto re-organize the route, and send the message back to staff and also to the customer.
Record
Record the operator and all the initial data to track. Help manager clarify the responsibility and credit the performance.



Delivery Management
Exception Handling
We also set the exception card to help users recognize the exceptions and deal with them in time. So as to reduce customers complaints.



Product
Reduce User's Cognitive Load to reduce operation mistakes
We categorize the operations as two types -
modify globally \& modify individually
(Note: “modify globally” one are the less frequently used functions)
Re-order the operations to hide those operation can be modified globally, which can be modified globally.
Only when user choose the items they appear, and can be operate by one click
Reserve the “edit” button for each item to modify separately.



Usability Test
We used Cognitive Walkthrough to test prototypes and optimized design
We set several rounds walkthrough to test the usability and optimized the design.
The FEEDBACK card on dashboard. This is important, which aims to help customers connect Sonimod in time. Also, help staff realise the problems and provide better service for their customers..
So, we want to draw users attention to the cards, but also keep visual harmonious in dashboard.
First version
Highlight the “Report” title to remind
support text and information layout is unreasonable, and text color contrast is on reverse.
Users can hardly get the useful information at first glance
Second version
Add background to draw users attention
Too obvious in whole dashboard, break the visual harmonious
Final version
Change the “Report” background, add light red to enhance but keep harmonious
Rearrange the information layout:
replace the “arrow” button with direct order number link to click, cause users are more focus on which order when report happens. More intuitive
decrease support text font size, add contrast on font size to enhance important information

The robot state cards
As on the “Robot management” page, all the cards are similar designed, and when users want to know more information, they need to hover or click, causes inefficiency in real work
Add time information making it intuitive
Add distance with numbers
Use font and color contrast to enhance vital information

Add illustration text to make it more clearly
Use icon to make it intuitive to users about the robot’s state

Add fix period and start date to make it intuitive to users
Embedded the contact information  with the person’s name. So, users can click to contact directly

