import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../src/assets/img 1.png';
import img2 from '../../src/assets/img 2.png'
import img3 from '../../src/assets/img 3.png';
import img4 from '../../src/assets/img 4.png';

const Slider = () => {
    return (
        <Carousel className='w-full max-w-4xl mx-auto mt-8 mb-8'
         autoPlay={true}
                  infiniteLoop={true}
                  showThumbs={false}
        >
                    <div className='px-4'>
                        <img src={img1} className='rounded-2xl w-full h-48 sm:h-64 object-cover' />
                    </div>
                <div>
                        <img src={img2} className='rounded-2xl w-full h-48 sm:h-64 object-cover' />
                    
                </div>
                <div>
                        <img src={img3} className='rounded-2xl w-full h-48 sm:h-64 object-cover' />
                    
                </div>
                <div>
                        <img src={img4} className='rounded-2xl w-full h-48 sm:h-64 object-cover' />
                    
                </div>
            </Carousel>
    );
};

export default Slider;