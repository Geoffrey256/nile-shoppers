import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Package, Bell, Heart, LogOut, Check, Trash2, ShoppingBag, Tag, Truck, Star } from "lucide-react";

const sidebarLinks = [
  { to: "/account/my", label: "My Account", icon: User },
  { to: "/account/orders", label: "Orders", icon: Package },
  { to: "/account/notifications", label: "Notifications", icon: Bell, active: true },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
];

interface Notification {
  id: string;
  type: "order" | "promo" | "delivery" | "review";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: "1", type: "delivery", title: "Order Out for Delivery", message: "Your order ORD-193847 is out for delivery. Expected arrival by 4 PM today.", time: "2 hours ago", read: false },
  { id: "2", type: "promo", title: "Flash Sale: Up to 50% Off!", message: "Don't miss our weekend flash sale on Electronics and Fashion. Limited time only!", time: "5 hours ago", read: false },
  { id: "3", type: "order", title: "Order Confirmed", message: "Your order ORD-193847 has been confirmed and is being prepared for shipping.", time: "1 day ago", read: false },
  { id: "4", type: "review", title: "Rate Your Purchase", message: "How was your Samsung Galaxy S24 Ultra? Leave a review and help other shoppers.", time: "3 days ago", read: true },
  { id: "5", type: "promo", title: "New Arrivals in Computing", message: "Check out the latest laptops and accessories just added to our marketplace.", time: "5 days ago", read: true },
  { id: "6", type: "delivery", title: "Order Delivered", message: "Your order ORD-284751 has been delivered successfully. Thank you for shopping with us!", time: "1 week ago", read: true },
];

const typeIcon: Record<string, { icon: typeof Bell; color: string }> = {
  order: { icon: ShoppingBag, color: "text-primary bg-primary/10" },
  promo: { icon: Tag, color: "text-accent bg-accent/10" },
  delivery: { icon: Truck, color: "text-success bg-success/10" },
  review: { icon: Star, color: "text-yellow-500 bg-yellow-500/10" },
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((ns) => ns.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const deleteNotification = (id: string) =>
    setNotifications((ns) => ns.filter((n) => n.id !== id));

  const clearAll = () => setNotifications([]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-6">Notifications</h1>

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
            <div className="md:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
                </p>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <Button variant="outline" size="sm" onClick={markAllRead}>
                      <Check className="w-3.5 h-3.5 mr-1" /> Mark all read
                    </Button>
                  )}
                  {notifications.length > 0 && (
                    <Button variant="outline" size="sm" onClick={clearAll} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear all
                    </Button>
                  )}
                </div>
              </div>

              {notifications.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Bell className="w-12 h-12 text-muted-foreground opacity-30 mb-3" />
                    <p className="font-medium text-foreground">No notifications</p>
                    <p className="text-sm text-muted-foreground">You're all caught up!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2">
                  {notifications.map((n) => {
                    const { icon: Icon, color } = typeIcon[n.type];
                    return (
                      <div
                        key={n.id}
                        className={`flex items-start gap-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                          n.read ? "bg-card" : "bg-primary/5 border-primary/20"
                        }`}
                        onClick={() => markRead(n.id)}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-semibold text-foreground ${!n.read ? "" : "opacity-70"}`}>
                              {n.title}
                            </p>
                            {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notifications;
