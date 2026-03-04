import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Edit2, Save, Package, Bell, Heart, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const sidebarLinks = [
  { to: "/account/my", label: "My Account", icon: User, id: "my" },
  { to: "/account/orders", label: "Orders", icon: Package, id: "orders" },
  { to: "/account/notifications", label: "Notifications", icon: Bell, id: "notifications" },
  { to: "/wishlist", label: "Wishlist", icon: Heart, id: "wishlist" },
];

const MyAccount = () => {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ full_name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    const load = async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (data) setProfile({ full_name: (data as any).full_name || "", email: (data as any).email || "", phone: (data as any).phone || "", address: (data as any).address || "" });
      setLoading(false);
    };
    load();
  }, [user, navigate]);

  const handleSave = async () => {
    if (!user) return;
    await supabase.from("profiles").update({
      full_name: profile.full_name,
      phone: profile.phone,
      address: profile.address,
    } as any).eq("id", user.id);
    setEditing(false);
    toast({ title: "Profile updated successfully" });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-4 sm:py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">My Account</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Sidebar */}
            <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {sidebarLinks.map((link) => (
                <Link key={link.to} to={link.to}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    link.id === "my" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
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
            <div className="md:col-span-3 space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <User className="w-5 h-5 text-primary" /> Personal Information
                  </CardTitle>
                  <Button variant={editing ? "default" : "outline"} size="sm" onClick={editing ? handleSave : () => setEditing(true)}>
                    {editing ? <><Save className="w-4 h-4 mr-1" /> Save</> : <><Edit2 className="w-4 h-4 mr-1" /> Edit</>}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Full Name</Label>
                      {editing ? <Input value={profile.full_name} onChange={(e) => setProfile(p => ({...p, full_name: e.target.value}))} />
                        : <p className="text-sm text-foreground bg-secondary rounded-lg px-3 py-2.5">{profile.full_name || "—"}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</Label>
                      <p className="text-sm text-foreground bg-secondary rounded-lg px-3 py-2.5">{profile.email || user?.email || "—"}</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone</Label>
                      {editing ? <Input value={profile.phone} onChange={(e) => setProfile(p => ({...p, phone: e.target.value}))} />
                        : <p className="text-sm text-foreground bg-secondary rounded-lg px-3 py-2.5">{profile.phone || "—"}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Address</Label>
                      {editing ? <Input value={profile.address} onChange={(e) => setProfile(p => ({...p, address: e.target.value}))} />
                        : <p className="text-sm text-foreground bg-secondary rounded-lg px-3 py-2.5">{profile.address || "—"}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { to: "/account/orders", label: "My Orders", icon: Package, color: "text-primary" },
                      { to: "/account/notifications", label: "Notifications", icon: Bell, color: "text-accent" },
                      { to: "/wishlist", label: "Wishlist", icon: Heart, color: "text-destructive" },
                      { to: "/track-order", label: "Track Order", icon: MapPin, color: "text-success" },
                    ].map((action) => (
                      <Link key={action.to} to={action.to}
                        className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg border hover:bg-secondary transition-colors text-center">
                        <action.icon className={`w-5 sm:w-6 h-5 sm:h-6 ${action.color}`} />
                        <span className="text-xs font-medium text-foreground">{action.label}</span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyAccount;
