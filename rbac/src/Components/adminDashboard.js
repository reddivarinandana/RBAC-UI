import React, { useState, useEffect } from "react";
// import RoleManagement from "./roleDetails";
import { getUsers } from "../api/api"; 
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); 
  }; 

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Users from API
  const fetchUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Categorize users by role
  const admins = users.filter((user) => user.role.toLowerCase() === "admin");
  const editors = users.filter((user) => user.role.toLowerCase() === "editor");
  const viewers = users.filter((user) => user.role.toLowerCase() === "viewer");

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col relative">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Admin Dashboard</h1>

      <button
        onClick={handleBack}
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition ease-in-out duration-200"
      >
        Back
      </button> 

      <div className="mt-8 grid gap-6 grid-cols-1">
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200 w-full max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Admins</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : admins.length > 0 ? (
            <ul className="space-y-2">
              {admins.map((admin) => (
                <li key={admin.id} className="text-lg text-gray-800">{admin.name} <span className="text-sm text-gray-500">({admin.email})</span></li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No Admins found.</p>
          )}
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200 w-full max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Editors</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : editors.length > 0 ? (
            <ul className="space-y-2">
              {editors.map((editor) => (
                <li key={editor.id} className="text-lg text-gray-800">{editor.name} <span className="text-sm text-gray-500">({editor.email})</span></li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No Editors found.</p>
          )}
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200 w-full max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Viewers</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : viewers.length > 0 ? (
            <ul className="space-y-2">
              {viewers.map((viewer) => (
                <li key={viewer.id} className="text-lg text-gray-800">{viewer.name} <span className="text-sm text-gray-500">({viewer.email})</span></li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No Viewers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
