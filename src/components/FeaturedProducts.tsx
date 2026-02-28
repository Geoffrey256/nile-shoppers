import ProductCard from "./ProductCard";

const products = [
  { id: 10, name: "iPhone 15 Pro Max 256GB", price: 999.99, originalPrice: 1199.99, image: "📱", rating: 4.8, sold: 1245 },
  { id: 11, name: "Samsung Galaxy S24 Ultra", price: 879.99, originalPrice: 1099.99, image: "📱", rating: 4.7, sold: 987 },
  { id: 12, name: "Nike Air Max 270 Running Shoes", price: 89.99, originalPrice: 149.99, image: "👟", rating: 4.5, sold: 2345 },
  { id: 13, name: "Sony WH-1000XM5 Headphones", price: 249.99, originalPrice: 349.99, image: "🎧", rating: 4.9, sold: 567 },
  { id: 14, name: "MacBook Air M3 13-inch", price: 1049.99, originalPrice: 1299.99, image: "💻", rating: 4.8, sold: 432 },
  { id: 15, name: "Dyson V15 Detect Vacuum", price: 499.99, originalPrice: 749.99, image: "🧹", rating: 4.6, sold: 876 },
  { id: 16, name: "Samsung 65\" 4K Smart TV", price: 599.99, originalPrice: 899.99, image: "📺", rating: 4.4, sold: 654 },
  { id: 17, name: "PS5 DualSense Controller", price: 49.99, originalPrice: 69.99, image: "🎮", rating: 4.7, sold: 3456 },
  { id: 18, name: "Instant Pot 8-Quart", price: 79.99, originalPrice: 119.99, image: "🍳", rating: 4.5, sold: 1234 },
  { id: 19, name: "Ray-Ban Aviator Sunglasses", price: 129.99, originalPrice: 179.99, image: "🕶️", rating: 4.3, sold: 890 },
];

const FeaturedProducts = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Top Deals</h2>
        <a href="#" className="text-sm font-medium text-primary hover:underline">See All</a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
