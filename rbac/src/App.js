import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserManagement from "./Components/userDetails";
// import RoleManagement from "./Components/roleDetails";
import Dashboard from "./Components/dashBoard";
import AdminDashboard from "./Components/adminDashboard";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="p-4 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard /> } />
          <Route path="/users" element={<UserManagement />} />
          {/* <Route path="/roles" element={<RoleManagement />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
