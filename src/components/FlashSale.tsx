import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import ProductCard from "./ProductCard";
import { allProducts } from "@/data/products";

const flashProducts = allProducts.filter((p) => p.id >= 1 && p.id <= 6);

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