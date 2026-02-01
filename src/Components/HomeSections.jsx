import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
// import cr7 from '../src/assets/cr7.jpg';
// import lm10 from '../src/assets/lm10.jpg';
// import nj11 from '../src/assets/nj11.jpg';


const HomeSections = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* Features Section */}
      <section className="max-w-6xl mx-auto my-20 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-linear-to-r from-green-400 to-blue-500">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-[#DDF59D] dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-6 h-full">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Expense Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">Easily record and categorize all your income and expenses in one place.</p>
          </div>
          <div className="card bg-[#DDF59D] dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-6 h-full">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Visual Reports</h3>
            <p className="text-gray-600 dark:text-gray-300">Get insights with beautiful charts and graphs showing your spending patterns.</p>
          </div>
          <div className="card bg-[#DDF59D] dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-6 h-full">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Budget Planning</h3>
            <p className="text-gray-600 dark:text-gray-300">Set monthly budgets and track your progress towards financial goals.</p>
          </div>
          <div className="card bg-[#DDF59D] dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-6 h-full">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Secure & Private</h3>
            <p className="text-gray-600 dark:text-gray-300">Your financial data is encrypted and stored securely with industry standards.</p>
          </div>
          <div className="card bg-[#DDF59D] dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-6 h-full">
            <div className="text-4xl mb-4">📱</div>


            
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Mobile Friendly</h3>
            <p className="text-gray-600 dark:text-gray-300">Access your finances anywhere, anytime with our responsive design.</p>
          </div>
          <div className="card bg-[#DDF59D] dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-6 h-full">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Fast & Easy</h3>
            <p className="text-gray-600 dark:text-gray-300">Simple interface designed for quick transaction entry and management.</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto my-20 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-linear-to-r from-green-400 to-blue-500">Transaction Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
  {['Food', 'Transport', 'Salary', 'Shopping', 'Bills', 'Entertainment', 'Home', 'Others'].map((cat) => (
    <div 
      key={cat} 

      className="card dark:bg-gray-800 bg-[#DDF59D] text-gray-800 dark:text-white border border-gray-200 shadow-md rounded-xl p-4 text-center hover:scale-105 transition-transform cursor-pointer hover:shadow-lg hover:bg-[#CAF59D] dark:hover:bg-gray-500"
    >
      <div className="text-2xl mb-2">
        {cat === 'Food'
          ? '🍔'
          : cat === 'Transport'
          ? '🚗'
          : cat === 'Salary'
          ? '💵'
          : cat === 'Shopping'
          ? '🛍️'
          : cat === 'Bills'
          ? '📄'
          : cat === 'Entertainment'
          ? '🎬'
          : cat === 'Home'
          ? '🏠'
          : '📦'}
      </div>
      <h4 className="font-semibold">{cat}</h4>
    </div>
  ))}
</div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-6xl mx-auto my-20 px-4  rounded-2xl p-8 text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-linear-to-r from-green-400 to-blue-500">Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#DDF59D] dark:bg-gray-800 border border-gray-200 shadow-md rounded-xl p-4 text-black dark:text-white">
          <div className="text-center  m-12  border-2 glass shadow-xl rounded-2xl ">
            <div className="text-4xl font-bold mt-10 mb-2">1000+</div>
            <p className="text-lg opacity-90 mb-10">Active Users</p>
          </div>
          <div className="text-center m-11 border-2 glass shadow-xl rounded-2xl">
            <div className="text-4xl font-bold mt-10 mb-2">50K+</div>
            <p className="text-lg opacity-90 mb-10">Transactions Tracked</p>
          </div>
          <div className="text-center m-12 border-2 glass shadow-xl rounded-2xl">
            <div className="text-4xl font-bold mt-10 mb-2">99%</div>
            <p className="text-lg opacity-90 mb-10">User Satisfaction</p>
          </div>
          <div className="text-center m-12 border-2 glass shadow-xl rounded-2xl">
            <div className="text-4xl font-bold mt-10 mb-2">24/7</div>
            <p className="text-lg opacity-90 mb-10">Available Support</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto my-20 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-linear-to-r from-green-400 to-blue-500">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Ronaldo', role: 'Footballer', text: 'FinEase helped me track my monthly expenses and save for my laptop. The charts are amazing!' },
            { name: 'Messi', role: 'Freelancer', text: 'Best financial app I\'ve used. Simple, clean, and exactly what I needed to manage my income.' },
            { name: 'Neymar', role: 'Entrepreneur', text: 'The category tracking feature is a game-changer. I can see exactly where my money goes.' }
          ].map((testimonial, idx) => (
            <div key={idx} className="card bg-[#D9EBFF] dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div > 
                  {/* <img src={} alt="" /> */}
                  <div className="bg-green-500 text-white rounded-full w-12">
                    <span >

                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.text}"</p>
              <div className="flex text-yellow-400 mt-4">★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto my-20 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-linear-to-r from-green-400 to-blue-500">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Is my financial data secure?', a: 'Yes, we use industry-standard encryption to protect your data. Your information is private and secure.' },
            { q: 'Can I export my transaction data?', a: 'Yes, you can view and manage all your transactions. Export features are coming soon.' },
            { q: 'Is FinEase free to use?', a: 'Yes, FinEase is completely free. No hidden fees or subscriptions required.' },
            { q: 'How do I categorize my transactions?', a: 'When adding a transaction, simply select a category from the dropdown menu. You can choose from Food, Transport, Salary, and more.' },
            { q: 'Can I use FinEase on mobile?', a: 'Yes! FinEase is fully responsive and works perfectly on mobile phones, tablets, and desktops.' }
          ].map((faq, idx) => (
            <div key={idx} className="collapse collapse-plus bg-[#BED7F3] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-medium text-gray-900 dark:text-white">
                {faq.q}
              </div>
              <div className="collapse-content">
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-4xl mx-auto my-20 px-4">
        <div className="card bg-[#A0C8F5] dark:bg-gray-800 dark:text-white text-black shadow-2xl rounded-2xl p-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-6 opacity-90">Subscribe to our newsletter for financial tips and updates.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="input input-bordered flex-1 dark:text-white text-gray-800" />
            <button className="btn btn-neutral text-white bg-green-500 hover:bg-gray-900">Subscribe</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto my-20 px-4">
        <div className="card bg-[#74B0F5] dark:bg-gray-800 dark:text-white text-black shadow-2xl rounded-2xl p-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of users managing their money smarter with FinEase.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user && (
              <>
                <a href="/register" className="btn btn-lg bg-green-500 hover:bg-green-600 text-white border-none">Get Started Free</a>
                <a href="/explore" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-gray-900">Explore Features</a>
              </>
            )}
            {user && (
              <>
                <a href="/add-transaction" className="btn btn-lg bg-green-500 hover:bg-green-600 text-white border-none">Add Transaction</a>
                <a href="/reports" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-gray-900">View Reports</a>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSections;
