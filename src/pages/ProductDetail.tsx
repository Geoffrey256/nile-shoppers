import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, Truck, Shield, ArrowLeft, Minus, Plus, CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/currency";
import { useState } from "react";
import { getProductById, allProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(Number(id));
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/" className="text-primary hover:underline">Back to Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const avgRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : product.rating;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-4 md:py-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Product Image */}
          <div className="bg-card rounded-xl border p-4 flex items-center justify-center overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full max-h-[400px] object-contain" />
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="text-xl md:text-2xl font-bold text-foreground leading-tight">{product.name}</h1>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(avgRating) ? "text-accent fill-accent" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{avgRating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews?.length || 0} reviews) · {product.sold || 0} sold
              </span>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="bg-sale text-sale-foreground text-sm font-bold px-2 py-0.5 rounded">-{discount}%</span>
                  </>
                )}
              </div>
            </div>

            <Separator />
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2.5 hover:bg-secondary transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2.5 font-medium text-sm border-x min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2.5 hover:bg-secondary transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button onClick={handleAddToCart} className="flex-1 gap-2" size="lg">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-3"
                onClick={() => toggleItem(product)}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "text-sale fill-sale" : ""}`} />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <span>Free delivery around Kampala</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary shrink-0" />
                <span>1-year warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="reviews" className="mt-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="specs" className="bg-card rounded-lg border p-6 mt-4">
            {product.specs ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-dashed last:border-0">
                    <span className="text-sm font-medium text-muted-foreground">{key}</span>
                    <span className="text-sm font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No specifications available.</p>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="bg-card rounded-lg border p-6 mt-4">
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-5">
                {product.reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-foreground">{review.author}</span>
                        {review.verified && (
                          <span className="flex items-center gap-0.5 text-xs text-primary">
                            <CheckCircle className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-accent fill-accent" : "text-muted"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                    <Separator />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review this product!</p>
            )}
          </TabsContent>
        </Tabs>

        {(() => {
          const related = allProducts.filter(p => p.id !== product.id).slice(0, 6);
          return related.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-xl font-bold text-foreground mb-4">You May Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {related.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          ) : null;
        })()}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
