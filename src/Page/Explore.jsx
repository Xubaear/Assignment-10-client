import React, { useEffect, useState } from 'react';
import SkeletonCard from '../Components/SkeletonCard';
import foodImg from '../../src/assets/food.jpg';
import homeImg from '../../src/assets/home.jpg';
import othersImg from '../../src/assets/others.jpg';
import salaryimg from '../../src/assets/salary.webp';
import reactSvg from '../../src/assets/react.svg';



const ITEMS_PER_PAGE = 12;

const Explore = () => {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    document.title = 'Explore';
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://fineease-server.vercel.app/transactions');
        if (!res.ok) {
          
          const res2 = await fetch('https://fineease-server.vercel.app/my-transactions');
          const data2 = await res2.json();
          setItems(Array.isArray(data2) ? data2 : []);
        } else {
          const data = await res.json();
          setItems(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to fetch items', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const cats = Array.from(new Set(items.map((i) => i.category).filter(Boolean)));
    setCategories(cats);
  }, [items]);

  useEffect(() => {
    let list = items.slice();
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((it) => (it.title || it.description || '').toLowerCase().includes(q));
    }
    if (category) {
      list = list.filter((it) => it.category === category);
    }

    list.sort((a, b) => {
      const va = a[sortBy];
      const vb = b[sortBy];
      if (sortBy === 'price' || sortBy === 'amount') {
        return (Number(va) - Number(vb)) * (order === 'asc' ? 1 : -1);
      }
      const da = new Date(va || a.date || 0).getTime();
      const db = new Date(vb || b.date || 0).getTime();
      return (da - db) * (order === 'asc' ? 1 : -1);
    });

    setFiltered(list);
    setPage(1);
  }, [items, query, category, sortBy, order]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-semibold mb-6">Explore</h1>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or description"
          className="input input-bordered w-full md:w-1/2"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="select select-bordered">
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select select-bordered">
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>

        <select value={order} onChange={(e) => setOrder(e.target.value)} className="select select-bordered">
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {pageItems.map((it) => {
                const cat = (it.category || '').toLowerCase();
                let src = it.image || reactSvg;
                if (!it.image) {
                  if (cat.includes('food')) src = foodImg;
                  else if (cat.includes('salary')) src = salaryimg; 
                  else if (cat.includes('home')) src = homeImg;
                  else src = othersImg;
                }

                return (
                  <article key={it._id || it.id} className="bg-[#E2E4F6] dark:bg-gray-800 rounded-lg shadow-md p-3 h-full flex flex-col border border-gray-200 dark:border-gray-700">
                    <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded mb-3 overflow-hidden shrink-0">
                      <img src={src} alt={it.title || it.category} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex justify-between items-center mb-3 mx-2">

                      <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-1">{it.title || it.category || 'Transaction'}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{it.description || 'No description provided.'}</p></div>


                      <div className="flex flex-col items-center  mb-3">



          
                       <div className="mt-auto">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mb-2">{it.type || 'Transaction'}</span>
                        {/* <a href={`/transaction/${it._id || it.id}`} className="btn btn-sm btn-primary w-full mt-2">View Details</a> */}
                      </div>
                      
                        <span className="font-semibold text-green-600 dark:text-green-400 text-lg">{it.amount ? `${it.amount} Tk` : '-'}</span>
                      



                    </div>
                     
                    </div>
                  </article>
                );
              })}
          </div>

          <div className="flex items-center justify-between mt-6">
            <div>
              Page {page} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
              <button className="btn btn-sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Explore;
