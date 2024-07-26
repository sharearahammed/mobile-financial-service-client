import axios from 'axios';
import { useState } from 'react';
import useAuth from '../../../Hook/useAuth';

const CashInRequest = () => {
    const [agentMobile, setAgentMobile] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const {auth} = useAuth()

    const handleCashInRequest = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('https://mobile-financial-server.vercel.app/cash-in-request', {
                agent_email:auth.email,
                agent_mobileNumber:auth.mobileNumber,
                agentMobile,
                amount: parseFloat(amount),
            }, {
                headers: { Authorization: token }
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error sending cash-in request:', error);
            setMessage(error.response?.data?.message || 'Error sending cash-in request');
        }
    };

    return (
        <div className='md:h-screen flex flex-col justify-center items-center'>
            <h2 className='text-2xl font-semibold mb-5'>Cash-In Request</h2>
            <form onSubmit={handleCashInRequest}>
                <div className='flex flex-col gap-3'>
                    <label>Agent ID:</label>
                    <input className='border w-full rounded-sm border-black hover:border-blue-600 hover:border-2' type="text" value={agentMobile} onChange={(e) => setAgentMobile(e.target.value)} required />
                </div>
                <div className='flex flex-col gap-3'>
                    <label>Amount:</label>
                    <input className='border w-full rounded-sm border-black hover:border-blue-600 hover:border-2' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <div className='flex flex-col gap-3'>
                <button className='w-full mt-5 border py-2 rounded bg-blue-600 text-white hover:bg-blue-700' type="submit">Send Request</button>
                </div>
                
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CashInRequest;
