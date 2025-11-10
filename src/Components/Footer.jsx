import React from 'react';

const Footer = () => {
    return (
       <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
  <nav>
    <h6 className="footer-title text-lg font-bold mb-4 text-white">Services</h6>
    <a className="link link-hover hover:text-green-400 transition-colors duration-300">Finance</a>
    <a className="link link-hover hover:text-green-400 transition-colors duration-300">Investing</a>
    <a className="link link-hover hover:text-green-400 transition-colors duration-300">Marketing</a>
    <a className="link link-hover hover:text-green-400 transition-colors duration-300">Expense</a>
  </nav>

  <nav>
    <h6 className="footer-title text-lg font-bold mb-4 text-white">Company</h6>
    <a className="link link-hover hover:text-green-400 transition-colors duration-300">About us</a>
    <a className="link link-hover hover:text-green-400 transition-colors duration-300">Contact</a>
    <a className="link link-hover hover:text-green-400 transition-colors duration-300">Jobs</a>
    <a className="link link-hover hover:text-green-400 transition-colors duration-300">Press kit</a>
  </nav>

  <nav>
    <h6 className="footer-title text-lg font-bold mb-4 text-white">Legal</h6>
    <a className="link link-hover hover:text-green-400 transition-colors duration-300">Terms of use</a>
    <a className="link link-hover hover:text-green-400 transition-colors duration-300">Privacy policy</a>
    <a className="link link-hover hover:text-green-400 transition-colors duration-300">Cookie policy</a>
  </nav>
</footer>


    );
};

export default Footer;