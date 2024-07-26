import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../../../Hook/useAuth';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const {auth} = useAuth();

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`https://mobile-financial-server.vercel.app/user-transactions/${auth.mobileNumber}`, {
                    headers: { Authorization: token }
                });
                setTransactions(response.data.transactions);
            } catch (error) {
                setError('Error fetching transactions');
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);
    console.log("---------",transactions)

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-semibold mb-5'>Transaction History</h2>
            {error && <p>{error}</p>}
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction._id}>
                        {transaction.timestamp}: {transaction.type} of {transaction.amount} Taka
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionHistory;
