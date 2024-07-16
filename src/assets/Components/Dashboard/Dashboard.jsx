import { useEffect, useState } from "react";
import useAxiosCommon from "../Hook/useAxiosCommon";
import useAuth from "../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Hook/LoadingSpinner";
import SideNavbar from "./SideNavbar/SideNavbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const axiosCommon = useAxiosCommon();
  const [user, setUser] = useState(null);
  const{auth,loading} = useAuth();
  const [isActive, setActive] = useState(false);
  const closeSidebar = () => {
    setActive(false);
  };
  

  const { data: loginUser = [], isFetching } = useQuery({
    queryKey: ['userssss', auth.email],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/users/${auth.email}`);
      return data;
    },
    enabled: !!auth.email, // Only run the query if auth.email is available
    refetchOnWindowFocus: true, // Refetch on window focus
    refetchOnReconnect: true, // Refetch on reconnect
    refetchInterval: false, // Disable automatic refetching
  });

console.log("----------------",auth)
console.log("----------------",loginUser)

  useEffect(() => {
    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axiosCommon.get('/profile', {
                headers: { Authorization: token }
            });
            setUser(response.data.user);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    fetchUserData();
}, [axiosCommon]);

  if(loading || isFetching) return <LoadingSpinner />

  return (
    <div className='relative min-h-screen md:flex'
      >
      {/* Sidebar */}
      <SideNavbar isActive={isActive} setActive={setActive} loginUser={loginUser} />
      

      {/* Outlet --> Dynamic content */}
      <div onClick={closeSidebar} className='flex-1 md:pl-56'>
          <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
