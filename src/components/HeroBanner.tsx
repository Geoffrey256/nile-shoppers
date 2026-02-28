import { useState, useEffect } from "react";
import heroBanner1 from "@/assets/hero-banner.png";
import heroBanner2 from "@/assets/hero-banner-2.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: heroBanner1,
    title: "Mega Sale is Live!",
    subtitle: "Up to 70% off on Electronics & Fashion",
    cta: "Shop Now",
  },
  {
    image: heroBanner2,
    title: "Flash Deals Every Day",
    subtitle: "New deals drop every 24 hours",
    cta: "See Deals",
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
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent flex items-center">
              <div className="container">
                <div className="max-w-md text-primary-foreground">
                  <h2 className="text-3xl md:text-5xl font-black mb-2">{slide.title}</h2>
                  <p className="text-lg md:text-xl mb-4 opacity-90">{slide.subtitle}</p>
                  <button className="bg-accent text-accent-foreground font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity text-sm uppercase tracking-wide">
                    {slide.cta}
                  </button>
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
