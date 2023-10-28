# Weather App (React + Vite + NodeJS)

## Installation

- Clone the repo
- Navigate under server directory and run the below command.
```sh
npm install
```

- Navigate under client directory and run the below command.
```sh
npm install
```

- Navigate under client directory and run the below command. It will run both Server and Client 
```sh
npm run dev
```

## Features
The Weather App offers the following features:

- Get weather information by zipcode: According to the WeatherStack Documentation, you can pass a UK/Canada/US ZIP code to the API, and the app will auto-detect the associated location.
- FAQ answers depend on the weather information.
- Multi-language support: The app supports both English and Vietnamese.

## Technologies used
### Client
- React JS: A JavaScript library for building user interfaces.
- Vite: A build tool for web development that is fast and lightweight.
- Axios: A promise-based HTTP client for making network requests.
- i18n: Internationalization library for managing multiple languages.
- Redux: A predictable state container for managing application state.
- Concurrently: To run both the server and client with one command.

### Server
- Node.js: A JavaScript runtime for building server-side applications.
- Express: A minimal and flexible Node.js web application framework.
- Axios: A promise-based HTTP client for making network requests.
- CORS: Middleware for handling Cross-Origin Resource Sharing.
- DotEnv: A module for loading environment variables from a .env file.
- Morgan: A HTTP request logger middleware for Node.js.

## What can be improved?
Here are some areas where the Weather App can be improved:

- UI Improvement: Enhance the user interface by using UI frameworks such as Tailwind CSS, Material UI, etc., to make the app more visually appealing.
- Unit Testing: Implement unit tests to improve the development process and ensure the reliability of the application.

