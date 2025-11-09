import React from 'react';

const Banner = () => {
    return (
        <>

        <div>
            <h1 className='text-2xl mt-3 max-w-2xl mx-auto p-5 rounded-2xl bg-gray-500'>Stop guessing where your money goes — know it. Save smarter, spend wisely, and plan your dreams.
        FinEase helps you take charge of your financial journey.</h1>

        <h2 className="text-5xl font-semibold mt-12 text-center">
            Manage Your Finaces With Ease
        </h2>

        </div>


        <div className='md:flex justify-center items-center gap-4  mt-12 max-w-2xl mx-auto'>
        
      
<div class="card" >
  <div class="card2" >
    <span className='text-4xl'>Balance</span>
            <p className='text-2xl mt-2'>5000 Taka</p>
  </div>
</div>

<div class="card">
  <div class="card2">
    <span className='text-4xl'>Income</span>
            <p  className='text-2xl mt-2'>5000 Taka</p>
  </div>
</div>

<div class="card">
  <div class="card2">
    <span className='text-4xl'>Expenses</span>
            <p  className='text-2xl mt-2'>5000 Taka</p>
  </div>
</div>
        </div>
      
        </>
    );
};

export default Banner;