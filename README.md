# Weather Dashboard

# What is this?
- This is a recreation of my school project (Weather Dashboard) using many different technologies. The front end of this application will be built using React. The back end of this application will be built using ASP.NET Core. The database for this application will be a azureSQL database and the application will be deployed using azure web services.

- This is essentially a knock off weather app created by your's truly. It is star citizen themed, well because I love space and star citizen. Search a city and get the weather. Lots of implementations missing that will be added eventually. Read further to find out more. 

- Lots of neat features have been added. I highly suggest creating an account. It can be with random details. Mess around with the features. The offCanvas effect for your previously searched is really cool I thought. I put a lot of work into the suggestions as well. You can see how I did all that on the profileHeader component and header component.

- In the works is an admin account that can manage and users on the site. I will give the deet for the admin account creation once it is finished

# Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [ChangeLog](#ChangeLog)

# Installation
- After I am finsihed creating this application I will give detailed instructions on how to clone and set the repository up for your own application

# Usage
- UPDATE: I have migrated to a different azure resource group with provisional database, there should no longer be delays when trying to log in

- If the City you are looking for does not appear in the suggestions then it probably does not exist within the openweathermap API. I have a JSON provided by them with thousands of the cities they collect data for and that is where the suggestions come from

- The routes for updating and deleting are created and work but are not implemented yet

- Create an account, login and check your applications local storage which should now include your jwt. You can see how I accomplished that in the Auth.cs, login.jsx and registration.jsx.

- Logged in users can favorite their cities. However it is not yet displayed in the offCanvas. I am still working out kinks with the saving and rendering method between the front and backend. As of right now the star should change to solid if you favorite it and your localStorage should include your favorites

- Logged in or not, search for a city and the current weather and five day forecast will be displayed

- For all of your own testing purposes you will need to create your own appsettings.json file and include your "DefaultConnection" string to your own database or use secrets.json is VS.  I will later be moving to microsofts built in Secrets.json and will re-include the appsettings.json in this repo after I have removed all sensitive data from it.

- If you're feeling froggy and want to see what the site looks like in its current state, you can check it out at https://starweather.azurewebsites.net. Or just look at the nifty screenshot in here

![alt text](./ClientApp/src/assets/images/dashboard.gif)

## Bugs
- No media queries yet, resizing the screen will not alter shapes and sizes yet. Will be fixed towards the end of the project

- Error handeling for the improper city search has been implemented. Still refining it

- Need to implement suggestion hidding when there is an exact match, I see that it can be quite annoying seeing the city name underneath the proper one.

- Favorites are still finicky, the start may go back to open even after you favorite a city but will reappear solid after page refresh. I am currently working through that.


### Contribution/questions
- For anything regarding this category you can email me at SSEPENLOPE23@gmail.com

### Credits
- The UofM Coding Bootcamp for providing follow on courses on C# and .NET which was the baseline for the knowledge I needed to build this


# ChangeLog
### 3/30/23 :
* Added Cookies to the page to hold and store the users favorite cites. This allowed for an alternative method to localStorage however is most likley not practical in a production build. It was just more so done as a learning experience.

* Moved the state of the favorites all to the parent component which is the "profile" page.

* Added a checkmark animation and removed to the alert after clicking the favorite star. 

* Added the means to edit and delete individualy saved cities

* Updated the check against the cookies to show the city is favorited regardless of the casing used
### 3/29/23 :
* Added a if statement to the use effect on the currentweather page, this should fix the issue where the entirety of the page was not working when it could not find the users data.

### 3/28/23 : 
* Migrated to an alternative azure resource group as my previous one costed to much, DB was recreated and reworked so bugs are likely as I have not had time to trouble shoot and or find all of them. 

* Implemented a favorite button. Will currently save to your favorites list in the DB, however it is not displayed at this time. I will implement that soon

### 3/27/23 :
* Added routes to save user's favorited cities to the DB, added route to retrieve users favorited cities

* Added relations to SQL database to link userId to the favorites table.
### 3/21/23 : 
* Added the useMemo hook to the profile header page which hopefully will help with the suggestion filtering. The scripting time is low in the devlopment environment. If it does not help in the live enviromnment then I will need to evaluate if there is anything I can do with my servers without spending to much money.

* Modified the filter method on the suggestion fetch function to only return suggestions that match the exact user input. This will reduce the longer render times being seen on the live environment.

* Added the useRef hook to the debounce_delay useEffect call in the profileHeader component. This should help with user's typing fast and creating alot of API calls. It should now instead, create a memory of the timer rather than create a new one every time the component renders.

* Moved the suggestion fetch API call to the util folder. Request is now made in the useEffect hook at the top of both header components. This stores the city data into the users local storage imediately on page load and should reduce almost all network latency issues rendering suggestions when the user is inputing the name of a city.

* Fixed homepage not saving previously viewed, added gif to readme

* I am aware the previously viewed buttons are not working on the homepage. I will get to this tomorrow.
---

### 3/13/23 :  
* Made changes to nuget packages that were outdated, causing errors when publishing to azure. 
* Added suggestions to homepage when a user is not logged in, still need to clear the suggestions and search bar after the form has been submited 
* fixed error where input was not fethcing cities, cleared user input and suggestions upon submission of search form
* Added error handling alert for incorrect city searches on the hompage, this needs to be added to the profile page as well. As of right even if the city doesnt exist, whatever city name the user types in is still displayed on the page, I will be adding a method to mitigate the state being update upon a incorrect search in the future
---

### 3/10/23 : 
* Added JSON file provided by openweathermap API that contains all major city names, locations, and coordinates. 
* Added a function to call on the C# controller on the backend to return the data and provide suggestions to the user on the front end.
---

### 3/9/23 : 
* Added offCanvas effect to hold all the users stored profile data in the future, I.E. favorited cities and currently holds the users previously searched cities
---

### 3/6/23 : 
* Fixed issue where react would render the previously searched cities twice to the header bar. This was fixed by adding a "if" statement at the top of the function that rendered the componenet to see if the ciities had already been rendered. Check "Header.jsx: 12-13 " if you would like to see how that issue was resolved.