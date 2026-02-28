import { Search, ShoppingCart, User, Menu, Heart, ChevronDown } from "lucide-react";
import { useState } from "react";

const categories = [
  "Phones & Tablets", "Electronics", "Fashion", "Home & Office",
  "Health & Beauty", "Computing", "Baby Products", "Gaming",
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-darker text-primary-foreground text-xs py-1.5">
        <div className="container flex justify-between items-center">
          <span>Free delivery on orders above $50 | Download the app</span>
          <div className="hidden md:flex gap-4">
            <span className="cursor-pointer hover:underline">Sell on Nile Shoppers</span>
            <span className="cursor-pointer hover:underline">Help</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-primary text-primary-foreground py-3">
        <div className="container flex items-center gap-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>

          <a href="/" className="font-black text-2xl tracking-tight shrink-0">
            NILE<span className="text-accent">SHOPPERS</span>
          </a>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex w-full rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search products, brands and categories"
                className="flex-1 px-4 py-2.5 text-foreground text-sm outline-none"
              />
              <button className="bg-accent px-5 hover:opacity-90 transition-opacity">
                <Search className="w-5 h-5 text-accent-foreground" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 ml-auto">
            <button className="hidden md:flex items-center gap-1.5 hover:opacity-80 text-sm">
              <User className="w-5 h-5" />
              <span>Account</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="hidden md:flex items-center gap-1.5 hover:opacity-80 text-sm">
              <Heart className="w-5 h-5" />
              <span>Wishlist</span>
            </button>
            <button className="relative flex items-center gap-1.5 hover:opacity-80 text-sm">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden md:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden container mt-2">
          <div className="flex rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2 text-foreground text-sm outline-none"
            />
            <button className="bg-accent px-4">
              <Search className="w-4 h-4 text-accent-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <nav className="bg-card border-b hidden lg:block">
        <div className="container flex items-center gap-1 py-1">
          {categories.map((cat) => (
            <a
              key={cat}
              href="#"
              className="px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors whitespace-nowrap"
            >
              {cat}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-card border-b animate-slide-in">
          <div className="container py-2 flex flex-col">
            {categories.map((cat) => (
              <a key={cat} href="#" className="px-3 py-2.5 text-sm hover:bg-secondary rounded-md">
                {cat}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
