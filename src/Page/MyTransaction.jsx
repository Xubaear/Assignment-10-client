import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import PrivateRoute from "../Provider/PrivateRoute";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router"; // keep same import you use for Link in your app (if your project imports Link differently, use that)

const MyTransaction = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/my-transactions?email=${user.email}`);
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

    // Re-fetch when AddTransaction dispatches this event
    const onUpdated = () => fetchTransactions();
    window.addEventListener("transactionsUpdated", onUpdated);

    return () => window.removeEventListener("transactionsUpdated", onUpdated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

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
        const res = await fetch(`http://localhost:3000/transaction/${id}`, { method: "DELETE" });
        if (res.ok) {
          // instant UI update
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
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">My Transactions</h2>

        {loading && <p className="text-center mb-4">Loading...</p>}

        {transactions.length === 0 && !loading ? (
          <p className="text-center">No transactions found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map(t => (
              <div key={t._id} className="card bg-base-200 shadow-md p-5">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg capitalize">{t.category}</h3>
                  <span className="text-sm">{t.type}</span>
                </div>

                <p className="mt-2">Amount: {Number(t.amount).toLocaleString()} Tk</p>
                <p>Date: {t.date ? new Date(t.date).toLocaleDateString() : "N/A"}</p>
                {t.description && <p className="mt-2">Note: {t.description}</p>}

                <div className="flex gap-3 mt-3">
                  <button onClick={() => handleUpdate(t._id)} className="btn btn-warning btn-sm">Update</button>
                  <button onClick={() => handleDelete(t._id)} className="btn btn-error btn-sm">Delete</button>
                  <button onClick={() => handleView(t._id)} className="btn btn-info btn-sm">View Details</button>
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
