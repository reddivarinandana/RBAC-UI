import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <nav className="bg-blue-600 w-full p-4 shadow-md">
        <ul className="flex justify-center space-x-8 text-white">
          <li>
          <Link to="/admin" className="hover:text-gray-300 text-lg font-semibold">
            Admin Dashboard
          </Link>

          </li>
          <li>
            <Link
              to="/users"
              className="hover:text-gray-300 text-lg font-semibold"
            >
              User Management
            </Link>
          </li>
          {/* <li>
            <Link
              to="/roles"
              className="hover:text-gray-300 text-lg font-semibold"
            >
              Role Management
            </Link>
          </li> */}
        </ul>
      </nav>

      {/* Optional content below */}
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold">Welcome to the Role Based Access Control</h1>
        <h1 className="text-4xl font-bold mt-10">(RBAC)</h1>
      </div>
    </div>
  );
};

export default Dashboard;
