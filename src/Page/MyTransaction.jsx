import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MyTransactions = () => {
    useEffect(()=>{
      document.title= 'My Transaction'
    })
  const [transactions, setTransactions] = useState([]);
  const userEmail = "user@gmail.com"; // logged-in user

  useEffect(() => {
    fetch(`http://localhost:5173//my-transactions?email=${userEmail}`)
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

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

  return (
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
              <button onClick={() => handleDelete(t._id)} className="btn btn-error btn-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTransactions;
