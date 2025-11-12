import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import PrivateRoute from "../Provider/PrivateRoute";
import { AuthContext } from "../Provider/AuthProvider";

const UpdateTransaction = () => {
  
  const pathParts = window.location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  const { user } = useContext(AuthContext);

  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/transaction/${id}`);
      const data = await res.json();
      if (data) {
        setType(data.type || "income");
        setCategory(data.category || "");
        setAmount(data.amount ?? "");
        setDescription(data.description || "");
        if (data.date) {
          
          const d = new Date(data.date);
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          const dd = String(d.getDate()).padStart(2, "0");
          setDate(`${yyyy}-${mm}-${dd}`);
        } else {
          setDate("");
        }
      }
    } catch (err) {
      console.error("Failed to fetch transaction:", err);
      Swal.fire("Error", "Failed to fetch transaction data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Update Transaction";
    fetchTransaction();
    
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!category || !amount || !date) {
      Swal.fire("Missing", "Please fill required fields", "warning");
      return;
    }

    const updated = {
      type,
      category,
      amount: parseFloat(amount),
      description,
      date: new Date(date),
    
      email: user?.email,
      name: user?.displayName,
    };

    try {
      const res = await fetch(`http://localhost:3000/transaction/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      const data = await res.json();
      
      if (res.ok) {
        Swal.fire("Updated", "Transaction updated successfully", "success").then(() => {
         
          window.location.href = `/transaction/${id}`;
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", "Failed to update transaction", "error");
    }
  };

  return (
    <PrivateRoute>
      <div className="max-w-sm mx-auto mt-10 p-6 bg-gray-800 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Transaction</h2>

        {loading ? (
          <p className="text-center">Loading transaction...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="label">Type</label> <br />
            <select className="input mb-4" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <br />

            <label className="label">Category</label> <br />
            <select className="input mb-4" value={category} onChange={(e) => setCategory(e.target.value)} required>
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

            <button type="submit" className="btn btn-neutral w-full mt-4">
              Update Transaction
            </button>
          </form>
        )}
      </div>
    </PrivateRoute>
  );
};

export default UpdateTransaction;
