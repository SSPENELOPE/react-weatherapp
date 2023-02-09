# react-weatherapp

# Description
- This is a recreation of my school project (Weather Dashboard) using many different technologies. The front end of this application will be built using React. The back end of this application will be built using ASP.NET Core. The database for this application will be a azureSQL database and the application will be deployed using azure web services.

- This is very different than anything I have yet to build so expect there to be a long delay between commits.

- The weblink to this site will be include in the [usage](#usage) portion of this readme. It probably will not be working a majority of the time as I learn to navigate azure and implement a .NET backend.

- One thing to note, out of ignorance I added HttpsOverides to the program file being that this app is served up on a bunch of different local host using proxies. I am familiar with proxies but not incorporating this many into the development servers. The option that has been added will forward the headers between proxies which hopefully will prove useful if needing to pass our JWT around while creating and logging users in later on. If not, it will be removed from Program.cs

# Installation
- After I am finsihed creating this application I will give detailed instructions on how to clone and set the repository up for your own application

# Usage
- Phewwwww, got the JWT working on the backend, route was tested and works in postman. For anyone curious how to set up JWT with ASP.NET you can take a look at the Auth.cs file in this repo under the controllers folder. Next step I will be creating a login page that will put the JWT to work. However before doing that I will be setting up a SQL database to store user login and credentials. Furthermore, once I learn how to perfect the user model, I will be storing a Users favorited cities and data from the openweathermapAPI. 

- If you want to test the JWT yourself, ensure your test route includes "https://yourlocalhost/auth/Login", you need to have a static user in your models that has a username and password. Dont forget to include the username and password in your JSON body for your post request.. If a JWT has been returned than it has been set up correctly

- Made some recent pushes to azure, site should be up, running and working although there's not much to it as I am currently building out more backend components for this application

- If you're feeling froggy and want to see if the website works in its current state, you can try to check it out at https://reactweatherapp.azurewebsites.net/

# Credits
- The UofM Coding Bootcamp for providing follow on courses on C# and .NET which was the baseline for the knowledge I needed to build this
