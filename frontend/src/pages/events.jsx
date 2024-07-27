import Header from "../common/header"

function Events() {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="text-center py-4">
          <h1 className="text-2xl">Event Details</h1>
        </div>
        <div className="bg-white p-4 mt-4 shadow-sm">
          <div className="mb-4">
            <label className="font-bold">Event Name:</label>
            <div className="ml-1">Conference on Web Development</div>
          </div>
          <div className="mb-4">
            <label className="font-bold">Event Date:</label>
            <div className="ml-1">2024-02-15</div>
          </div>
          <div className="mb-4">
            <label className="font-bold">Location:</label>
            <div className="ml-1">Techville Convention Center</div>
          </div>
          <div className="mb-4">
            <label className="font-bold">Description:</label>
            <div className="ml-1">This conference will cover various aspects of web development...</div>
          </div>
          <div className="mb-4">
            <label className="font-bold">Event Responsible:</label>
            <div className="ml-1">User 2</div>
          </div>
          <div className="mb-4">
            <label className="font-bold">Participants:</label>
            <div className="ml-1">John Doe, Jane Smith, Alex Johnson</div>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Edit Event</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded">Delete Event</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events