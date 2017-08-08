This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Code Style followed by [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)

## How to run 
```
npm run server
npm start
```

Structure: 
* backend: express server running on http://localhost:8080
* create-react-app server on http://localhost:3000
* create-react-app calls on http://localhost:3000/api/users -> proxy http://localhost:8080/api/users
* Folder Structure: 
  * server, express api -> server.js 
  * client -> App.js
      1. components: 
          1. UserTable.js: user list table view
          1. UtilityBar.js: search input, age ascending & descending buttons
      1. pure component
          1. UserDetail: user profile detail view