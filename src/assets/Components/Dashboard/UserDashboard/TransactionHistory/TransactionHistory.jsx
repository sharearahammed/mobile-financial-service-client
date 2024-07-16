import axios from 'axios';
import { useEffect, useState } from 'react';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/transactions', {
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

    return (
        <div>
            <h2>Transaction History</h2>
            {error && <p>{error}</p>}
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction._id}>
                        {transaction.date}: {transaction.type} of {transaction.amount} Taka
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionHistory;
