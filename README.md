# Personal Planner & Recipe Archive
For demo purposes a live deployment of this app can be found at https://akbrauer.onrender.com/

To experiment with the Personal Planner (Calendar) application's features, start a Guest Demo using the prompt at the top. This is the best way to quickly see the site's functionality.

Note: The server's wakefulness is currently being maintained via a cronjob, so on occasion it is possible for it to take up to a minute to wake from rest, if there has been a recently failed cronjob call. 

## Todo List
<ul>
  <li>FIX DS_STORE GITIGNORE</li>
  <li>Fix Login/Signup width on mobile</li>
  <li>Fix homepage source image performance</li>
  <li>Add password constraints</li>
  <li>Add loading notification</li>
  <li>Add new recipe .post route</li>
  <li>Add recipe picture autoupload to cloudinary</li>
  <li>Populate recipe archive with additional data</li>
  <li>Add controller files & refactor routes</li>
  <li>Prevent Calendar Day div overflow</li>
</ul>

## Bug Fixes & Added Features
<ul>
  <li>Removed apod API call to limit service-initiated traffic</li>
  <li>Fixed popover refresh issue upon calendar scroll</li>
  <li>Added horizontal calendar scroll on mobile</li>
  <li>Improved mobile card display</li>
  <li>Fixed apod return video error</li>
</ul>
