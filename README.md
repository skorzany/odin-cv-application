# odin-cv-application

A CV/resumee generator created in React (with Vite).<br/>
It was a good opportunity
to put my newly-acquired skills into practice (especially <em>props</em> and <em>state</em>).<br/>
I've also written a reducer to manage state efficiently, and added more extra features that were not required.<br/>
The layout is simple, but responsive.

Deployed on Vercel, you can see it live in action at [this link](https://odin-cv-application-xi-ruby.vercel.app/).

## Details and features

The generated CV consists of three sections: <em>contact</em>, <em>education</em> and <em>experience</em>.<br/>
While contact section is more static, the user can add/remove as many schools and<br/>
jobs as they like, and see a live preview for each of their inputs at one click.<br/><br/>
The components are smart: each section verifies its data, cleans up all unnecessary<br/>
whitespace, as well as formats the data for appropriate display,<br/>
especially in the contact section, like capitalizing your name/s etc.<br/>
(Other sections are not so strict, as school and company names differ around the world)<br/><br/>
The experience section utilizes sessionStorage for storing user date inputs,<br/>
preventing entering dates that make no sense: not only it validates if the end date<br/>
comes <em>after</em> start date, but prevents invalid dates from selection!<br/>
(Your data is cleared on page refresh, allowing you to start anew at any time)<br/><br/>
It also converts date periods for you:<br/>

- assumes you're still working if no end date was specified,<br/>
- displays only the month name if you worked somewhere for a short-time.<br/><br/>

The final version is generated after hitting the 'Submit' button:<br/>
the App will clean up and validate your inputs, and notify if something is wrong.<br/>
Then it will generate a final view of your CV, with education and<br/>
experience sections <em>sorted</em>, placing the most recent ones at the top,<br/>
just like you would have ordered a real resume.

Of course, there is also room for improvement and extra features. Possibilities are endless.

I hope that you like it!
