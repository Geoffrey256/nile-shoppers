import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Delivery", desc: "Around Kampala" },
  { icon: Shield, title: "Secure Payment", desc: "100% protected" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day return policy" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated help" },
];

const PromoBanner = () => {
  return (
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
  );
};

export default PromoBanner;
