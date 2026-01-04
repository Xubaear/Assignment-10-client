import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../src/assets/img 1.png';
import img2 from '../../src/assets/img 2.png'
import img3 from '../../src/assets/img 3.png';
import img4 from '../../src/assets/img 4.png';

const Slider = () => {
    return (
        <Carousel className='flex justify-center items-center h-80 w-200 mx-auto mt-30 my-40'
         autoPlay={true}
                  infiniteLoop={true}
                  showThumbs={false}
        >
                <div >
                    <img src={img1} className='rounded-2xl' />
                    
                </div>
                <div>
                    <img src={img2} className='rounded-2xl' />
                    
                </div>
                <div>
                    <img src={img3} className='rounded-2xl' />
                    
                </div>
                <div>
                    <img src={img4} className='rounded-2xl' />
                    
                </div>
            </Carousel>
    );
};

export default Slider;