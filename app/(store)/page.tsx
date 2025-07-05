import Hero from "@/components/Hero";
import ProductsView from "@/components/ProductsView";
import { getAllProducts } from "@/sanity/lib/products/getProductBySlug";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>> Rendered the product page cache with ${products.length}`
  );
  return (
    <div className="px-6">
      <Hero />
      <div className="flex flex-col items-center min-h-screen p-4">
        <ProductsView products={products} />
      </div>
    </div>
  );
}
