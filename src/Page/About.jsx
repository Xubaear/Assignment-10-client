import React, { useEffect } from 'react';

const About = () => {

     useEffect(() => {
        document.title = 'About Us';
      }, []);
    return (
        
        <div>
            <div className='flex justify-around items-center gap-7 mt-20 my-20'>
                <div className='w-[30%]'>
                    <span className='text-5xl'>Welcome to FinEase</span> <br />
                    <p className='text-2xl'>– the simplest way to take control of your wallet.</p>
                </div>

                <div className='w-[50%] text-2xl'>
                    Managing personal finances shouldn't be complicated. FinEase allows you to: <br />
<br />
<li>Track: Record daily income and expenses effortlessly.</li>

<li>Plan: Set monthly budgets to avoid overspending.</li>

<li>Analyze: View insightful charts and reports to understand your spending habits.</li>

<li >Save: Set and track savings goals for your future dreams.
</li>
<p className='mt-4'>Whether you are a student or a professional, FinEase is designed to keep your finances organized and stress-free.</p>
                </div>
            </div>


            <div  className='flex justify-around items-center gap-7 mt-40 my-20'>
                <div className='w-[50%] text-2xl'>
                At FinEase, we believe that financial freedom starts with smart management. Unlike traditional wallets that only store your money, FinEase helps you understand where your money goes.
                <br />
                <br />
                
                We provide a comprehensive dashboard to track your daily income and expenses, set realistic monthly budgets, and visualize your savings goals. Our mission is to transform your financial data into actionable insights, helping you make smarter decisions for a secure future.
            </div>

            <div className='w-[30%] text-5xl'>
                Empowering Your Financial Journey
            </div>
            </div>


            <div className='flex justify-around items-center gap-7 mt-40 my-20'>
                <div className='w-[30%] text-5xl'>
                    About The Project
                </div>

                <div className='w-[50%] text-2xl'>
                    FinEase is a web application developed to demonstrate modern web development capabilities. Built with a robust backend and an interactive frontend, this project showcases core functionalities like Secure Authentication, CRUD Operations, and Dynamic Data Visualization. It is a testament to applying theoretical knowledge into a practical, real-world solution.
                </div>
            </div>


            <div className='flex justify-around items-center gap-7 mt-40 my-20'>
                <div className='w-[50%] text-2xl'>
                    While digital wallets facilitate your transactions, FinEase manages them. We don't just move money; we help you plan it. With intuitive dashboards and smart budgeting tools, we act as your personal digital accountant.
                </div>

                <div className='w-[30%] text-5xl'>
                    Why FinEase?
                </div>
            </div>
        </div>
    );
};

export default About;