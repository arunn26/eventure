import { Link } from 'react-router-dom';

function Header() {
  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage data
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="flex space-x-4">
          <Link to="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded transition">Home</Link>
          <Link to="/events" className="hover:bg-gray-700 px-3 py-2 rounded transition">Events</Link>
          <Link to="/tasks" className="hover:bg-gray-700 px-3 py-2 rounded transition">Tasks</Link>
          <Link to="/profile" className="hover:bg-gray-700 px-3 py-2 rounded transition">Profile</Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
