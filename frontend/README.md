# Full stack MERN Project

Create-read-update-delete (CRUD) web application made from the scratch using MERN (Mongo, Express, React, Node.js) stack.

## Project description

It's a basic full stack CRUD application. In this project I used:

- **MERN tech stack** - Mongo, Express, React, Node.js
- **Typescript** - strongly typed programming language built on JavaScript
- **recoil** - state management library for React
- **axios** - promise-based HTTP Client for Node.js and the browser
- **bootstrap** - CSS framework
- **Day.js** - JavaScript library for parsing, validating, manipulating and displaying dates and times
- **MUI** - component library for customization of components and features

## Project result

Application contains basic table of customer's data fetched from "customers" database. New customer is created by clicking the "Add New Customer" button. By clicking on a "Details" button, user is able to see details of selected customer. Customer's details are deleted or edited from database by clicking on a "Delete" or "Edit" buttons. User can also calculate insurance price based on his age and city, by clicking on a "Calculate Insurance Price".

### `npm start`

Keep both terminals running at the same time.

##### Frontend - Install and Run the Project

Run in Terminal 1:

- cd frontend
- npm start

Opens [http://localhost:3000]

##### Backend - Install and Run the Project

Run in Terminal 2:

- cd backend
- nodemon server

Opens [http://localhost:4000]
