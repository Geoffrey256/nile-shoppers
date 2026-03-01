import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useWishlist } from "@/contexts/WishlistContext";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { items, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Heart className="w-6 h-6 text-sale" />
            My Wishlist ({items.length})
          </h1>
          {items.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearWishlist}>
              Clear All
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg border">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Save products you love by clicking the heart icon</p>
            <Button asChild>
              <Link to="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
