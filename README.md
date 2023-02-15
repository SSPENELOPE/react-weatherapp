# react-weatherapp

# Description
- This is a recreation of my school project (Weather Dashboard) using many different technologies. The front end of this application will be built using React. The back end of this application will be built using ASP.NET Core. The database for this application will be a azureSQL database and the application will be deployed using azure web services.

- This is very different than anything I have yet to build so expect there to be a long delay between commits. As far as I know there are not many tutorials and demonstrations out there on how to build this specific application being that it incorporates React, ASP.NET and sql all in the same solution. It will take awhile for me to figure this out. If you have questions on why or how I did something, you can reach me at the - [Contribution/questons](#Contribution/Questions) portions of the page.

- Jwt delivery is now possible between the front and backend. When a user signs in then a jwt is returned to the user and stored. This token is then used to determine if a user is logged into the application or not which allows for the alteration of the user's experience. The stored user data is very miniscule right now but will be scaled up later once I have more working features and working calls to retrieve the weather. As of right now you can create an account, login and logout. As far as the regesitration I will need to modify it so there can be no duplicates and minimum password requirements will be set. I will also be including bcrypt into the .net api for extended security. I've achieved this easily in javascript but never in C# so it may take awhile before I get to that. 

# Installation
- After I am finsihed creating this application I will give detailed instructions on how to clone and set the repository up for your own application

# Usage
- JWT is working but not yet added to the login portion of the backend.

- The routes for updating and deleting are created and work but are not implemented yet

- Create an account, and login and check your application local storage which should now include your jwt. You can see how I accomplished that in the Auth.cs, login.jsx and registration.jsx

- For all of your own testing purposes you will need to create your own appsettings.json file and include your "DefaultConnection" string to your own database. I will later be moving to microsofts built in Secrets.json and will re-include the appsettings.json in this repo

- All changes are being published to azure, some routes may not work as I have stored variables set for a developoment enviroment right now.'

- I was Somewhat unorthodox on commit frequency between my last commit and now, this was due to issues learning how to hide a connection string, along with breaking everything while learning how to use dependancy injection 

- If you're feeling froggy and want to see what the site looks like in its current state, you can check it out at https://reactweatherapp.azurewebsites.net/. Or just look at the nifty screenshot in here

![alt text](./ClientApp/src/assets/images/screenshot.png)

### Contribution/questions
- For anything regarding this category you can email me at SSEPENLOPE23@gmail.com

# Credits
- The UofM Coding Bootcamp for providing follow on courses on C# and .NET which was the baseline for the knowledge I needed to build this
