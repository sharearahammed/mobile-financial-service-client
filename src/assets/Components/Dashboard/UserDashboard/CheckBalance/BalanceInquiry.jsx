import axios from 'axios';
import { useEffect, useState } from 'react';

const BalanceInquiry = () => {
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('https://mobile-financial-server.vercel.app/balance', {
                    headers: { Authorization: token }
                });
                setBalance(response.data.balance);
            } catch (error) {
                setError('Error fetching balance');
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-semibold mb-5'>Balance Inquiry</h2>
            {error && <p>{error}</p>}
            {balance !== null ? (
                <p>Your balance is: {balance} Taka</p>
            ) : (
                <p>Loading balance...</p>
            )}
        </div>
    );
};

export default BalanceInquiry;
