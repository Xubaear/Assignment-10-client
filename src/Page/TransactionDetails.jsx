import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import PrivateRoute from "../Provider/PrivateRoute";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import foodImg from '../../src/assets/food.jpg';
import homeImg from '../../src/assets/home.jpg';
import othersImg from '../../src/assets/others.jpg';
import salaryimg from '../../src/assets/salary.webp';

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

  const navigate = useNavigate();
  const handleUpdate = () => navigate(`/transaction/update/${id}`);
  const handleBack = () => navigate("/my-transactions");

  const getCategoryImage = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('food')) return foodImg;
    if (cat.includes('salary')) return salaryimg;
    if (cat.includes('home')) return homeImg;
    return othersImg;
  };

  

  if (loading) {
    return (
      <PrivateRoute>
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      </PrivateRoute>
    );
  }

  if (!transaction) {
    return (
      <PrivateRoute>
        <div className="text-center mt-10 p-6">
          <p className="text-red-500 text-xl">Transaction not found.</p>
          <button onClick={handleBack} className="btn btn-primary mt-4">Back to Transactions</button>
        </div>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute>
      <div className="max-w-5xl mx-auto my-10 px-4">
        {/* Overview Section with Image */}
        <div className="card bg-[#C3CC99] dark:bg-gray-800 shadow-xl rounded-lg mb-6 overflow-hidden">
          <div className="h-64 md:h-80 bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <img 
              src={transaction.image || getCategoryImage(transaction.category)} 
              alt={transaction.category || 'Transaction'} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="card-body">
            <h2 className="card-title text-3xl mb-4 text-gray-900 dark:text-white">
              {transaction.title || transaction.category || 'Transaction Details'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-300 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white capitalize">{transaction.category || 'N/A'}</p>
              </div>
              <div className="bg-gray-300 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Type</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white capitalize">{transaction.type || 'N/A'}</p>
              </div>
              <div className="bg-gray-300 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Amount</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{Number(transaction.amount || 0).toLocaleString()} Tk</p>
              </div>
              <div className="bg-gray-300 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {transaction.date ? new Date(transaction.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'N/A'}
                </p>
              </div>
            </div>

            {transaction.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 p-4 bg-gray-300 dark:bg-gray-900 rounded-lg">
                  {transaction.description}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button onClick={handleUpdate} className="btn btn-warning">Update Transaction</button>
              <button onClick={handleDelete} className="btn btn-error">Delete Transaction</button>
              <button onClick={handleBack} className="btn btn-ghost">Back to Transactions</button>
            </div>
          </div>
        </div>

        {/* Key Information Section */}
        <div className="card bg-[#C3CC99] dark:bg-gray-800 shadow-xl rounded-lg mb-6">
          <div className="card-body">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Key Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                <span className="text-gray-600 dark:text-gray-400">Transaction ID</span>
                <span className="font-mono text-sm text-gray-900 dark:text-white">{transaction._id || id}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                <span className="text-gray-600 dark:text-gray-400">Total for Category</span>
                <span className="font-semibold text-lg text-green-600 dark:text-green-400">
                  {Number(categoryTotal || 0).toLocaleString()} Tk
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Category</span>
                <span className="font-semibold text-gray-900 dark:text-white capitalize">{transaction.category || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Categories Section with Images
        <div className="card bg-white dark:bg-gray-800 shadow-xl rounded-lg">
          <div className="card-body">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Transaction Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {relatedCategories.map((cat, idx) => (
                <div key={idx} className="text-center">
                  <div className="h-24 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2 overflow-hidden">
                    <img src={relatedImages[idx]} alt={cat} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{cat}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </PrivateRoute>
  );
};

export default TransactionDetails;
