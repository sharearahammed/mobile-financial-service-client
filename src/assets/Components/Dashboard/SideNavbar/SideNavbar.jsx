/* eslint-disable react/prop-types */
import useAuth from "../../Hook/useAuth";
// import useAxiosCommon from "../../Hook/useAxiosCommon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";

const SideNavbar = ({ isActive, setActive, loginUser }) => {
  const { setLoading,setAuth } = useAuth();
//   const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setLoading(false)
    localStorage.removeItem("token");
    setAuth(false)
    navigate("/login");
  };

  return (
    <div>
      {/* Small Screen Navbar */}
      <div className="pt-5 fixed z-10 text-gray-800 flex justify-end w-full">
        <div className="flex justify-center items-center lg:mr-10">
          <div>
            {loginUser && (
              <div className="flex  flex-col">
                <div className="text-[10px] lg:text-[20px] flex pt-2 items-center gap-5">
                  <h1 className="">{loginUser.role}</h1> |
                  <h1 className="">{loginUser.name}</h1>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setActive(!isActive)}
          className="lg:hidden mobile-menu-button p-2 lg:p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#D7FFDD] w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          !isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-700 ease-in-out
        bg-gradient-to-r from-gray-300 to-blue-400`}
      >
        <div>
          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}
            <div>
              <div className=" w-full md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center mx-auto">
                <Link to={"/"} className="">
                  <div className=" flex justify-center items-center gap-2 lg:text-xl font-extrabold">
                    <h1>
                      Mobile{" "}
                      <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                        {" "}
                        Financial Service
                      </span>
                    </h1>
                  </div>
                </Link>
              </div>
            </div>
            <nav>
              {loginUser.role === "admin" ? (
                <>
                  {/* Home */}
                  <NavLink
                    to="admin-home"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive ? "bg-gray-200  text-gray-700" : "text-black"
                      }`
                    }
                  >
                    {/* <MdHomeWork className="w-5 h-5" /> */}
                    <img
                      className="w-7 h-7"
                      src="https://i.ibb.co/cY7rt52/76d26e52172a185614e9ce4d32e00d88.png"
                      alt=""
                    />

                    <span className="mx-4 font-medium">Home</span>
                  </NavLink>

                  
                </>
              ) : (
                ""
              )}
              {loginUser.role === "user" ? (
                <>
                  {/* Home */}
                  <NavLink
                    to="worker-home"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <MdHomeWork className="w-5 h-5" /> */}
                    <img
                      className="w-7 h-7"
                      src="https://i.ibb.co/cY7rt52/76d26e52172a185614e9ce4d32e00d88.png"
                      alt=""
                    />

                    <span className="mx-4 font-medium">Home</span>
                  </NavLink>
                  <NavLink
                    to="worker-tasklist"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <FaThList className="w-5 h-5" /> */}
                    <img
                      className="w-8 h-8"
                      src="https://i.ibb.co/zNsxP98/pngtree-task-list-line-icon-png-image-9133765.png"
                      alt=""
                    />

                    <span className="mx-4 font-medium">agent</span>
                  </NavLink>
                  <NavLink
                    to="worker-submission"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <FaClipboardList className="w-5 h-5" /> */}
                    <img
                      className="w-7 h-7"
                      src="https://i.ibb.co/cTpw7rm/4301554.png"
                      alt=""
                    />

                    <span className="mx-4 font-medium">My Submission</span>
                  </NavLink>
                  <NavLink
                    to="withdrawForm"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <PiHandWithdrawBold className="w-5 h-5" /> */}
                    <img
                      className="w-7 h-7"
                      src="https://i.ibb.co/nC9JB3Z/free-withdrawal-1795307-1522572.png"
                      alt=""
                    />

                    <span className="mx-4 font-medium">Withdrawals</span>
                  </NavLink>
                </>
              ) : (
                ""
              )}
              {loginUser.role === "TaskCreator" ? (
                <>
                  {/* Home */}
                  <NavLink
                    to="taskCreator-home"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <MdHomeWork className="w-5 h-5" /> */}
                    <img
                      className="w-7 h-7"
                      src="https://i.ibb.co/cY7rt52/76d26e52172a185614e9ce4d32e00d88.png"
                      alt=""
                    />

                    <span className="mx-4 font-medium">Home</span>
                  </NavLink>
                  <NavLink
                    to="addNewTask"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <MdOutlinePostAdd className="w-5 h-5" /> */}
                    <img
                      className="w-7 h-7"
                      src="https://i.ibb.co/DbLk0Tj/clipboard-task-add-regular-icon-202968.png"
                      alt=""
                    />

                    <span className="mx-4 font-medium">Add newTasks</span>
                  </NavLink>
                  <NavLink
                    to="my-listings"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <FaClipboardList className="w-5 h-5" /> */}
                    <img
                      className="w-9 h-7"
                      src="https://i.ibb.co/sHhhwSr/png-clipart-computer-icons-task-management-action-item-compliance-icon-angle-text-removebg-preview.png"
                      alt=""
                    />

                    <span className="mx-4 font-medium">MyTask’s</span>
                  </NavLink>
                  <NavLink
                    to="purchase-coin"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <PiCoins className="w-5 h-5" /> */}
                    <img
                      className="w-7 h-7"
                      src="https://i.ibb.co/K0w0SRf/coin-icon-coin-thin-line-icon-101027460-removebg-preview.png"
                      alt=""
                    />

                    <span className="mx-4 font-medium">Purchase Coin</span>
                  </NavLink>
                  <NavLink
                    to="payment-history"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-200 rounded-lg   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-200 rounded-lg  text-gray-700"
                          : "text-black"
                      }`
                    }
                  >
                    {/* <HiOutlineCurrencyDollar className="w-5 h-5" /> */}
                    <img
                      className="w-7 h-7"
                      src="https://i.ibb.co/2KL6XNk/4827568.png"
                      alt=""
                    />

                    <span className="mx-4 font-medium">Payment history</span>
                  </NavLink>
                </>
              ) : (
                ""
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <Link to={"/login"}>
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 mt-5 text-black hover:bg-gray-200 rounded-lg   hover:text-gray-700 transition-colors duration-300 transform"
            >
              {/* <GrLogout className="w-5 h-5" /> */}
              <img
                className="w-7 h-7"
                src="https://i.ibb.co/w6RTKgQ/logout-removebg-preview.png"
                alt=""
              />

              <span className="mx-4 font-medium">Logout</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
