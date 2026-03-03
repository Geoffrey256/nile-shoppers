import { Search, ShoppingCart, User, Menu, Heart, ChevronDown, Package, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  { name: "Phones & Tablets", slug: "phones-tablets" },
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Home & Office", slug: "home-office" },
  { name: "Health & Beauty", slug: "health-beauty" },
  { name: "Computing", slug: "computing" },
  { name: "Aquariums", slug: "aquariums" },
  { name: "Cooking Appliances", slug: "cooking-appliances" },
  { name: "Hotel Booking", slug: "hotel-booking" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, setIsOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-darker text-primary-foreground text-xs py-1.5">
        <div className="container flex justify-between items-center">
          <span>Deliveries around Kampala are free</span>
          <div className="hidden md:flex gap-4">
            <Link to="/sell" className="cursor-pointer hover:underline">
              Sell on Nile Shoppers Marketplace
            </Link>
            <Link to="/help" className="cursor-pointer hover:underline">
              Help
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-primary text-primary-foreground py-3">
        <div className="container flex items-center gap-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="font-black text-2xl tracking-tight shrink-0">
            NILE<span className="text-accent">SHOPPERS</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex w-full rounded-lg overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands and categories"
                className="flex-1 px-4 py-2.5 text-foreground text-sm outline-none"
              />
              <button type="submit" className="bg-accent px-5 hover:opacity-90 transition-opacity">
                <Search className="w-5 h-5 text-accent-foreground" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger className="hidden md:flex items-center gap-1.5 hover:opacity-80 text-sm outline-none">
                <User className="w-5 h-5" />
                <span>Account</span>
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/account/my" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account/orders" className="flex items-center gap-2 cursor-pointer">
                    <Package className="w-4 h-4" />
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex items-center gap-2 cursor-pointer">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/wishlist"
              className="hidden md:flex items-center gap-1.5 hover:opacity-80 text-sm relative"
            >
              <Heart className="w-5 h-5" />
              <span>Wishlist</span>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button className="relative flex items-center gap-1.5 hover:opacity-80 text-sm" onClick={() => setIsOpen(true)}>
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden md:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="md:hidden container mt-2">
          <div className="flex rounded-lg overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 text-foreground text-sm outline-none"
            />
            <button type="submit" className="bg-accent px-4">
              <Search className="w-4 h-4 text-accent-foreground" />
            </button>
          </div>
        </form>
      </div>

      {/* Category nav */}
      <nav className="bg-card border-b hidden lg:block">
        <div className="container flex items-center gap-1 py-1 overflow-x-auto">
          {categories.map((cat) => {
            const path = `/category/${cat.slug}`;
            const isActive = location.pathname === path;
            return (
              <Link
                key={cat.slug}
                to={path}
                className={`px-3 py-2 text-sm rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-foreground hover:text-primary hover:bg-secondary"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-card border-b animate-slide-in">
          <div className="container py-2 flex flex-col">
            {categories.map((cat) => {
              const path = `/category/${cat.slug}`;
              const isActive = location.pathname === path;
              return (
                <Link
                  key={cat.slug}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2.5 text-sm rounded-md ${
                    isActive ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-secondary"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
