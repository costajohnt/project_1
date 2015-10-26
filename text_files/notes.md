10/26

Ok so lets just have this be like a running stream of conscienceness with everything about the project that is going on in your head right now and then we can look at all of that data and try to organize it on trello and in pseudocode.

<SESSION, DATABASE, SCHEMA RELATIONSHIP ISH>
I think I have all of my session and auth stuff setup but I got a lot of help with it and I'm not sure if I totally understand everything.  Pay attention and take notes at today's breakout on the topic so we can ensure understanding and use it in our app.

In terms of sessions and auth, the reason I needed to set up rider authentication in the first place was so I could assign jobs to riders and remove them from the queue and have the database know that the job is no longer available so that it can only be assigned to one rider at a time.  I drew out a sketchy put route in my server.js to do just that.  It work's by updating the referenced rider attribute in the job schema from nothing to the rider.  Maybe I can make a function that says something like if rider attribute of job = null, job is available, else, job is taken.  

Does the database need to know if a job is in myjobs or completedjobs?  Probably because we want the timer to stop running once it gets sent to competed jobs.

Make it so when a rider logs out, there jobs are autotically deleted from the database, or maybe instead of that, they are just cleared from completedjobs on the client side, but we could still access them from the backend if we need to.

<COURIER PAGE DATA DISPLAY STUFF>
	<QUEUE>
I want to set it up so that on the courier page, in the queue, jobs display customer address and timer only, but if you click the link it either:  
	a. renders a page with all the information about the job object.
	b. you can scroll over it and hold for a tooltip to popout with all of the information
	c. tapping on the line item expands it into a form table display with all of the information.
I think I like option c the best so look up how to do that.

line items in the queue should have a button on the far left to claim the job (use a cool glyficon or something as a button).  Information and buttons should be displayed better

I think I also want to add a delete button to jobs in my queue in case they were created by mistake.  This brings up a bunch more issues like auth and stuff like that.  Ideally, I would have a seperate model for dispathers and authorize them to do anything that riders can do, plus give them the ability to both create and delete jobs from the database.  Right now, there is no auth needed to create jobs and no way to delete them.
	<MYJOBS>
jobs in myjobs should be displayed the same way except that the class changes to claim and the button changes to complete.  When clicked it appends the job to the completed section.  That already works on the client side but we need to let the database know what is going down.  I also want to update the job at this point to be displayed with a second button on the left side that says drop, which, when clicked, sends the job back to the queue.  Do I need a put route to do that?  Can I just add a button somehow on the ejs side?  I'm not sure this is a weird one.
	<COMPLETEDJOBS>
When jobs are sent to mycompletedjobs, I guess I either want to remove the button all together, or maybe make it into an oops button that can send the job back to myjobs?  That way we can send jobs completely both up and down the chain.

<STYLING>
We really need to work on this in general, the pages are looking wonky, especially the courier page which is going to need the most work done to it by far.

<EXTERNAL API>
I really want to incorporate the google api.  I want to set it up so that when a rider clicks on a header (queue, and myjobs), the view changes from a list of addresses to a small google map on the same page with pins in each address.  Ideally, we could click on a pin to see all of the other information about that job.  I dont even know if that is possible.  It would also be a super dope stretch to make it so we can automatically route biking directions between the base, the delivery addresses, and base again based on the amoount of time remaining on the order and the most efficient route in terms of distance and topography.