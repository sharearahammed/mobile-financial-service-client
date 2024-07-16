import { useState } from 'react';
import useAxiosCommon from '../../../Hook/useAxiosCommon';

const SendMoney = () => {
    const axiosCommon = useAxiosCommon();
    const [recipientId, setRecipientId] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [message, setMessage] = useState('');

    const handleSendMoney = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axiosCommon.post('/send-money', {
                recipientId,
                amount: parseFloat(amount),
                pin,
            }, {
                headers: { Authorization: token }
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error sending money:', error);
            setMessage(error.response?.data?.message || 'Error sending money');
        }
    };

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h2 className='text-2xl font-semibold mb-5'>Send Money</h2>
            <form onSubmit={handleSendMoney}>
                <div className='flex flex-col gap-3'>
                    <label>Recipient ID:</label>
                    <input className='border w-full rounded-sm border-black hover:border-blue-600 hover:border-2' type="text" value={recipientId} onChange={(e) => setRecipientId(e.target.value)} required />
                </div>
                <div className='flex flex-col gap-3'>
                    <label>Amount:</label>
                    <input className='border w-full rounded-sm border-black hover:border-blue-600 hover:border-2' type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <div className='flex flex-col gap-3'>
                    <label>PIN:</label>
                    <input className='border w-full rounded-sm border-black hover:border-blue-600 hover:border-2' type="password" value={pin} onChange={(e) => setPin(e.target.value)} required />
                </div>
                <div>
                <button className='w-full mt-5 border py-2 rounded bg-blue-600 text-white hover:bg-blue-700' type="submit">Send Money</button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SendMoney;
