import React, { useEffect, useState, useContext } from "react";
import PrivateRoute from "../Provider/PrivateRoute";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const TransactionDetails = () => {

  const pathParts = window.location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  const { user } = useContext(AuthContext);
  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://fineease-server.vercel.app/transaction/${id}`);
      const data = await res.json();
      setTransaction(data || null);

     
      if (user?.email && data?.category) {
        const res2 = await fetch(`https://fineease-server.vercel.app/my-transactions?email=${user.email}`);
        const all = await res2.json();
        const sameCategory = (all || []).filter(t => t.category === data.category);
        const sum = sameCategory.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);
        setCategoryTotal(sum);
      } else {
        setCategoryTotal(0);
      }
    } catch (err) {
      console.error("Failed to fetch details:", err);
      Swal.fire("Error", "Failed to fetch transaction details", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Transaction Details";
    fetchDetails();
  }, [id, user?.email]);

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be deleted!",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://fineease-server.vercel.app/transaction/${id}`, { method: "DELETE" });
        if (res.ok) {
          Swal.fire("Deleted!", "Transaction removed successfully!", "success").then(() => {
            window.location.href = "/my-transactions";
          });
        } else {
          throw new Error("Delete failed");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete transaction", "error");
      }
    }
  };

  const handleUpdate = () => (window.location.href = `/transaction/update/${id}`);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!transaction) return <p className="text-center mt-6">Transaction not found.</p>;

  return (
    <PrivateRoute>
      <div className="max-w-3xl mx-auto my-10 p-6 bg-gray-300 dark:bg-gray-900 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>

        <div className="mb-4">
          <p><strong>Category:</strong> {transaction.category}</p>
          <p><strong>Type:</strong> {transaction.type}</p>
          <p><strong>Amount:</strong> {Number(transaction.amount).toLocaleString()} Tk</p>
          <p><strong>Date:</strong> {transaction.date ? new Date(transaction.date).toLocaleDateString() : ""}</p>
          <p><strong>Description:</strong> {transaction.description || ""}</p>
        </div>

        <div className="mb-4">
          <p><strong>Total for category - "{transaction.category}" :</strong> {Number(categoryTotal).toLocaleString()} Tk</p>
        </div>

        <div className="flex gap-3">
          <button onClick={handleUpdate} className="btn btn-warning btn-sm">Update</button>
          <button onClick={handleDelete} className="btn btn-error btn-sm">Delete</button>
          <button onClick={() => (window.location.href = "/my-transactions")} className="btn btn-ghost btn-sm">Back</button>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default TransactionDetails;
