import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=500&fit=crop&auto=format",
    title: "Mega Sale is Live!",
    subtitle: "Up to 70% off on Phones, Tablets & Laptops",
    cta: "Shop Phones & Tablets",
    link: "/category/phones-tablets",
  },
  {
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1200&h=500&fit=crop&auto=format",
    title: "Level Up Your Game",
    subtitle: "Top gaming gear at unbeatable prices",
    cta: "Shop Gaming",
    link: "/category/gaming",
  },
  {
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=500&fit=crop&auto=format",
    title: "Kitchen Essentials",
    subtitle: "Air fryers, blenders & more for your home",
    cta: "Shop Cooking Appliances",
    link: "/category/cooking-appliances",
  },
  {
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=500&fit=crop&auto=format",
    title: "Aquarium Paradise",
    subtitle: "Everything for your underwater world",
    cta: "Shop Aquariums",
    link: "/category/aquariums",
  },
  {
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=500&fit=crop&auto=format",
    title: "Fashion Forward",
    subtitle: "Trendy styles at amazing prices",
    cta: "Shop Fashion",
    link: "/category/fashion",
  },
  {
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=500&fit=crop&auto=format",
    title: "Computing Power",
    subtitle: "Laptops, desktops & accessories",
    cta: "Shop Computing",
    link: "/category/computing",
  },
  {
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=500&fit=crop&auto=format",
    title: "Electronics Deals",
    subtitle: "Smart TVs, speakers & gadgets on sale",
    cta: "Shop Electronics",
    link: "/category/electronics",
  },
  {
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&h=500&fit=crop&auto=format",
    title: "Home & Office",
    subtitle: "Upgrade your space with top picks",
    cta: "Shop Home & Office",
    link: "/category/home-office",
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full relative aspect-[21/9]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-transparent flex items-center">
              <div className="container">
                <div className="max-w-md text-primary-foreground">
                  <h2 className="text-3xl md:text-5xl font-black mb-2">{slide.title}</h2>
                  <p className="text-lg md:text-xl mb-4 opacity-90">{slide.subtitle}</p>
                  <Link
                    to={slide.link}
                    className="inline-block bg-accent text-accent-foreground font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity text-sm uppercase tracking-wide"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 hover:bg-card transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 hover:bg-card transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-accent" : "bg-card/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
