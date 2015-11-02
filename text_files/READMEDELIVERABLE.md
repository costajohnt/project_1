DESCRIPTION:  
Dispatchers suck.  They are not out in the mean streets.  They dont know the challenges courier's face each day, and they don't know the city nearly as well.  So why do dispatchers control how couriers will be routed?  This application puts the responsibility for routing back in the hands of couriers.  Instead of incoming jobs getting grouped and sorted by dispatchers, jobs are sent to a queue that all couriers have access to.  Couriers can pick up the jobs that they want and be able to choose their own routes.  They also have access to a central job management system, where they can see not only what jobs are available, but what jobs they are currently working on, and the ones they have already completed.  #messlife is a useful tool that empowers couriers and removes the need for dispatchers.

TRELLO:
https://trello.com/b/APTj7WKG/project-1

WIREFRAMES:
![alt tag](http://imgur.com/a19LHqc}
![alt tag](http://imgur.com/0dbjOVk}
![alt tag](http://imgur.com/xcgCOla}
![alt tag](http://imgur.com/lX4RgAm}

HEROKU:
http://enigmatic-fortress-5742.herokuapp.com/

USER STORIES: 
1.  This project is assuming that I am delivering goods from a single location, and I have multiple couriers completing jobs.  In this scenario, the dispatcher is tasked with grouping deliveries and routing couriers.  The drawbacks of this is that it is time consuming and dispatchers do not know the streets as well as couriers so they often suggest groupings and routes that are not optimal and end up taking more time and costing the business money, and the couriers as well.  It makes more sense to have the couriers choose the job groupings and this app will allow them to do just that.
2.  As a dispatcher,  I want to be able to add jobs to a queue as they come in with all of the information the courier needs to be able to complete the job.  Ideally, I would like to automatically parse information from online orders (from eat24, seamless, or grub hub) directly into the queue aswell.
3.  As a courier, I want to be able to see all of the jobs currently in the queue and be able to pick and choose jobs based on their delivery deadline and location.  I want to be able to group jobs effectively, see all of the information about the job easily, and ideally be able to see the dropoff locations on a map (connect to google api).  I want to be able to checkoff completed jobs and add them to a list of completed jobs at the bottom of the page.  STRETCH-I want couriers to be able to leave comments about the job, like if the person made them wait or they did not tip well.  I want couriers to be able to have a checkout function, where it adds up all of the delivery fees and tips for the completed jobs and returns a total payout to the courier.

APIs USED:
Express API
Google Maps API (working on it not sure if it will be included in final project)

LIBRARIES USED:
jquery
ajax

WISHLIST/FUTURE DEV:
1.  I would like to be able to display the addresses of jobs on a map and allow users to click on markers, popout the job information in the marker, and have a button to allow users to accept a job or mark it as completed from the map marker.  I've started working on this and right now I can link to a map.  I'm working on geocoding the address information into lat/long so that I can add them as markers on a map.  This part of the project will take some time.

2.  I'd like to create a countdown attribute for jobs that can be set by the job creator.  For example, when a job is created, the creator can enter number of minutes in a field, and that time would count down to zero so that couriers can manage delivery expectations and ensure that jobs are arriving within the agreed to time frame.

3. Right now, jobs can only be created manually, but I would like the app to be able to connect to API's of online food ordering sites like grubhub, eat24 and seamless.  When jobs are created by users through these portals, the jobs are automatically parsed into the queue of my app and accessible to couriers.

4.  I would like to work on the functionality and authorization stuff in my app.  I want dispatchers to be able to sign in and have access to anything on the site, I would like to limit courier access to only being able to accept and complete jobs in the queue or my jobs.  Dispatchers can create new jobs and delete them but not couriers.  I need to it be more clear about when a user is signed in and make sure that users not signed in cannot manipulate the application.

5.  I want to be able to automatically add up everything in completed jobs and create a report when a courier signs out, so that they can see the total amount they have made in tips, and commissions.  They can also see the total amount for all of the packages they have delivered that day, and also they amount of time spent logged in (so they can get paid for working those hours)

6. I'd like to create a comments model that gets added to completed jobs so that couriers can make notes about the job experience.

7.  I would like to create an edit feature so that couriers and dispatchers can make changes to the values of fields of jobs.  So, for example, if the address was entered incorrectly it could be fixed by users.