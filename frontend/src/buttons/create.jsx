import Header from "../common/header"


function Create() {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="text-center py-4">
          <h1 className="text-2xl">Create New Task</h1>
        </div>
        <div className="bg-white p-4 mt-4 shadow-sm">
          <form>
            <div className="mb-4">
              <label htmlFor="relatedEvent" className="block mb-2">Related Event</label>
              <select id="relatedEvent" name="relatedEvent" className="w-full p-2 border border-gray-300 rounded">
                <option value="event1">Event 1: Tech Conference</option>
                <option value="event2">Event 2: Annual Meetup</option>
                {/* Additional event options can be added here */}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="taskTitle" className="block mb-2">Task Title</label>
              <input type="text" id="taskTitle" name="taskTitle" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="taskDescription" className="block mb-2">Task Description</label>
              <textarea id="taskDescription" name="taskDescription" className="w-full p-2 border border-gray-300 rounded"></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="taskDeadline" className="block mb-2">Deadline</label>
              <input type="date" id="taskDeadline" name="taskDeadline" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="taskAssignee" className="block mb-2">Assignee</label>
              <select id="taskAssignee" name="taskAssignee" className="w-full p-2 border border-gray-300 rounded">
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
                <option value="user3">User 3</option>
                {/* Additional user options can be added here */}
              </select>
            </div>
            <div className="mb-4">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Create