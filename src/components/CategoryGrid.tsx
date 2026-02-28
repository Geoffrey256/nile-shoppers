import { Smartphone, Monitor, Shirt, Home, Heart, Laptop, Baby, Gamepad2 } from "lucide-react";

const categories = [
  { name: "Phones & Tablets", icon: Smartphone, color: "bg-primary/10 text-primary" },
  { name: "Electronics", icon: Monitor, color: "bg-accent/10 text-accent" },
  { name: "Fashion", icon: Shirt, color: "bg-sale/10 text-sale" },
  { name: "Home & Office", icon: Home, color: "bg-success/10 text-success" },
  { name: "Health & Beauty", icon: Heart, color: "bg-primary/10 text-primary" },
  { name: "Computing", icon: Laptop, color: "bg-accent/10 text-accent" },
  { name: "Baby Products", icon: Baby, color: "bg-sale/10 text-sale" },
  { name: "Gaming", icon: Gamepad2, color: "bg-success/10 text-success" },
];

const CategoryGrid = () => {
  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg border hover:shadow-md transition-shadow group"
          >
            <div className={`p-3 rounded-full ${cat.color} group-hover:scale-110 transition-transform`}>
              <cat.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-foreground text-center leading-tight">
              {cat.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
