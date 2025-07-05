import React from "react";
import ProductGrid from "./ProductGrid";
import { Product } from "@/sanity.types";

interface ProductsViewProps {
  products: Product[];
}

const ProductsView = ({ products }: ProductsViewProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Shop our Essentials</h2>
      <div className="flex-1">
        <ProductGrid products={products} />
        <hr className="w-1/2 sm:w-3/4" />
      </div>
    </div>
  );
};
export default ProductsView;
