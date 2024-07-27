import { Link } from "react-router-dom";
function Header() {
    return (
        <div>
            <nav className="bg-gray-800 text-white p-4 text-center">
                <Link to="/dashboard" className="mx-2">Home</Link>
                <Link to="/events" className="mx-2">Events</Link>
                <Link to="/tasks" className="mx-2">Tasks</Link>
                <Link to="/profile" className="mx-2">Profile</Link>
                <Link to="" className="mx-2">Logout</Link>
            </nav>
        </div>
    )
}

export default Header