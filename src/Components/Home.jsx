import React, { useEffect } from 'react';
import Banner from './Banner';
import HomeSections from './HomeSections';

const Home = () => {  
    useEffect(() => {
        document.title = 'Home';
    }, []);
    
    return (
        <div>
            <Banner />
            <HomeSections />
        </div>
    );
};

export default Home;