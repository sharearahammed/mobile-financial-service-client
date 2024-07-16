/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import LoadingSpinner from '../Hook/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { auth, loading } = useAuth()
    const location = useLocation()
    const token = localStorage.getItem('token');

    if (loading) return <LoadingSpinner />
    if (auth) return children
    return token ? <Navigate to='/login' state={location.pathname} replace='true' />  : <Navigate to="/login" />;
};

export default PrivateRoute; 