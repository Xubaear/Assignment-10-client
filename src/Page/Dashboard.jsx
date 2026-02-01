import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    transactionCount: 0,
  });

  useEffect(() => {
    document.title = 'Dashboard';
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`https://fineease-server.vercel.app/my-transactions?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      const tx = Array.isArray(data) ? data : [];
      setTransactions(tx);

      const income = tx.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount || 0), 0);
      const expenses = tx.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount || 0), 0);

      setStats({
        totalIncome: income,
        totalExpenses: expenses,
        balance: income - expenses,
        transactionCount: tx.length,
      });
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const recentTransactions = transactions.slice(0, 10);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-white">Dashboard Overview</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-[#DEFFFC] text-gray-700 shadow-xl rounded-lg">
          <div className="card-body">
            <h3 className="text-sm font-medium opacity-90">Total Income</h3>
            <p className="text-3xl font-bold">{Number(stats.totalIncome).toLocaleString()} Tk</p>
            <div className="text-2xl mt-2">💰</div>
          </div>
        </div>

        <div className="card bg-linear-[#62142E] to bg-amber-200 text-white shadow-xl rounded-lg">
          <div className="card-body">
            <h3 className="text-sm font-medium opacity-90">Total Expenses</h3>
            <p className="text-3xl font-bold">{Number(stats.totalExpenses).toLocaleString()} Tk</p>
            <div className="text-2xl mt-2">💸</div>
          </div>
        </div>

        <div className="card bg-linear-to-br from-blue-400 to-blue-600 text-white shadow-xl rounded-lg">
          <div className="card-body">
            <h3 className="text-sm font-medium opacity-90">Balance</h3>
            <p className="text-3xl font-bold">{Number(stats.balance).toLocaleString()} Tk</p>
            <div className="text-2xl mt-2">💳</div>
          </div>
        </div>

        <div className="card bg-linear-to-br from-purple-400 to-purple-600 text-white shadow-xl rounded-lg">
          <div className="card-body">
            <h3 className="text-sm font-medium opacity-90">Total Transactions</h3>
            <p className="text-3xl font-bold">{stats.transactionCount}</p>
            <div className="text-2xl mt-2">📊</div>
          </div>
        </div>
      </div>

      

      {/* Recent Transactions Table */}
      <div className="card bg-[#DDE7B0] dark:bg-gray-800 shadow-xl rounded-lg">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Recent Transactions</h2>
          {recentTransactions.length === 0 ? (
            <p className="text-center py-8 text-gray-600 dark:text-gray-400">
              No transactions yet. <Link to="/add-transaction" className="text-green-600 dark:text-green-400 hover:underline">Add your first transaction</Link>
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="border-gray-200 dark:border-gray-700">
                    <th className="text-gray-900 dark:text-white">Category</th>
                    <th className="text-gray-900 dark:text-white">Type</th>
                    <th className="text-gray-900 dark:text-white">Amount</th>
                    <th className="text-gray-900 dark:text-white">Date</th>
                    <th className="text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction._id} className="border-gray-200 dark:border-gray-700 hover:bg-[#CDE271] dark:hover:bg-gray-700">
                      <td className="text-gray-900 dark:text-white capitalize">{transaction.category || 'N/A'}</td>
                      <td>
                        <span className={`badge ${transaction.type === 'income' ? 'badge-success' : 'badge-error'}`}>
                          {transaction.type || 'N/A'}
                        </span>
                      </td>
                      <td className="font-semibold text-gray-900 dark:text-white">
                        {Number(transaction.amount || 0).toLocaleString()} Tk
                      </td>
                      <td className="text-gray-600 dark:text-gray-400">
                        {transaction.date ? new Date(transaction.date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td>
                        <Link
                          to={`/transaction/${transaction._id}`}
                          className="btn btn-sm btn-primary"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {transactions.length > 10 && (
                <div className="mt-4 text-center">
                  <Link to="/my-transactions" className="btn btn-outline">
                    View All Transactions ({transactions.length})
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
