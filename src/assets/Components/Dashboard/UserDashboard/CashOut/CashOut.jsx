import { useState } from 'react';
// import useAxiosCommon from '../../../Hook/useAxiosCommon';
import axios from 'axios';
import toast from 'react-hot-toast';

const CashOut = () => {
    const [agentId, setAgentId] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [message, setMessage] = useState('');

    const handleCashOut = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/cash-out', {
                agentId,
                amount: parseFloat(amount),
                pin,
            }, {
                headers: { Authorization: token }
            });
            setMessage(response.data.message);
            toast.success(response.data.message)
        } catch (error) {
            console.error('Error cashing out:', error);
            setMessage(error.response?.data?.message || 'Error cashing out');
            toast.error(error.response?.data?.message || 'Error cashing out');
        }
    };

    return (
        <div className='md:h-screen flex flex-col justify-center items-center'>
            <h2 className='text-2xl font-semibold mb-5'>Cash Out</h2>
            <form onSubmit={handleCashOut}>
                <div className='flex flex-col gap-3'>
                    <label>Agent ID:</label>
                    <input className='border w-full rounded-sm border-black hover:border-blue-600 hover:border-2' type="text" value={agentId} onChange={(e) => setAgentId(e.target.value)} required />
                </div>
                <div className='flex flex-col gap-3'>
                    <label>Amount:</label>
                    <input className='border w-full rounded-sm border-black hover:border-blue-600 hover:border-2' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required min="0.01" step="0.01" />
                </div>
                <div className='flex flex-col gap-3'>
                    <label>PIN:</label>
                    <input className='border w-full rounded-sm border-black hover:border-blue-600 hover:border-2' type="password" value={pin} onChange={(e) => setPin(e.target.value)} required />
                </div>
                <div>
                    <button className='w-full mt-5 border py-2 rounded bg-blue-600 text-white hover:bg-blue-700' type="submit">Cash Out</button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CashOut;
