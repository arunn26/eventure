import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/dashboard";
import Events from "./pages/events";
import Tasks from "./pages/tasks";
import Profile from "./pages/profile";
import Home from "./home";
// import Create from "./buttons/createevent"
import Login from "./authentication/login"
import Signup from "./authentication/signup";
import EditEvent from './buttons/editevent';
import CreateEvent from './buttons/createevent';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/editevent/:eventid" element={<EditEvent/>} />
          {/* <Route path="/logout" element={<Logout />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
