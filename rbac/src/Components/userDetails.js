import React, { useState, useEffect } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/"); 
  };

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", email: "", role: "", status: "Active", permissions: { read: false, write: false, delete: false } });
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [selectedRole, setSelectedRole] = useState("");
  const [permissions, setPermissions] = useState({ read: false, write: false, delete: false });

  const roles = {
    Admin: { read: true, write: true, delete: true },
    Viewer: { read: true, write: false, delete: false },
    Editor: { read: true, write: true, delete: false },
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setPermissions(roles[role] || { read: false, write: false, delete: false });
    setForm(prevForm => ({ ...prevForm, role }));  
  };
  

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Generate a unique ID 
    const generateUniqueId = () => {
      return 'id_' + Date.now() + '_' + Math.floor(Math.random() * 1000); 
    };
  
    // Ensure the user has an ID before submitting
    const userData = { 
      ...form, 
      id: form.id || generateUniqueId(), 
      permissions 
    };
  
    try {
      if (form.id) {
        // Update user
        await updateUser(form.id, userData);
      } else {
        // Add new user with generated ID
        await addUser(userData);
      }
  
      setForm({ id: "", name: "", email: "", role: "", status: "Active", permissions: { read: false, write: false, delete: false } });
      setSelectedRole("");  // Reset selected role
      setPermissions({ read: false, write: false, delete: false });  // Reset permissions

      fetchUsers();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an issue submitting the form');
    }
  };
  

  const handleEdit = (user) => {
    setForm(user);
    setSelectedRole(user.role);  
    setPermissions(user.permissions || { read: false, write: false, delete: false });
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) =>
    statusFilter === 'All' || user.status === statusFilter
  );

  const searchedUsers = filteredUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <button
        onClick={handleBack}
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Back
      </button>

      <h2 className="text-2xl font-semibold mb-4">User Management</h2>


      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="p-2 border border-gray-300 rounded-md w-full mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          disabled={form.id} // Disable the email field when editing
          className="p-2 border border-gray-300 rounded-md w-full mb-2"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="p-2 border border-gray-300 rounded-md w-full mb-4"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Role Management */}
        <h1 className="text-xl font-bold mb-4">Role Management</h1>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Role:</label>
          <select
            value={selectedRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select access --</option>
            {Object.keys(roles).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Permissions */}
        {selectedRole && (
          <div className="p-4 bg-gray-100 rounded">
            <h2 className="text-lg font-semibold mb-4">Permissions for {selectedRole}:</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={permissions.read}
                  readOnly
                  className="mr-2"
                />
                <label>Read</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={permissions.write}
                  readOnly
                  className="mr-2"
                />
                <label>Write</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={permissions.delete}
                  readOnly
                  className="mr-2"
                />
                <label>Delete</label>
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-md w-full">
          {form.id ? "Update User" : "Add User"}
        </button>
      </form>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full mb-2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full mb-4"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* User Table */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th
              onClick={() => handleSort('name')}
              className="border px-4 py-2 cursor-pointer"
            >
              Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th
              onClick={() => handleSort('email')}
              className="border px-4 py-2 cursor-pointer"
            >
              Email {sortConfig.key === 'email' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}
            </th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchedUsers.length === 0 ? (
            <tr>
              <td colSpan="5" className="border px-4 py-2 text-center text-red-500 font-bold">
                No results found
              </td>
            </tr>
          ) : (
            searchedUsers.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
