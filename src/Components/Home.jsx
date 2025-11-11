import React, { useEffect } from 'react';
import Banner from './Banner';
import Footer from './Footer';




const Home = () => {  
    
    useEffect(() => {
    document.title = 'Home';
  }, []);
    return (
        <div>
            <Banner></Banner>
            <Footer></Footer>
                
               
                


        </div>
        
    );
};

export default Home;