import { Smartphone, Monitor, Shirt, Home, Heart, Laptop, Fish, CookingPot, Hotel } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Phones & Tablets", slug: "phones-tablets", icon: Smartphone, color: "bg-primary/10 text-primary" },
  { name: "Electronics", slug: "electronics", icon: Monitor, color: "bg-accent/10 text-accent" },
  { name: "Fashion", slug: "fashion", icon: Shirt, color: "bg-sale/10 text-sale" },
  { name: "Home & Office", slug: "home-office", icon: Home, color: "bg-success/10 text-success" },
  { name: "Health & Beauty", slug: "health-beauty", icon: Heart, color: "bg-primary/10 text-primary" },
  { name: "Computing", slug: "computing", icon: Laptop, color: "bg-accent/10 text-accent" },
  { name: "Aquariums", slug: "aquariums", icon: Fish, color: "bg-accent/10 text-accent" },
  { name: "Kitchen Utensils", slug: "kitchen-utensils", icon: CookingPot, color: "bg-primary/10 text-primary" },
  { name: "Hotel Booking", slug: "hotel-booking", icon: Hotel, color: "bg-success/10 text-success" },
];

const CategoryGrid = () => {
  return (
    <section>
      <h2 className="text-xl font-bold text-foreground mb-4">Shop by Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/category/${cat.slug}`}
            className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg border hover:shadow-md transition-shadow group"
          >
            <div className={`p-3 rounded-full ${cat.color} group-hover:scale-110 transition-transform`}>
              <cat.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-foreground text-center leading-tight">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
