import React, { useEffect } from 'react';

const About = () => {

    useEffect(() => {
        document.title = 'About Us';
    }, []);

    return (
        <div className='px-4 md:px-0 overflow-x-hidden'> 
        {/* Added padding for mobile and hidden overflow */}

            {/* Section 1 */}
            <div className='flex flex-col md:flex-row justify-around items-center gap-7 mt-10 md:mt-20 my-10 md:my-20'>
                <div className='w-full md:w-[30%] text-center md:text-left'>
                    <span className='text-3xl md:text-5xl font-bold'>Welcome to FinEase</span> <br />
                    <p className='text-lg md:text-2xl mt-2'>– the simplest way to take control of your wallet.</p>
                </div>

                <div className='w-full md:w-[50%] text-lg md:text-2xl text-justify md:text-left mt-6 md:mt-0'>
                    Managing personal finances shouldn't be complicated. FinEase allows you to: <br />
                    <br />
                    <ul className='list-disc pl-5'>
                        <li>Track: Record daily income and expenses effortlessly.</li>
                        <li>Plan: Set monthly budgets to avoid overspending.</li>
                        <li>Analyze: View insightful charts and reports to understand your spending habits.</li>
                        <li>Save: Set and track savings goals for your future dreams.</li>
                    </ul>
                    <p className='mt-4'>Whether you are a student or a professional, FinEase is designed to keep your finances organized and stress-free.</p>
                </div>
            </div>

            {/* Section 2 */}
            {/* Added flex-col-reverse so text goes under title on mobile */}
            <div className='flex flex-col-reverse md:flex-row justify-around items-center gap-7 mt-16 md:mt-40 my-10 md:my-20'>
                <div className='w-full md:w-[50%] text-lg md:text-2xl text-justify md:text-left'>
                    At FinEase, we believe that financial freedom starts with smart management. Unlike traditional wallets that only store your money, FinEase helps you understand where your money goes.
                    <br />
                    <br />
                    We provide a comprehensive dashboard to track your daily income and expenses, set realistic monthly budgets, and visualize your savings goals. Our mission is to transform your financial data into actionable insights, helping you make smarter decisions for a secure future.
                </div>

                <div className='w-full md:w-[30%] text-3xl md:text-5xl font-bold text-center md:text-right mb-4 md:mb-0'>
                    Empowering Your Financial Journey
                </div>
            </div>

            {/* Section 3 */}
            <div className='flex flex-col md:flex-row justify-around items-center gap-7 mt-16 md:mt-40 my-10 md:my-20'>
                <div className='w-full md:w-[30%] text-3xl md:text-5xl font-bold text-center md:text-left mb-4 md:mb-0'>
                    About The Project
                </div>

                <div className='w-full md:w-[50%] text-lg md:text-2xl text-justify md:text-left'>
                    FinEase is a web application developed to demonstrate modern web development capabilities. Built with a robust backend and an interactive frontend, this project showcases core functionalities like Secure Authentication, CRUD Operations, and Dynamic Data Visualization. It is a testament to applying theoretical knowledge into a practical, real-world solution.
                </div>
            </div>

            {/* Section 4 */}
            {/* Added flex-col-reverse so text goes under title on mobile */}
            <div className='flex flex-col-reverse md:flex-row justify-around items-center gap-7 mt-16 md:mt-40 my-10 md:my-20 pb-10'>
                <div className='w-full md:w-[50%] text-lg md:text-2xl text-justify md:text-left'>
                    While digital wallets facilitate your transactions, FinEase manages them. We don't just move money; we help you plan it. With intuitive dashboards and smart budgeting tools, we act as your personal digital accountant.
                </div>

                <div className='w-full md:w-[30%] text-3xl md:text-5xl font-bold text-center md:text-right mb-4 md:mb-0'>
                    Why FinEase?
                </div>
            </div>
        </div>
    );
};

export default About;