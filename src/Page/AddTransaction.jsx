import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const AddTransaction = () => {
  const { user } = useContext(AuthContext);

  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      type,
      category,
      amount: parseFloat(amount),
      description,
      date: new Date(date),
      email: user?.email,
      name: user?.displayName,
    };

    try {
      const res = await fetch('http://localhost:3000/add-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });

      const data = await res.json();

      if (data.insertedId) {
        alert('Transaction added successfully!');
        setType('income');
        setCategory('');
        setAmount('');
        setDescription('');
        setDate('');

        // 🔹 Dispatch custom event for Banner to update dynamically
        window.dispatchEvent(new Event('transactionsUpdated'));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to add transaction!');
    }
  };

  useEffect(() => {
    document.title = 'Add Transaction';
  }, []);

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-gray-800 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label className="label">Type</label> <br />
        <select
          className="input mb-4"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <br />

        <label className="label">Category</label> <br />
        <select
          className="input mb-4"
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
        <br />

        <label className="label">Amount</label> <br />
        <input
          type="number"
          className="input mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label className="label">Description</label>
        <input
          type="text"
          className="input mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <label className="label">Date</label> <br />
        <input
          type="date"
          className="input mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />

        <label className="label">Email</label> <br />
        <input
          type="text"
          className="input mb-4"
          value={user?.email || ''}
          readOnly
        />
        <br />

        <label className="label">Name</label> <br />
        <input
          type="text"
          className="input mb-4"
          value={user?.displayName || ''}
          readOnly
        />

        <button type="submit" className="btn btn-neutral w-full mt-4">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
