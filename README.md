# Weather Dashboard

# What is this?
- This is a recreation of my school project (Weather Dashboard) using many different technologies. The front end of this application will be built using React. The back end of this application will be built using ASP.NET Core. The database for this application will be a azureSQL database and the application will be deployed using azure web services.

- This is essentially a knock off weather app created by your's truly. It is star citizen themed, well because I love space and star citizen. Search a city and get the weather. Lots of implementations missing that will be added eventually. Read further to find out more. 

- Lots of neat features have been added. I highly suggest creating an account. It can be with random details. Mess around with the features. The offCanvas effect for your previously searched is really cool I thought. I put a lot of work into the suggestions as well. You can see how I did all that on the profileHeader component and header component.

# Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [ChangeLog](#ChangeLog)

# Installation
- After I am finsihed creating this application I will give detailed instructions on how to clone and set the repository up for your own application

# Usage
- PLEASE NOTE: If you go to the website and play with the login and registering features there will be delays intially if no one has been using the site. This is because my azureSQL server goes to sleep if it is not being used. This saves me money being that I alone am not spending hundreds or even thousands of dollars on a website built for the purpose of showing employers what I can create. 

- If you click login and nothing happens, just be patient and try again. You may get errors, but it will work. Just wait for the server to wake up

- If the City you are looking for does not appear in the suggestions then it probably does not exist within the openweathermap API. I have a JSON provided by them with thousands of the cities they collect data for and that is where the suggestions come from

- The routes for updating and deleting are created and work but are not implemented yet

- Jwt delivery is now possible between the front and backend. When a user signs in then a jwt is returned to the user and stored. This token is then used to determine if a user is logged into the application or not which allows for the alteration of the user's experience. The stored user data is very miniscule right now but will be scaled up later once I have more working features and working calls to retrieve the weather. As of right now you can  create an account, login and logout. As far as the regesitration I will need to modify it so there can be no duplicates and minimum password requirements will be set. I will also be including bcrypt into the .NET API for extended security. I've achieved this easily in javascript but never in C# so it may take awhile before I get to that.

- Create an account, login and check your applications local storage which should now include your jwt. You can see how I accomplished that in the Auth.cs, login.jsx and registration.jsx.

- Weather is now displayed upon city search, the data for the city search is now persistent which should lower the API call usage

- For all of your own testing purposes you will need to create your own appsettings.json file and include your "DefaultConnection" string to your own database. I will later be moving to microsofts built in Secrets.json and will re-include the appsettings.json in this repo

- If you're feeling froggy and want to see what the site looks like in its current state, you can check it out at https://reactweatherapp.azurewebsites.net/. Or just look at the nifty screenshot in here

![alt text](./ClientApp/src/assets/images/dashboard.gif)

## Bugs
- No media queries yet, resizing the screen will not alter shapes and sizes yet. Will be fixed towards the end of the project

- Error handeling for the improper city search has been implemented. Still refining it

- Need to implement suggestion hidding when there is an exact match, I see that it can be quite annoying seeing the city name underneath the proper one


### Contribution/questions
- For anything regarding this category you can email me at SSEPENLOPE23@gmail.com

### Credits
- The UofM Coding Bootcamp for providing follow on courses on C# and .NET which was the baseline for the knowledge I needed to build this


# ChangeLog
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