import React from 'react';

const Banner = () => {
    return (
        <>

        <div>
            <section className=" max-w-6xl mx-auto  mt-12 flex items-center justify-center ">
  <div className="max-w-3xl  p-8 rounded-3xl bg-white/90 dark:bg-gray-800/80 text-center shadow-2xl">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
      Stop guessing where your money goes — know it.
    </h1>
    <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
      Save smarter, spend wisely, and plan your dreams. FinEase helps you take charge of your financial journey.
    </p>
  </div>
</section>

           
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


        
 <div className= 'flex justify-center items-center max-w-2xl mx-auto my-12'>
    <div class="banner">
      <p class="banner-title">Budgeting Tips - </p>
      <p class="small-desc">
       Smart budgeting isn’t about restricting yourself — it’s about making your money work for you.
Track every expense, set clear limits, and save a little each month.
Small steps in budgeting can create big financial freedom later.
      </p>
      <div class="go-corner">
        <div class="go-arrow">→</div>
      </div>
    </div>

    <div class="banner">
      <p class="banner-title">Why Financial Planning
Matters?</p>
      <p class="small-desc">
       Financial planning gives you direction and control over your goals.
It helps you prepare for emergencies, build savings, and invest wisely.
The sooner you plan, the sooner you secure your future.
      </p>
      <div class="go-corner">
        <div class="go-arrow">→</div>
      </div>
    </div>
 </div>
      
        </>
    );
};

export default Banner;