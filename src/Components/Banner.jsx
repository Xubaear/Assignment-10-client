import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Banner = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  
  const fetchTransactions = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:3000/my-transactions?email=${user.email}`);
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();

    
    const handleUpdate = () => fetchTransactions();
    window.addEventListener('transactionsUpdated', handleUpdate);

    return () => window.removeEventListener('transactionsUpdated', handleUpdate);
  }, [user]);

  
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  return (
    <>
      <div>
        <section className=" max-w-6xl mx-auto mt-12 flex items-center justify-center">
          <div className="max-w-3xl p-8 rounded-3xl bg-white/90 dark:bg-gray-800/80 text-center shadow-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
              Stop guessing where your money goes — know it.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Save smarter, spend wisely, and plan your dreams. FinEase helps you take charge of your financial journey.
            </p>
          </div>
        </section>

        <h2 className="text-6xl font-semibold my-12 text-center bg-clip-text text-transparent bg-linear-to-r from-green-400 to-blue-500">
          Manage Your Finances With Ease
        </h2>
      </div>

     
      <div className='flex flex-col md:flex-row justify-center items-center gap-4 mt-12 max-w-2xl mx-auto'>
        <div className="cart">
          <div className="cart2">
            <span className='text-4xl  text-gray-900 dark:text-white'>Balance</span>
            <p className='text-2xl mt-2  text-gray-800 dark:text-gray-200'>{balance} Taka</p>
          </div>
        </div>

        <div className="cart">
          <div className="cart2">
            <span className='text-4xl'>Income</span>
            <p className='text-2xl mt-2'>{income} Taka</p>
          </div>
        </div>

        <div className="cart">
          <div className="cart2">
            <span className='text-4xl'>Expenses</span>
            <p className='text-2xl mt-2'>{expenses} Taka</p>
          </div>
        </div>
      </div>

      <div className='flex justify-center items-center max-w-2xl mx-auto my-12'>
        <div className="banner">
          <p className="banner-title">Budgeting Tips - </p>
          <p className="small-desc">
            Smart budgeting isn’t about restricting yourself — it’s about making your money work for you.
            Track every expense, set clear limits, and save a little each month.
            Small steps in budgeting can create big financial freedom later.
          </p>
          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </div>

        <div className="banner">
          <p className="banner-title">Why Financial Planning Matters?</p>
          <p className="small-desc">
            Financial planning gives you direction and control over your goals.
            It helps you prepare for emergencies, build savings, and invest wisely.
            The sooner you plan, the sooner you secure your future.
          </p>
          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
