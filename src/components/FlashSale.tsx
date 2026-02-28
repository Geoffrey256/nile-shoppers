import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import ProductCard from "./ProductCard";

const flashProducts = [
  { id: 1, name: "Wireless Earbuds Pro", price: 29.99, originalPrice: 79.99, image: "🎧", rating: 4.5, sold: 234 },
  { id: 2, name: "Smart Watch Series 5", price: 89.99, originalPrice: 199.99, image: "⌚", rating: 4.3, sold: 189 },
  { id: 3, name: "Portable Bluetooth Speaker", price: 19.99, originalPrice: 49.99, image: "🔊", rating: 4.7, sold: 456 },
  { id: 4, name: "USB-C Fast Charger 65W", price: 14.99, originalPrice: 39.99, image: "🔌", rating: 4.6, sold: 312 },
  { id: 5, name: "Laptop Stand Adjustable", price: 24.99, originalPrice: 59.99, image: "💻", rating: 4.4, sold: 178 },
  { id: 6, name: "LED Desk Lamp", price: 18.99, originalPrice: 44.99, image: "💡", rating: 4.2, sold: 267 },
];

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="bg-card rounded-lg border p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-accent fill-accent" />
          <h2 className="text-xl font-bold text-foreground">Flash Sale</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-muted-foreground">Ends in:</span>
          {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((t, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="bg-sale text-sale-foreground font-mono font-bold text-sm px-2 py-1 rounded">
                {t}
              </span>
              {i < 2 && <span className="text-sale font-bold">:</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {flashProducts.map((product) => (
          <ProductCard key={product.id} product={product} isFlashSale />
        ))}
      </div>
    </section>
  );
};

export default FlashSale;
