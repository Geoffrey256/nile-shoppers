import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Package, Bell, Heart, LogOut, Check, Trash2, Info, AlertTriangle, Gift, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const sidebarLinks = [
  { to: "/account/my", label: "My Account", icon: User, id: "my" },
  { to: "/account/orders", label: "Orders", icon: Package, id: "orders" },
  { to: "/account/notifications", label: "Notifications", icon: Bell, id: "notifications" },
  { to: "/wishlist", label: "Wishlist", icon: Heart, id: "wishlist" },
];

const typeIcons: Record<string, any> = { info: Info, success: CheckCircle, warning: AlertTriangle, promo: Gift };
const typeColors: Record<string, string> = { info: "text-primary", success: "text-success", warning: "text-accent", promo: "text-accent" };

const Notifications = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    setNotifications(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    load();
    const channel = supabase.channel("user-notifs").on("postgres_changes", { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` }, () => load()).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, navigate]);

  const markRead = async (id: string) => { await supabase.from("notifications").update({ is_read: true } as any).eq("id", id); load(); };
  const markAllRead = async () => { if (!user) return; await supabase.from("notifications").update({ is_read: true } as any).eq("user_id", user.id).eq("is_read", false); toast({ title: "All marked as read" }); load(); };
  const deleteNotification = async (id: string) => { await supabase.from("notifications").delete().eq("id", id); load(); };
  const handleSignOut = async () => { await signOut(); navigate("/login"); };

  const unread = notifications.filter(n => !n.is_read).length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-4 sm:py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Notifications</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {sidebarLinks.map((link) => (
                <Link key={link.to} to={link.to}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    link.id === "notifications" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                  }`}>
                  <link.icon className="w-4 h-4" />{link.label}
                </Link>
              ))}
              <Separator className="hidden md:block my-3" />
              <button onClick={handleSignOut} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors whitespace-nowrap">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>

            <div className="md:col-span-3 space-y-3">
              {unread > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{unread} unread</span>
                  <Button variant="outline" size="sm" onClick={markAllRead}><Check className="w-3 h-3 mr-1" /> Mark all read</Button>
                </div>
              )}
              {loading && <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}
              {!loading && notifications.length === 0 && (
                <Card><CardContent className="py-8 text-center text-muted-foreground">No notifications yet</CardContent></Card>
              )}
              {notifications.map((n) => {
                const Icon = typeIcons[n.type] || Info;
                const color = typeColors[n.type] || "text-primary";
                return (
                  <Card key={n.id} className={`${!n.is_read ? "border-primary/30 bg-primary/5" : ""}`}>
                    <CardContent className="flex items-start gap-3 py-3">
                      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${color}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium text-foreground ${!n.is_read ? "font-semibold" : ""}`}>{n.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(n.created_at).toLocaleString()}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {!n.is_read && <Button variant="ghost" size="sm" onClick={() => markRead(n.id)}><Check className="w-3 h-3" /></Button>}
                        <Button variant="ghost" size="sm" onClick={() => deleteNotification(n.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-3 h-3" /></Button>
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

export default Notifications;
