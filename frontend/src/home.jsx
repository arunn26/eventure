import React from 'react';
import { Link } from "react-router-dom";


function Home() {
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto p-20">
                <div className="bg-white p-8 rounded shadow-md mx-52">
                    <h1 className="text-2xl font-bold mb-6">Eventure</h1>
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold">Register Student Profile</h2>
                            <p>Register as a student to access the student portal of Eventure</p>
                            <Link to="/signup"><button className="mt-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Register your student profile</button>
                            </Link>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Login to Student Portal</h2>
                            <p>Please click the below link to login to the student portal</p>
                            <Link to="/login"><button className="mt-2 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700">Login to Student Portal</button>
                            </Link>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Login to Admin Portal</h2>
                            <p>Please click the below link to login to the admin portal</p>
                            <button className="mt-2 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700">Login to Admin Portal</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
