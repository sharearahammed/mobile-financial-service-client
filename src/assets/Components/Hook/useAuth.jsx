import { useEffect, useState } from "react";
import useAxiosCommon from "./useAxiosCommon";

const useAuth = () => {
    const axiosCommon = useAxiosCommon();
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axiosCommon.get('/profile', {
                        headers: { Authorization: token }
                    });
                    if (response.status === 200) {
                        setAuth(response.data.user);
                        console.log('User Information:', response.data.user);
                        setLoading(false);
                    } else {
                        localStorage.removeItem("token");
                        setAuth(false);
                        setLoading(false);
                    }
                } catch (error) {
                    setAuth(false);
                    console.error('Error fetching user data:', error);
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, [axiosCommon]);

    return { auth, loading,setLoading,setAuth };
};

export default useAuth;
