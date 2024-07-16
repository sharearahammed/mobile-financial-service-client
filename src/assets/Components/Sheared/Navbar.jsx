import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth,setLoading,setAuth } = useAuth();

  const handleLogout = () => {
    setLoading(false)
    localStorage.removeItem("token");
    setAuth(false)
    navigate("/login");
  };
  const links = (
    <>
      <li className="text-gray-400 font-bold">
        <NavLink
          className={({ isActive, isPending }) =>
            isActive
              ? "text-blue-600 font-bold rounded-full"
              : isPending
              ? "pending"
              : ""
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      {auth && (
        <li className="text-gray-400 font-bold">
          <NavLink
            className={({ isActive, isPending }) =>
              isActive
                ? "text-blue-600 font-bold rounded-full"
                : isPending
                ? "pending"
                : ""
            }
            to={"dashboard"}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-black bg-opacity-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="font-extrabold text-[10px] md:text-xl">Mobile <span className="text-blue-600">Financial Service</span></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {auth ? (
          <>
            <button className="border px-4 py-2 rounded-lg border-black hover:bg-rose-500 hover:border-rose-500 hover:text-white font-semibold" onClick={handleLogout}>Signout</button>
          </> 
        ) : (
          <>
            <div className="flex items-center justify-center gap-4">
            <Link className="border px-2 md:px-4 md:py-2 rounded-lg border-black hover:bg-blue-600 hover:border-blue-600 hover:text-white font-semibold" to={"/login"}>Signin</Link>
            <Link className="border px-2 md:px-4 md:py-2 rounded-lg border-black hover:bg-blue-600 hover:border-blue-600 hover:text-white font-semibold" to={"/signup"}>Signup</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
