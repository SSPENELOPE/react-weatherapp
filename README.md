# Weather Dashboard

# What is this?
- This is a recreation of my school project (Weather Dashboard) using many different technologies. The front end of this application is built using React. The back end of this application is built using ASP.NET Core. The database for this application is a azureSQL database and the application is deployed on azure web services.

- This is essentially a knock off weather app created by your's truly. It is star citizen themed, well because I love space and star citizen. Search a city and get the weather. I've added as much as I can to ensure it includes most of the major criteria you would want in a production site. 

- The site works on all size devices to include MOST modern mobile phones. If the pixel width is below 300 I cant promise anything will look as it should. 

- In the works is an admin account that can manage all users on the site. I will provide in this readme, a .gif file of how it works as well as provide the file directory as to how I did it. 

- A majority of all database handling will be migrating to entity frameworks in the future

- I will be going through and adding more comments to everything as I get the time.

- Lesson learned in this repo, Code organization and cleanliness. I tried to do the best I could with the knowledge I have, however I have a lot of refactoring to do. Something I did not understand well coming into building this was the CLEAN ARCHITECHTURE principals and design which I will be planning before creating on my next project

- I am currently working on packing this with electron.js and creating a downloadable version. I am not experienced with electron, as I learn it and create the packages I will add the download links to this site.

- I dont have my own QA team so if you catch any errors or typos please feel free to email me with what you found. 

# Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [ChangeLog](#ChangeLog)

# Installation
- After I am finsihed creating this application I will give detailed instructions on how to clone and set the repository up for your own application

# Usage
- It is Highly Recommended thay you create an account. You do not need to use your real information, my regex's and authentication process is not that serious. A majority of the intferace and quality user experience comes when the user is logged in. Checking your browsers localstorage you will see your "token", which is your JWT. If this was a production site I would name that to something unique so we know its our sites token. You can see how I accomplished that in the auth.cs, login.jsx, and registration.jsx files.

- UPDATE: I have migrated to a different azure resource group with a provisional database, there should no longer be delays when trying to log in. 

- If the City you are looking for does not appear in the suggestions then it probably does not exist within the openweathermap API. I have a JSON provided by them with thousands of the cities they collect data for and that is where the suggestions come from. 

- You may update your user information, however the option to delete you account does not exist yet.

- For all of your own testing purposes you will need to create your own appsettings.json file and include your "DefaultConnection" string to your own database or use secrets.json is VS. I will later be moving to microsofts built in Secrets.json and will re-include the appsettings.json in this repo after I have removed all sensitive data from it.

- You can visit this site at: https://starweather.azurewebsites.net. 

### Registration 
![alt text](./ClientApp/src/assets/gifs/registration.gif)

### Favorites 
![alt text](./ClientApp/src/assets/gifs/favorites.gif)

### Settings
![alt text](./ClientApp/src/assets/gifs/settings.gif)

## Bugs
- Error handeling for the improper city search has been implemented. Still refining it.

- Need to implement suggestion hidding when there is an exact match, I see that it can be quite annoying seeing the city name underneath the proper one.

- I will update the logic of the user input to remove the all caps spelling, the was intially implemented to ensure all saving/retrieving methods were the same casing to remove duplicates


### Contribution/questions
- For anything regarding this category you can email me at SSEPENLOPE23@gmail.com

### Credits
- The UofM Coding Bootcamp for providing follow on courses on C# and .NET which was the baseline for the knowledge I needed to build this


# ChangeLog
### 4/2/2023 : 
* Fixed issue that was displaying an incorrect or not found city name, the incorrect city name should no longer be displayed

* Added bcrypt to the backend for all password handling

* Updated previously viewed logic to only allow 5 previously viewed cities, this a large list from cluttering the screen

* Added password validation to force users to input a more "secure" password.

* Added a function to check against the database to ensure the "username" is unique, and that the email they are signing up with does not already exist.

* Added means to support turning suggestion box on and off in the user settings. This was done using stored procedures in the DB as well as cookies to reduce the calls we make to the server. 

* Fixed the handling of favorite cities, they should now instanly update to your list when saving or removing. Should not require page refresh whatsoever. However I am still smoothing some things out the user may not see on the front end. 

* Changed media queries again so cards and data appears more readable on smaller devices

* I know I'm forgetting a lot and thats the issue with coding til 3 AM and not commiting as frequently as I should. I'll add things as I remember them.
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