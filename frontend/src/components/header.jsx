import { Link } from 'react-router-dom';

function Header() {
  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage data
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 text-center">
        <Link to="/dashboard" className="mx-2">Home</Link>
        <Link to="/events" className="mx-2">Events</Link>
        <Link to="/tasks" className="mx-2">Tasks</Link>
        <Link to="/profile" className="mx-2">Profile</Link>
        <button onClick={handleLogout} className="mx-2">Logout</button>
      </nav>
    </div>
  );
}

export default Header;
