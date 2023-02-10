# react-weatherapp

# Description
- This is a recreation of my school project (Weather Dashboard) using many different technologies. The front end of this application will be built using React. The back end of this application will be built using ASP.NET Core. The database for this application will be a azureSQL database and the application will be deployed using azure web services.

- This is very different than anything I have yet to build so expect there to be a long delay between commits. As far as I know there are not many tutorials and demonstrations out there on how to build this specific application being that it incorporates React, ASP.NET and sql all in the same solution. It will take awhile for me to figure this out. If you have questions on why or how I did something, you can reach me at the - [Contribution/questons](#Contribution/Questions) portions of the page

# Installation
- After I am finsihed creating this application I will give detailed instructions on how to clone and set the repository up for your own application

# Usage
- JWT is working but not yet added to the login portion of the backend.

- All backend crud operations are 90% done, I still need to create an indvidual user query and figure out how to insert that information into the auth operation on the back end.

- If you want to test the JWT yourself, ensure your test route includes "https://yourlocalhost/auth/Login", you need to have a static user in your models that has a username and password. Dont forget to include the username and password in your JSON body for your post request.. If a JWT has been returned than it has been set up correctly. This is the same for the crud routes in the UserController.cs file

- Another tid bit for testing, you will need to create your own database, and set up your own appsettings.json file which will store your jwt key and local host routes. Im sure if your bored enough you can go through my commits and find an old submission that still has my appsettings.json file in it

- Have not pushed to azure recently, doesnt matter anyways because all work has been done on the backend. I will be starting the front end development more so next week

- If you're feeling froggy and want to see what the site looks like in its current state, you can check it out at https://reactweatherapp.azurewebsites.net/. Or just look at the nifty screenshot in here

![alt text](./ClientApp/src/assets/images/screenshot.png)

### Contribution/questions
- For anything regarding this category you can email me at SSEPENLOPE23@gmail.com

# Credits
- The UofM Coding Bootcamp for providing follow on courses on C# and .NET which was the baseline for the knowledge I needed to build this
