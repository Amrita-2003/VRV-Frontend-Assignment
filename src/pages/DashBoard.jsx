import React, { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { initialState, reducer, actionTypes } from "../utils/Reducer";
import { AddMemberModal } from "../components/forms/AddModal";
import { 
  Users, 
  UserPlus, 
  Shield, 
  LogOut, 
  Menu, 
  Trash2, 
  Edit 
} from "lucide-react";

// Mock data
const mockMembers = [
  { id: 1, email: "john.doe@example.com", role: "user" },
  { id: 2, email: "jane.doe@example.com", role: "creator" },
];

const mockRoles = ["user", "creator", "admin"];

const AdminDashboard = () => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    members: mockMembers,
    roles: mockRoles,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ email: "", role: "" });
  const [newRole, setNewRole] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    console.log("Current members:", state.members);
    console.log("Available roles:", state.roles);
  }, [state]);

  const handleAddMember = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (emailRegex.test(newMember.email.trim())) {
      dispatch({ type: actionTypes.ADD_MEMBER, payload: newMember });
      setNewMember({ email: "", role: state.roles[0] }); 
      setIsModalOpen(false);
    } else {
      alert("Please enter a valid email.");
    }
  };

  const handleRoleChange = (id, newRole) => {
    dispatch({ type: actionTypes.UPDATE_MEMBER_ROLE, payload: { id, role: newRole } });
  };

  const handleDeleteMember = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      dispatch({ type: actionTypes.DELETE_MEMBER, payload: id });
    }
  };

  const handleAddRole = () => {
    if (newRole.trim() && !state.roles.includes(newRole)) {
      dispatch({ type: actionTypes.ADD_ROLE, payload: newRole.trim() });
      setNewRole("");
    } else {
      alert("Invalid or duplicate role.");
    }
  };

  const handleDeleteRole = (role) => {
    if (window.confirm(`Are you sure you want to delete the role "${role}"?`)) {
      dispatch({ type: actionTypes.REMOVE_ROLE, payload: role });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white min-h-screen z-40 shadow-2xl`}
      >
        <div className="p-6 flex justify-between items-center border-b border-indigo-700">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Shield className="mr-2" />
            Admin Panel
          </h1>
        </div>
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            <li>
              <button className="w-full flex items-center text-left px-4 py-3 hover:bg-indigo-700 rounded-lg transition-colors">
                <Users className="mr-3" />
                Manage Members
              </button>
            </li>
            <li>
              <button className="w-full flex items-center text-left px-4 py-3 hover:bg-indigo-700 rounded-lg transition-colors">
                <Edit className="mr-3" />
                Manage Roles
              </button>
            </li>
            <li className="absolute bottom-4 w-[calc(100%-3rem)] px-2">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
              >
                <LogOut className="mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 lg:hidden bg-indigo-600 text-white p-2 rounded-full shadow-lg z-50"
      >
        <Menu />
      </button>

      <main className="flex-1 p-8 lg:ml-64 bg-transparent">
        <header className="flex items-center justify-between pb-6 border-b border-gray-300">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Users className="mr-4 text-indigo-600" />
            Members Management
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center shadow-md transition-colors"
          >
            <UserPlus className="mr-2" />
            <span className="hidden sm:block">Add Member</span>
          </button>
        </header>

        <section className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">
            Current Members
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.members.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">{member.email}</td>
                    <td className="py-3 px-4">{member.role}</td>
                    <td className="py-3 px-4 flex items-center space-x-2">
                      <select
                        value={member.role}
                        onChange={(e) => handleRoleChange(member.id, e.target.value)}
                        className="px-3 py-2 border rounded mr-2"
                      >
                        {state.roles.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">
            Roles Management
          </h2>
          <div className="mb-6 flex items-center space-x-4">
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-300"
              placeholder="Add new role"
            />
            <button
              onClick={handleAddRole}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Role
            </button>
          </div>
          <ul className="space-y-3">
            {state.roles.map((role) => (
              <li 
                key={role} 
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
              >
                <span className="text-gray-800">{role}</span>
                <button
                  onClick={() => handleDeleteRole(role)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <AddMemberModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        newMember={newMember}
        setNewMember={setNewMember}
        handleAddMember={handleAddMember}
        roles={state.roles}
      />
    </div>
  );
};

export default AdminDashboard;