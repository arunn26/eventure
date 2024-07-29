import Header from "../common/header";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl">Welcome, {}</h1>
          <Link to="/createevent">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Create New Event
            </button>
          </Link>
        </div>
        <div className="bg-white p-4 mt-4 shadow-sm">
          <h2 className="text-xl mb-4">Upcoming Events</h2>
          <p>Event 1: Conference on Web Development - Date: 2024-02-15</p>
          <p>Event 2: Tech Networking Meetup - Date: 2024-03-05</p>
        </div>
        <div className="bg-white p-4 mt-4 shadow-sm">
          <h2 className="text-xl mb-4">Your Tasks</h2>
          <div className="bg-gray-200 p-2 mb-2">Task 1: Prepare presentation for the conference</div>
          <div className="bg-gray-200 p-2 mb-2">Task 2: Coordinate with tech meetup speakers</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
