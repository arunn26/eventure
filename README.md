# Eventure - Event Management Application

Eventure is a full-stack event management application that allows users to create, manage, and participate in events. The platform is built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) with authentication, event and task management functionalities.

## Features

- **User Authentication:** Signup and login with secure password hashing.
- **Event Management:** Create, update, and delete events.
- **Task Management:** Assign tasks to users within an event.
- **Database Integration:** Uses MongoDB to store user, event, and task data.
- **RESTful API:** Backend API for event and user management.
- **Frontend:** Built with React.js and Tailwind CSS.

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- dotenv


### Backend Setup
```sh
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following:
```sh
MONGO_URI=mongodb+srv://test:test123@eventure-server.mxz0m.mongodb.net/
PORT=5001
```

Start the backend server:
```sh
npm run server
```

### Frontend Setup
```sh
cd client
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user.
- `POST /auth/login` - Authenticate user and return session.

### Events
- `GET /events` - Fetch all events.
- `GET /events/:id` - Fetch a single event.
- `POST /events` - Create a new event.
- `PUT /events/:id` - Update an event.
- `DELETE /events/:id` - Delete an event.

### Tasks
- `GET /tasks` - Fetch all tasks.
- `POST /tasks` - Create a new task.
- `PUT /tasks/:id` - Update a task.
- `DELETE /tasks/:id` - Delete a task.

## Project Structure
```
/eventure
 ├── client                # Frontend React App
 │   ├── src
 │   │   ├── authentication
 │   │   │   ├── login.jsx
 │   │   │   ├── signup.jsx
 │   │   ├── components
 │   │   ├── pages
 │   │   ├── App.js
 │   │   ├── index.js
 │   ├── package.json
 │   ├── tailwind.config.js
 ├── server                # Backend Express API
 │   ├── config
 │   │   ├── db.js
 │   ├── controllers
 │   │   ├── eventController.js
 │   │   ├── userController.js
 │   ├── models
 │   │   ├── event.js
 │   │   ├── user.js
 │   │   ├── task.js
 │   ├── routes
 │   │   ├── authRoutes.js
 │   │   ├── eventRoutes.js
 │   │   ├── userRoutes.js
 │   ├── utils
 │   │   ├── idUtils.js
 │   ├── .env
 │   ├── index.js
 │   ├── package.json
```

## Usage
1. Start the backend server (`npm start` in `server` directory).
2. Start the frontend (`npm start` in `client` directory).
3. Open `http://localhost:3000` in your browser to use the application.
