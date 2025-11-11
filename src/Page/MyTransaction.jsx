import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import PrivateRoute from "../Provider/PrivateRoute";
import { AuthContext } from "../Provider/AuthProvider";

const MyTransaction = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    document.title = "My Transactions";
    if (user?.email) {
      fetch(`http://localhost:5173/my-transactions?email=${user.email}`)
        .then(res => res.json())
        .then(data => setTransactions(data));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be deleted!",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      await fetch(`http://localhost:5173/transaction/${id}`, { method: "DELETE" });
      setTransactions(transactions.filter(t => t._id !== id));
      Swal.fire("Deleted!", "Transaction removed successfully!", "success");
    }
  };

  const handleUpdate = (id) => window.location.href = `/transaction/update/${id}`;
  const handleView = (id) => window.location.href = `/transaction/${id}`;

  return (
    <PrivateRoute>
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">My Transactions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transactions.map(t => (
            <div key={t._id} className="card bg-base-200 shadow-md p-5">
              <h3 className="font-bold text-lg">{t.category}</h3>
              <p>Type: {t.type}</p>
              <p>Amount: {t.amount} Tk</p>
              <p>Date: {new Date(t.date).toLocaleDateString()}</p>
              <div className="flex gap-3 mt-3">
                <button onClick={() => handleUpdate(t._id)} className="btn btn-warning btn-sm">Update</button>
                <button onClick={() => handleDelete(t._id)} className="btn btn-error btn-sm">Delete</button>
                <button onClick={() => handleView(t._id)} className="btn btn-info btn-sm">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default MyTransaction;
