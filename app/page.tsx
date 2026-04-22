"use client"; 
import { useEffect, useState } from "react";
import ProductCard from "./components/productCard";
import productData from "./products.json";

export default function Home() {
  const [pageLoadIndex, setPageLoadIndex] = useState<number | null>(null);
const [currentValue, setCurrentValue] = useState<number>(1);
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
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-9 px-6 bg-white sm:items-start">
        <div className="flex flex-wrap justify-center gap-10">{products}</div>
      </main>
    </div>
  );
}