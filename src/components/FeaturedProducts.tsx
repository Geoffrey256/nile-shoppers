import ProductCard from "./ProductCard";
import { allProducts } from "@/data/products";

const featuredProducts = allProducts.filter((p) => p.id >= 10);

const FeaturedProducts = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Top Deals</h2>
        <a href="#" className="text-sm font-medium text-primary hover:underline">See All</a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;