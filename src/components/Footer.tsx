import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary-darker text-primary-foreground mt-8">
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-black text-xl mb-4">
              NILE<span className="text-accent">SHOPPERS</span>
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Your one-stop shop for the best deals on electronics, fashion, home & more.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/about" className="hover:opacity-100 hover:underline">About Us</Link></li>
              <li><Link to="/return-policy" className="hover:opacity-100 hover:underline">Return Policy</Link></li>
              <li><Link to="/terms" className="hover:opacity-100 hover:underline">Terms & Conditions</Link></li>
              <li><Link to="/faqs" className="hover:opacity-100 hover:underline">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/help" className="hover:opacity-100 hover:underline">Help Center</Link></li>
              <li><Link to="/track-order" className="hover:opacity-100 hover:underline">Track Order</Link></li>
              <li><Link to="/faqs" className="hover:opacity-100 hover:underline">FAQs</Link></li>
              <li><Link to="/sell" className="hover:opacity-100 hover:underline">Sell on Nile Shoppers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@nileshoppers.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +256764593420</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Paidha, Zombo, Uganda</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-60">© 2026 Nile Shoppers. All rights reserved.</p>
          <div className="flex gap-4 text-sm opacity-60">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>📱 MTN MoMo</span>
            <span>📱 Airtel Money</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
