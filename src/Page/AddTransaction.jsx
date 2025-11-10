import { useState } from "react";
import Swal from "sweetalert2";

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    type: "income",
    category: "",
    amount: "",
    description: "",
    date: "",
    email: "user@gmail.com", 
    name: "Hero" 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5173//add-transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      Swal.fire("Success!", "Transaction added successfully!", "success");
      setFormData({ ...formData, amount: "", description: "", date: "" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-base-200 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <select name="type" value={formData.type} onChange={handleChange} className="select select-bordered w-full">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select name="category" value={formData.category} onChange={handleChange} className="select select-bordered w-full">
          <option value="">Select Category</option>
          <option value="salary">Salary</option>
          <option value="home">Home</option>
          <option value="food">Food</option>
          <option value="others">Others</option>
        </select>

        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="input input-bordered w-full" />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="input input-bordered w-full" required />

        <button type="submit" className="btn btn-primary w-full">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
