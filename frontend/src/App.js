import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Events from './events/events';
import Tasks from './tasks/tasks';
import Profile from './pages/profile';
import Home from './pages/home';
import Login from './authentication/login';
import Signup from './authentication/signup';
import EditEvent from './events/editevent';
import CreateEvent from './events/createevent';
import EditTask from './tasks/edittask'; // Ensure this component exists
import CreateTask from './tasks/createtask'; // Ensure this component exists

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/createtask" element={<CreateTask />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editevent/:eventid" element={<EditEvent />} />
          <Route path="/edittask/:taskid" element={<EditTask />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
