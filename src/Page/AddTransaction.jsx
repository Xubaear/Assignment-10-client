import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTransaction = () => {
  const { user } = useContext(AuthContext);

  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !date || !category) {
      toast.error("Please fill all required fields!");
      return;
    }

    const transactionData = {
      type,
      category,
      amount: parseFloat(amount),
      description,
      date: new Date(date),
      email: user?.email,
      name: user?.displayName,
    };

    console.log("Submitting:", transactionData);

    try {
      const res = await fetch('https://fineease-server.vercel.app/add-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success('Transaction added successfully!');
        setType('income');
        setCategory('');
        setAmount('');
        setDescription('');
        setDate('');

        window.dispatchEvent(new Event('transactionsUpdated'));
      } else {
        toast.error('Failed to add transaction!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to add transaction!');
    }
  };

  useEffect(() => {
    document.title = 'Add Transaction';
  }, []);

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-gray-300 dark:bg-gray-800 shadow-md rounded-md mb-10 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label className="label text-gray-700 dark:text-gray-300">Type</label>
        <select
          className="input mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label className="label text-gray-700 dark:text-gray-300">Category</label>
        <select
          className="input mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="home">Home</option>
          <option value="food">Food</option>
          <option value="salary">Salary</option>
          <option value="other">Other</option>
        </select>

        <label className="label text-gray-700 dark:text-gray-300">Amount</label>
        <input
          type="number"
          className="input mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label className="label text-gray-700 dark:text-gray-300">Description</label>
        <input
          type="text"
          className="input mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="label text-gray-700 dark:text-gray-300">Date</label>
        <input
          type="date"
          className="input mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label className="label text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="text"
          className="input mb-4 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
          value={user?.email || ''}
          readOnly
        />

        

        <button type="submit" className="btn btn-neutral w-full mt-4">
          Add Transaction
        </button>
      </form>

     
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AddTransaction;
