import { Star, Heart, ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  sold?: number;
}

interface ProductCardProps {
  product: Product;
  isFlashSale?: boolean;
}

const ProductCard = ({ product, isFlashSale }: ProductCardProps) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-card rounded-lg border overflow-hidden group hover:shadow-lg transition-all duration-200">
      {/* Image area */}
      <div className="relative aspect-square bg-secondary flex items-center justify-center text-5xl">
        {product.image}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-sale text-sale-foreground text-xs font-bold px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}
        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-card">
          <Heart className="w-4 h-4 text-muted-foreground hover:text-sale" />
        </button>
        <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary-dark">
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>

      {/* Details */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1 leading-tight">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-base font-bold text-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating) ? "text-accent fill-accent" : "text-muted"
                }`}
              />
            ))}
          </div>
          {product.sold && (
            <span className="text-xs text-muted-foreground">({product.sold} sold)</span>
          )}
        </div>
        {isFlashSale && (
          <div className="mt-2 bg-secondary rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-sale h-full rounded-full transition-all"
              style={{ width: `${Math.min((product.sold || 0) / 5, 100)}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
