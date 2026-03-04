import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Package, Bell, Heart, LogOut } from "lucide-react";
import { formatPrice } from "@/lib/currency";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { QRCodeSVG } from "qrcode.react";

const sidebarLinks = [
  { to: "/account/my", label: "My Account", icon: User, id: "my" },
  { to: "/account/orders", label: "Orders", icon: Package, id: "orders" },
  { to: "/account/notifications", label: "Notifications", icon: Bell, id: "notifications" },
  { to: "/wishlist", label: "Wishlist", icon: Heart, id: "wishlist" },
];

const statusBadge: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  pending: { label: "Pending", variant: "secondary" },
  processing: { label: "Processing", variant: "secondary" },
  shipped: { label: "Shipped", variant: "default" },
  in_transit: { label: "In Transit", variant: "default" },
  delivered: { label: "Delivered", variant: "default" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

const Orders = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    const load = async () => {
      const { data } = await supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      setOrders(data || []);
      setLoading(false);
    };
    load();

    const channel = supabase.channel("user-orders").on("postgres_changes", { event: "*", schema: "public", table: "orders", filter: `user_id=eq.${user.id}` }, () => load()).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, navigate]);

  const handleSignOut = async () => { await signOut(); navigate("/login"); };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-4 sm:py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">My Orders</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Sidebar */}
            <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {sidebarLinks.map((link) => (
                <Link key={link.to} to={link.to}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    link.id === "orders" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                  }`}>
                  <link.icon className="w-4 h-4" />{link.label}
                </Link>
              ))}
              <Separator className="hidden md:block my-3" />
              <button onClick={handleSignOut} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors whitespace-nowrap">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>

            {/* Content */}
            <div className="md:col-span-3 space-y-4">
              {loading && <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}

              {!loading && orders.length === 0 && (
                <Card><CardContent className="py-8 text-center text-muted-foreground">No orders yet. Start shopping!</CardContent></Card>
              )}

              {orders.map((order) => {
                const badge = statusBadge[order.status] || { label: order.status, variant: "secondary" as const };
                const items = Array.isArray(order.items) ? order.items : [];
                return (
                  <Card key={order.id}>
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-sm font-bold">{order.order_number}</CardTitle>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</span>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="shrink-0 flex justify-center sm:justify-start">
                          <QRCodeSVG value={JSON.stringify({ orderId: order.id, orderNumber: order.order_number })} size={80} level="M" />
                        </div>
                        <div className="flex-1 space-y-2">
                          {items.map((item: any, i: number) => (
                            <div key={i} className="flex items-center gap-3">
                              {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover" />}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                                <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                              </div>
                              <p className="text-sm font-semibold text-foreground">{formatPrice((item.price || 0) * (item.qty || 1))}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total</span>
                        <span className="font-bold text-primary">{formatPrice(Number(order.total))}</span>
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
