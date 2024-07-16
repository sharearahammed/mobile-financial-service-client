import { createBrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Main from "../Main/Main";
import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../Dashboard/DashboardHome/DashboardHome";
import AdminDashboard from "../Dashboard/AdminDashboard/AdminDashboard";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children:[
        {
            path:"/",
            element:<Home />
        },
        {
            path:"/login",
            element:<Login />
        },
        {
            path:"/signup",
            element:<Signup />
        }
      ]
    },
    {
        path:"dashboard",
        element:<PrivateRoute><Dashboard /></PrivateRoute>,
        children:[
          {
            index:true,
            element:<PrivateRoute>
              <DashboardHome />
            </PrivateRoute>
          },
          {
            path:"admin-home",
            element:<PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        ]
    }
  ]);

  export default router;