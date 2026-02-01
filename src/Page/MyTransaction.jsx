import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import PrivateRoute from "../Provider/PrivateRoute";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";

const MyTransaction = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("desc");

  const fetchTransactions = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await fetch(
        `https://fineease-server.vercel.app/my-transactions?email=${user.email}&sortBy=${sortBy}&order=${order}`
      );
      const data = await res.json();
      setTransactions(data || []);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "My Transactions";
    fetchTransactions();

    const onUpdated = () => fetchTransactions();
    window.addEventListener("transactionsUpdated", onUpdated);
    return () => window.removeEventListener("transactionsUpdated", onUpdated);
  }, [user?.email, sortBy, order]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://fineease-server.vercel.app/transaction/${id}`, { method: "DELETE" });
        if (res.ok) {
          setTransactions(prev => prev.filter(t => t._id !== id));
          Swal.fire("Deleted!", "Transaction removed successfully!", "success");
        } else {
          throw new Error("Delete failed");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete transaction", "error");
      }
    }
  };

  const handleUpdate = (id) => (window.location.href = `/transaction/update/${id}`);
  const handleView = (id) => (window.location.href = `/transaction/${id}`);

  return (
    <PrivateRoute>
      <div className="max-w-5xl mx-auto my-10">
        <h2 className="text-3xl font-bold mb-6 text-center">My Transactions</h2>

        
        <div className="flex justify-end mb-4 gap-3 py-5">
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="select select-bordered">
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>

          <select value={order} onChange={e => setOrder(e.target.value)} className="select select-bordered">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>

          <button onClick={fetchTransactions} className="btn btn-neutral btn-sm">Sort</button>
        </div>

        {loading && <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>}
        {transactions.length === 0 && !loading ? (
          <p className="text-center">No transactions found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map(t => (
              <div key={t._id} className="card bg-[#E2E4F6] dark:bg-gray-800 shadow-lg rounded-lg p-5 h-full flex flex-col border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg capitalize text-gray-900 dark:text-white">{t.category || 'N/A'}</h3>
                  <span className={`badge ${t.type === 'income' ? 'badge-success' : 'badge-error'}`}>{t.type || 'N/A'}</span>
                </div>
                <div className="flex-grow space-y-2 mb-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Amount:</span> <span className="text-green-600 dark:text-green-400 font-bold">{Number(t.amount || 0).toLocaleString()} Tk</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Date:</span> {t.date ? new Date(t.date).toLocaleDateString() : "N/A"}
                  </p>
                  {t.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                      <span className="font-semibold">Note:</span> {t.description}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <button onClick={() => handleUpdate(t._id)} className="btn btn-warning btn-sm flex-1">Update</button>
                  <button onClick={() => handleDelete(t._id)} className="btn btn-error btn-sm flex-1">Delete</button>
                  <button onClick={() => handleView(t._id)} className="btn btn-primary btn-sm w-full">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PrivateRoute>
  );
};

export default MyTransaction;
