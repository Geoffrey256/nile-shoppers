import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Edit2, Save, Package, Bell, Heart, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sidebarLinks = [
  { to: "/account/my", label: "My Account", icon: User, active: true },
  { to: "/account/orders", label: "Orders", icon: Package },
  { to: "/account/notifications", label: "Notifications", icon: Bell },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
];

const MyAccount = () => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+256 700 000 000",
    address: "Kampala, Uganda",
  });

  const update = (field: string, value: string) =>
    setProfile((p) => ({ ...p, [field]: value }));

  const handleSave = () => {
    setEditing(false);
    toast({ title: "Profile updated successfully" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-6">My Account</h1>

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
              <Link
                to="/login"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Link>
            </div>

            {/* Content */}
            <div className="md:col-span-3 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <Button
                    variant={editing ? "default" : "outline"}
                    size="sm"
                    onClick={editing ? handleSave : () => setEditing(true)}
                  >
                    {editing ? <><Save className="w-4 h-4 mr-1" /> Save</> : <><Edit2 className="w-4 h-4 mr-1" /> Edit</>}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Full Name</Label>
                      {editing ? (
                        <Input value={profile.fullName} onChange={(e) => update("fullName", e.target.value)} />
                      ) : (
                        <p className="text-sm text-foreground bg-secondary rounded-lg px-3 py-2.5">{profile.fullName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</Label>
                      {editing ? (
                        <Input type="email" value={profile.email} onChange={(e) => update("email", e.target.value)} />
                      ) : (
                        <p className="text-sm text-foreground bg-secondary rounded-lg px-3 py-2.5">{profile.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone</Label>
                      {editing ? (
                        <Input value={profile.phone} onChange={(e) => update("phone", e.target.value)} />
                      ) : (
                        <p className="text-sm text-foreground bg-secondary rounded-lg px-3 py-2.5">{profile.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Address</Label>
                      {editing ? (
                        <Input value={profile.address} onChange={(e) => update("address", e.target.value)} />
                      ) : (
                        <p className="text-sm text-foreground bg-secondary rounded-lg px-3 py-2.5">{profile.address}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { to: "/account/orders", label: "My Orders", icon: Package, color: "text-primary" },
                      { to: "/account/notifications", label: "Notifications", icon: Bell, color: "text-accent" },
                      { to: "/wishlist", label: "Wishlist", icon: Heart, color: "text-destructive" },
                      { to: "/track-order", label: "Track Order", icon: MapPin, color: "text-success" },
                    ].map((action) => (
                      <Link
                        key={action.to}
                        to={action.to}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-secondary transition-colors text-center"
                      >
                        <action.icon className={`w-6 h-6 ${action.color}`} />
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
