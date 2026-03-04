import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import gasCylinders from "@/assets/gas-cylinders.jpg";

const features = [
  { icon: Truck, title: "Free Delivery", desc: "Around Kampala" },
  { icon: Shield, title: "Secure Payment", desc: "100% protected" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day return policy" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated help" },
];

const PromoBanner = () => {
  return (
    <div className="space-y-4">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {features.map((f) => (
          <div key={f.title} className="flex items-center gap-2 sm:gap-3 bg-card border rounded-lg p-3 sm:p-4">
            <div className="p-1.5 sm:p-2 rounded-full bg-primary/10 shrink-0">
              <f.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-foreground">{f.title}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Gas Cylinders Banner */}
      <Link to="/category/cooking-appliances" className="relative overflow-hidden rounded-lg group block aspect-[3/1] sm:aspect-[4/1]">
        <img src={gasCylinders} alt="Gas Cylinders - Kitchen Appliances" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 to-transparent flex items-center">
          <div className="p-4 sm:p-8">
            <h3 className="text-primary-foreground font-black text-lg sm:text-3xl mb-1">Gas & Kitchen Appliances</h3>
            <p className="text-primary-foreground/80 text-xs sm:text-base mb-2 sm:mb-3">Cooking gas, cylinders, stoves & more</p>
            <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-4 py-2 rounded uppercase tracking-wide">Shop Now</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PromoBanner;
