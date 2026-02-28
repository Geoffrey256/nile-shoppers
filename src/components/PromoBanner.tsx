import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above $50" },
  { icon: Shield, title: "Secure Payment", desc: "100% protected" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day return policy" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated help" },
];

const PromoBanner = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {features.map((f) => (
        <div
          key={f.title}
          className="flex items-center gap-3 bg-card border rounded-lg p-4"
        >
          <div className="p-2 rounded-full bg-primary/10">
            <f.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{f.title}</p>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PromoBanner;
