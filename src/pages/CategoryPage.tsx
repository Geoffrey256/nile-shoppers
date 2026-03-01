import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/products";
import { ArrowLeft } from "lucide-react";

const categoryProductMap: Record<string, number[]> = {
  "phones-tablets": [10, 11],
  "electronics": [1, 2, 3, 4, 16],
  "fashion": [12, 19],
  "home-office": [5, 6, 15],
  "health-beauty": [],
  "computing": [14],
  "baby-products": [],
  "gaming": [17],
  "aquariums": [20, 21, 22, 23],
  "cooking-appliances": [24, 25, 26, 27],
};

const categoryNames: Record<string, string> = {
  "phones-tablets": "Phones & Tablets",
  "electronics": "Electronics",
  "fashion": "Fashion",
  "home-office": "Home & Office",
  "health-beauty": "Health & Beauty",
  "computing": "Computing",
  "baby-products": "Baby Products",
  "gaming": "Gaming",
  "aquariums": "Aquariums",
  "cooking-appliances": "Cooking Appliances",
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const name = categoryNames[slug || ""] || "Category";
  const productIds = categoryProductMap[slug || ""] || [];
  const products = allProducts.filter((p) => productIds.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-4 md:py-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-6">{name}</h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No products in this category yet.</p>
            <Link to="/" className="text-primary hover:underline mt-2 inline-block">Browse all products</Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
