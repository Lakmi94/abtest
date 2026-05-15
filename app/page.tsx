"use client"; 
import { useEffect, useState } from "react";
import ProductCard from "./components/productCard";
import productData from "./products.json";

export default function Home() {
  const [pageLoadIndex, setPageLoadIndex] = useState<number | null>(null);
  const [currentValue, setCurrentValue] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");

  const products = productData.map((item) => (
    <ProductCard key={item.id} product={item} version={currentValue} />
  ));

  const random = [
    2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 1, 2, 2, 1, 2,
    1, 2, 1, 2, 1,
  ];

  useEffect(() => {
    const storedIndex = localStorage.getItem("myArrayIndex");
    let nextIndex = 0;

    if (storedIndex !== null) {
      nextIndex = parseInt(storedIndex, 10) + 1;
    }

    localStorage.setItem("myArrayIndex", nextIndex.toString());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageLoadIndex(nextIndex);
    const currentVersion = random[nextIndex % random.length];
  setCurrentValue(currentVersion);

  }, []);



  // 2. Determine the current value (1 or 2)
  // The `% random.length` ensures that if nextIndex is 30, it loops back to 0.
  
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo / Brand */}
          <div className="text-2xl font-bold text-blue-600 cursor-pointer">
            ShopPortal
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products (try 'mouse')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 text-black border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation / User Menu */}
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-700 hidden md:flex">
            <a href="#" className="hover:text-blue-600 transition-colors">Categories</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Deals</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Account</a>
            <a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-8xl mx-auto py-9 px-6 sm:px-8 ">
        {searchQuery.trim().toLowerCase() === "mouse" ? (
          <div className="flex flex-wrap justify-center gap-3">
            {products}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
            {searchQuery ? (
              <p className="text-xl text-center">No results found for `{searchQuery}``. Try searching for `mouse`.</p>
            ) : (
              <p className="text-xl text-center">Search for products to see them here.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}