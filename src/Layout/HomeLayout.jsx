import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';



const HomeLayout = () => {
    return (
        <div>
                    <Navbar />
                    <main className="site-content">
                        <Outlet />
                    </main>
                    <Footer />
        </div>
    );
};

export default HomeLayout;