import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AuthProvider } from "@/contexts/AuthContext";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";
import AccountPage from "@/pages/Account";
import MyAccount from "@/pages/MyAccount";
import Orders from "@/pages/Orders";
import Notifications from "@/pages/Notifications";
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
import HotelListing from "@/pages/HotelListing";
import HotelDetail from "@/pages/HotelDetail";
import RoomDetail from "@/pages/RoomDetail";
import BookRoom from "@/pages/BookRoom";
import AdminGuard from "@/components/AdminGuard";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminVerify from "@/pages/admin/AdminVerify";
import AdminNotifications from "@/pages/admin/AdminNotifications";
import AdminSettings from "@/pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <Toaster />
              <Sonner />
              <CartDrawer />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/account/my" element={<MyAccount />} />
                <Route path="/account/orders" element={<Orders />} />
                <Route path="/account/notifications" element={<Notifications />} />
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
                <Route path="/category/hotel-booking" element={<HotelListing />} />
                <Route path="/hotel-booking/:id" element={<HotelDetail />} />
                <Route path="/hotel-booking/:hotelId/room/:tier" element={<RoomDetail />} />
                <Route path="/hotel-booking/:hotelId/book/:tier" element={<BookRoom />} />
                {/* Admin routes */}
                <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
                <Route path="/admin/users" element={<AdminGuard><AdminUsers /></AdminGuard>} />
                <Route path="/admin/products" element={<AdminGuard><AdminProducts /></AdminGuard>} />
                <Route path="/admin/orders" element={<AdminGuard><AdminOrders /></AdminGuard>} />
                <Route path="/admin/analytics" element={<AdminGuard><AdminAnalytics /></AdminGuard>} />
                <Route path="/admin/verify" element={<AdminGuard><AdminVerify /></AdminGuard>} />
                <Route path="/admin/notifications" element={<AdminGuard><AdminNotifications /></AdminGuard>} />
                <Route path="/admin/settings" element={<AdminGuard><AdminSettings /></AdminGuard>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
