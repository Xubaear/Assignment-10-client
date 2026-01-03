import React, { useEffect } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";

const Contacts = () => {
     useEffect(() => {
        document.title = 'Contacts';
      }, []);
    return (
        <div>
            <h2 className='text-5xl font-semibold mt-10 ml-14'>Contact Us</h2>

            <p className='text-xl mt-10 ml-16'>Have any questions or feedback regarding FinEase? <br /> Whether you want to report a bug or suggest a feature, feel free to reach out to us.</p>

            <div className='flex justify-start items-center gap-7 ml-18 mt-10 border  w-100 p-5 rounded-xl bg-blue-100 dark:text-black'>

                <div className='text-[30px] '><LuPhone /></div>
               <div>
                 <span className='text-[20px] font-semibold' >Call Us:</span> <br /> 
                <span className='text-[18px]'>01966984999</span>
               </div>
            </div>

            <div className='flex justify-start items-center gap-7 ml-18 mt-10 border  w-100 p-5 rounded-xl bg-blue-100 dark:text-black'>

                <div className='text-[30px] '>
                    <MdOutlineEmail /> 
                </div>

                <div>
                    <span className='text-[20px] font-semibold'>Email Us:</span> <br /> 
                <span className='text-[18px]'>
                    zubaear.hasan7@gmail.com</span>
                </div>
            </div>

            <div className='flex justify-start items-center gap-7 ml-18 mt-10 my-20 border  w-100 p-5 rounded-xl bg-blue-100 dark:text-black'>
                
                <div className='text-[30px] '>
                    <SlLocationPin />
                </div>
                <div>
                    <span className='text-[20px] font-semibold' >Bangladesh</span> <br /> 
                <span className='text-[18px]'>
                    221B Baker Street, Dhaka
                </span>
                </div>
            </div>

            
        </div>
    );
};

export default Contacts;