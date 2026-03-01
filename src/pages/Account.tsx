import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const AccountPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Account</h1>

      <div className="relative inline-block text-left">
        <button
          onClick={() => setMenuOpen((s) => !s)}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-darker focus:outline-none"
        >
          Select option
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>

        {menuOpen && (
          <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-card border">
            <Link
              to="/account/my"
              className="block px-4 py-2 text-sm text-foreground hover:bg-secondary"
              onClick={() => setMenuOpen(false)}
            >
              My Account
            </Link>
            <Link
              to="/account/orders"
              className="block px-4 py-2 text-sm text-foreground hover:bg-secondary"
              onClick={() => setMenuOpen(false)}
            >
              Orders
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2 text-sm text-foreground hover:bg-secondary"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;