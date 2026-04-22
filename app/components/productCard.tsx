import { Product } from "../interfaces/product";
import { useState } from "react";
import Image from "next/image";

export default function ProductCard({
  product,
  version,
}: {
  product: Product;
  version: number;
}) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="w-110 h-56 bg-white rounded-lg border border-gray-300 flex flex-row">
      <div className="relative w-45 h-full bg-gray-200 rounded-t-md shrink-0 rounded-lg">
        <Image
          className="rounded-lg"
          src={product.imageUrl}
          alt={product.name}
          fill
          loading="eager"
          sizes="45"
        />
      </div>
      <div
        className="p-4 flex flex-col flex-1 justify-between w-full"
        id="hello">
        {/* Top Content */}
        <div>
          <h2 className="text-m text-black font-semibold">
            {product.name.length > 45
              ? product.name.slice(0, 45) + "..."
              : product.name}
          </h2>
          <p className="text-black mt-4 text-xl font-extrabold">
            ${product.price}
          </p>
          {product.label.length > 0 && version === 1 ? (
            <p className="text-gray-950 bg-amber-400 mt-2 w-30 p-0.5 text-center rounded-md">
              {product.label}
            </p>
          ) : (
            ""
          )}
        </div>

      <button 
  className="bg-blue-500 hover:bg-blue-600 cursor-pointer transition-colors duration-200 text-white font-semibold px-4 py-2 rounded-md w-full mt-4" 
  onClick={() => setIsClicked(true)} 
>
  {isClicked ? "Added to Cart" : "Add to Cart"}
</button>
      </div>
    </div>
  );
}
