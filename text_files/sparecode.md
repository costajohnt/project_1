
          <ul class="jobs list-group">
            <% jobs.forEach(function(job) { %>
            <li class="job list-group-item">
            <%= job.name %>
            <%= job.address %> 
            <%= job.phone %>
            <%= job.order_time %>
            <%= job.order_contents %>
            <%= job.delivery_fee %>
            <%= job.delivery_tip %>
            <%= job.riders %>
            <span data-id="<%= job._id %>" class="close delete">X</span></li>
            <% }); %>
          </ul>

  <% if !job.rider { %> this is for my queue div to make it so that any rider can grab jobs from the queue.  The other two divs for myjobs and mycompleted jobs will have if job.rider so that new riders cannot take a job that has already been claimed.

                <%= job.order_contents %> 
              <%= job.delivery_fee %> 
              <%= job.delivery_tip %> 
              <%= job.riders %> 
                  <%= job.name %> 
       <%= job.phone %> 


       <% var incrementer = 0; %>
         <% jobs.forEach(function(job) { %>
         <% if (job.rider == userid) { %>
         <li class="job list-group-item" data-id="<%= job._id %>">
           <a id="ticket<%= incrementer %>" href="#"><%= job.address %><%= job.date %>
           </a><span data-id="<%= job._id %>"></span>
         </li>
         <% incrementer++ %>
         <% }}) %>