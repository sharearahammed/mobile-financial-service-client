import { useState } from "react";
import useAxiosCommon from "../Hook/useAxiosCommon";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosCommon = useAxiosCommon();
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const handleSignup = async () => {
    navigate("/login");
    
    try {
      setLoading(true);
      await axiosCommon.post("/register", {
        name, 
        pin,
        mobileNumber,
        email,
        role,
      });
      toast.success("User Created Successfully!");
    }catch (error) {
      setLoading(false);
      console.error("Error signing up:", error);
      toast.error("Error signing up:", error);
    }
  };

  return (
    <div className="lg:h-screen flex flex-col justify-center items-center p-5 md:p-0 md:mt-5 md:mb-5 lg:mt-0 lg:mb-0">
      <h2 className="text-center text-2xl font-bold">Signup</h2>
      <div className="flex flex-col justify-center items-center">
        <div>
          <div className="py-2">
            <label>Name</label>
            <input
              className="input input-bordered w-full "
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="py-2">
            <label>PIN</label>
            <input
              className="input input-bordered hover:border-blue-800 w-full "
              type="password"
              placeholder="PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          <div className="py-2">
            <label>Mobile Number</label>
            <input
              className="input input-bordered w-full "
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="py-2">
            <label>Email</label>
            <input
              className="input input-bordered w-full "
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="py-2">
            <select
              className="w-full border p-[12px] rounded-xl"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <div className="py-2">
            <button
              disabled={loading}
              className="border shadow-lg hover:shadow-md hover:shadow-blue-600 border-black font-semibold py-[11px] rounded-lg w-full hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={handleSignup}
            >
              {loading ? (
                <ImSpinner9 className="text-2xl animate-spin m-auto" />
              ) : (
                "Signup"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
