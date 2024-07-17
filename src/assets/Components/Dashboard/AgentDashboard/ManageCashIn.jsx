/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../Hook/useAuth";

const ManageCashIn = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const{auth}=useAuth()

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/cash-in-requests",
          {
            headers: { Authorization: token },
          }
        );
        setRequests(response.data.requests);
      } catch (error) {
        setError("Error fetching cash-in requests");
        console.error("Error fetching cash-in requests:", error);
      }
    };
    fetchRequests();
  }, []);
  console.log("==========",requests)

  const handleApprove = async (requestId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/approve-cash-in",
        { 
            agent_email:auth.email,
            agent_mobileNumber:auth.mobileNumber,
            requestId },
        {
          headers: { Authorization: token },
        }
      );
      toast.success("Cash-in request approved successfully");
      setRequests(requests.filter((request) => request._id !== requestId));
    } catch (error) {
      setError("Error approving cash-in request");
      console.error("Error approving cash-in request:", error);
    }
  };

  return (
    <div className="pt-32 md:mt-20 lg:mt-0 md:h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-5">Manage Cash-In Requests</h2>
      {error && <p>{error}</p>}
      <div className="overflow-x-auto ml-56 md:ml-10 lg:ml-0">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>UserID</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {requests.map((request,idx) => (
            <tr key={request._id}>
                <td>{idx+1}</td>
              <td>{request.userId}</td>
              <td>{request.amount} Taka</td>
              <td>{request.status}</td>
              <td><button className='w-full mt-5 border px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700' type="submit" onClick={() => handleApprove(request._id)}>
                Approve
              </button></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCashIn;
