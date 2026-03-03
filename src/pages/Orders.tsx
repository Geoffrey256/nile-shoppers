import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Package, Bell, Heart, LogOut, ShoppingBag, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/currency";

const sidebarLinks = [
  { to: "/account/my", label: "My Account", icon: User },
  { to: "/account/orders", label: "Orders", icon: Package, active: true },
  { to: "/account/notifications", label: "Notifications", icon: Bell },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
];

const sampleOrders = [
  {
    id: "ORD-284751",
    date: "2026-02-28",
    status: "delivered" as const,
    items: [{ name: "Samsung Galaxy S24 Ultra", qty: 1, price: 4500000, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop" }],
    total: 4500000,
  },
  {
    id: "ORD-193847",
    date: "2026-02-20",
    status: "in_transit" as const,
    items: [
      { name: "Air Fryer 6L", qty: 1, price: 185000, image: "https://images.unsplash.com/photo-1626509653291-18d9a934b9db?w=100&h=100&fit=crop" },
      { name: "Bluetooth Speaker", qty: 2, price: 75000, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop" },
    ],
    total: 335000,
  },
  {
    id: "ORD-102938",
    date: "2026-01-15",
    status: "cancelled" as const,
    items: [{ name: "Gaming Laptop", qty: 1, price: 3200000, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=100&h=100&fit=crop" }],
    total: 3200000,
  },
];

const statusBadge: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  delivered: { label: "Delivered", variant: "default" },
  in_transit: { label: "In Transit", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

const Orders = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-6">My Orders</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="space-y-1">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    link.active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
              <Separator className="my-3" />
              <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </Link>
            </div>

            {/* Content */}
            <div className="md:col-span-3 space-y-4">
              {sampleOrders.map((order) => {
                const badge = statusBadge[order.status];
                return (
                  <Card key={order.id}>
                    <CardHeader className="flex flex-row items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-sm font-bold">{order.id}</CardTitle>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{order.date}</span>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                          </div>
                          <p className="text-sm font-semibold text-foreground">{formatPrice(item.price * item.qty)}</p>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total</span>
                        <span className="font-bold text-primary">{formatPrice(order.total)}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
