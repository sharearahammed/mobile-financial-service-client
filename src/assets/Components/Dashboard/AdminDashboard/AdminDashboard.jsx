import { useEffect, useState } from "react";
import useAxiosCommon from "../../Hook/useAxiosCommon";

const AdminDashboard = () => {
  const axiosCommon = useAxiosCommon();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axiosCommon.get("/admin/users", {
          headers: { Authorization: token },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [axiosCommon]);

  const handleApprove = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosCommon.post(
        "/admin/approve",
        { userId },
        {
          headers: { Authorization: token },
        }
      );
      if (response.status === 200) {
        setUsers(
          users.map((user) =>
            user._id === userId
              ? {
                  ...user,
                  status: "active",
                  balance:
                    user.role === "user"
                      ? 40
                      : user.role === "agent"
                      && 1000
                }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  return (
    <div className="md:h-screen md:mt-10 lg:mt-0 md:ml-12 flex flex-col justify-center lg:ml-16">
      <h2 className="mt-20 md:mt-0 text-center lg:mb-10 text-3xl font-semibold">
        Admin Dashboard
      </h2>

      <h3 className="mt-6 md:mt-0 text-xl font-semibold mb-2">
        Pending Users:
      </h3>
      <div className="overflow-x-auto mb-10">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.status === "pending")
              .map((user, idx) => (
                <tr key={user._id}>
                  <th>{idx + 1}</th>
                  <td>{user.name}</td>
                  <td> {user.email}</td>
                  <td> {user.role}</td>
                  <td> {user.status}</td>
                  <td>
                    <button
                      className="border px-4 py-2 rounded-lg border-blue-600 bg-blue-500 text-white hover:border-blue-700 hover:bg-blue-700"
                      onClick={() => handleApprove(user._id)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <h3 className="text-xl font-semibold mb-2">All Users:</h3>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>{user.name}</td>
                <td> {user.email}</td>
                <td> {user.role}</td>
                <td> {user.balance}</td>
                <td> {user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
