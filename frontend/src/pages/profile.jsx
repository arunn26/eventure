import Header from "../common/header"


function Profile() {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="text-center py-4">
          <h1 className="text-2xl">Profile Management</h1>
        </div>
        
        <div className="bg-white p-4 mt-4 shadow-sm">
          <h2 className="text-xl mb-4">Change Password</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block mb-2">Current Password</label>
              <input type="password" id="currentPassword" name="currentPassword" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block mb-2">New Password</label>
              <input type="password" id="newPassword" name="newPassword" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2">Confirm New Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Change Password</button>
            </div>
          </form>
        </div>
        <div className="bg-white p-4 mt-4 shadow-sm">
          <h2 className="text-xl mb-4">Past Events and Activities</h2>
          <ul className="list-disc pl-5">
            <li>Event 1: Tech Conference - Date: 2023-06-15</li>
            <li>Event 2: Annual Meetup - Date: 2023-09-10</li>
            {/* Additional past events can be listed here */}
          </ul>
        </div>
      </div>
    </div>

  )
}

export default Profile