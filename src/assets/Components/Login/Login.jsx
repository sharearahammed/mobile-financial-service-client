import { useState } from 'react';
import useAxiosCommon from '../Hook/useAxiosCommon';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';

const Login = () => {
    const axiosCommon = useAxiosCommon()
    const [mobileOrEmail, setMobileOrEmail] = useState('');
    const [pin, setPin] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try { 
            setLoading(true);
            const response = await axiosCommon.post('/login', { mobileOrEmail, pin });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard')
            toast.success("login successful")
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="lg:h-screen flex flex-col justify-center items-center mt-5 md:mt-5 md:mb-5 lg:mt-0 lg:mb-0 p-5 md:p-0">
            <h2 className="text-center text-2xl font-bold">Login</h2>
            <div className="flex flex-col justify-center items-center">
            <div>
            <div className='py-2'>
            <label>Mobile or Email</label>
            <input className="input input-bordered w-full " type="text" placeholder="Mobile or Email" value={mobileOrEmail} onChange={(e) => setMobileOrEmail(e.target.value)} />
            </div>
            <div className='py-2'>
            <label>PIN</label>
            <input className="input input-bordered w-full " type="password" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} />
            </div>
            <div className='py-4'>
            <button className="border shadow-lg hover:shadow-md hover:shadow-blue-600 border-black font-semibold py-[11px] rounded-lg w-full hover:border-blue-600 hover:bg-blue-600 hover:text-white" onClick={handleLogin}>
            {loading ? (
                <ImSpinner9 className="text-2xl animate-spin m-auto" />
              ) : (
                "Login"
              )}
            </button>
            </div>
            </div>
            </div>
        </div>
    );
};

export default Login;
