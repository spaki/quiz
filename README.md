#Quiz

Example of a quiz built with [ASP.NET Core WebAPI](https://www.microsoft.com/net/core "ASP.NET Core WebAPI") and [React](https://reactjs.org/ "React").

The idea of the demo is have a web app where the user can chose an option to answer a question.

In the API is possible to POST a new Question, and GET the last Question posted. It is possible too POST an Answer and GET the answers statistics.

All the data is recorded in a [MongoDB](https://www.mongodb.com/what-is-mongodb "MongoDB") and the Backend is [Docker](https://www.docker.com/community-edition "Docker") ready!

The projects are separated.

To start the Backend API, go to **api** folder, and type the commands:
```shell
dotnet restore
dotnet build 
dotnet run
```

(Also, you can use the debug of [Visual Studio Code](https://code.visualstudio.com/ "Visual Studio Code") or "Regular" Visual Studio)

To start the Frontend, go to **ui** directory and type the command:
```
npm start
```

(You need to have [nodejs](https://nodejs.org/ "nodejs") installed)
