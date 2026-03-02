import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";
import AccountPage from "@/pages/Account";
import MyAccount from "@/pages/MyAccount";
import Orders from "@/pages/Orders";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Wishlist from "@/pages/Wishlist";
import Sell from "@/pages/Sell";
import Help from "@/pages/Help";
import AboutUs from "@/pages/AboutUs";
import ReturnPolicy from "@/pages/ReturnPolicy";
import Terms from "@/pages/Terms";
import FAQs from "@/pages/FAQs";
import TrackOrder from "@/pages/TrackOrder";
import Checkout from "@/pages/Checkout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <WishlistProvider>
          <Toaster />
          <Sonner />
          <CartDrawer />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/my" element={<MyAccount />} />
              <Route path="/account/orders" element={<Orders />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/help" element={<Help />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
