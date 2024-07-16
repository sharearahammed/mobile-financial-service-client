import { createBrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Main from "../Main/Main";
import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../Dashboard/DashboardHome/DashboardHome";
import AdminDashboard from "../Dashboard/AdminDashboard/AdminDashboard";
import SendMoney from "../Dashboard/UserDashboard/SendMoney/SendMoney";
import CashOut from "../Dashboard/UserDashboard/CashOut/CashOut";
import CashInRequest from "../Dashboard/UserDashboard/CashInRequest/CashInRequest";
import BalanceInquiry from "../Dashboard/UserDashboard/CheckBalance/BalanceInquiry";
import TransactionHistory from "../Dashboard/UserDashboard/TransactionHistory/TransactionHistory";

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
          },
          {
            path:"send-money",
            element:<PrivateRoute><SendMoney /></PrivateRoute>
          },
          {
            path:"cash-out",
            element:<PrivateRoute><CashOut/></PrivateRoute>
          },
          {
            path:"cash-in",
            element:<PrivateRoute><CashInRequest/></PrivateRoute>
          },
          {
            path:"balance-inquiry",
            element:<PrivateRoute>
              <BalanceInquiry/>
            </PrivateRoute>
          },
          {
            path:"transactions-history",
            element:<PrivateRoute>
              <TransactionHistory/>
            </PrivateRoute>
          }
        ]
    }
  ]);

  export default router;