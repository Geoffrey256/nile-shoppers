import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package, Phone, Mail, MapPin } from "lucide-react";

const Help = () => {
  const [trackingId, setTrackingId] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 max-w-3xl space-y-8">
        <h1 className="text-2xl font-bold text-foreground">Help Center</h1>

        {/* Track Order */}
        <section className="bg-card rounded-lg border p-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Package className="w-5 h-5 text-accent" /> Track Your Order
          </h2>
          <p className="text-sm text-muted-foreground">Enter your order ID or tracking number to check the status of your delivery.</p>
          <div className="flex gap-2">
            <Input
              placeholder="e.g. NS-20260301-00123"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <Button className="gap-1.5 shrink-0">
              <Search className="w-4 h-4" /> Track
            </Button>
          </div>
          {trackingId && (
            <p className="text-sm text-muted-foreground bg-secondary rounded p-3">
              Order tracking is currently being set up. Please contact support at <strong>+256764593420</strong> for order status updates.
            </p>
          )}
        </section>

        {/* Help Topics */}
        <section className="bg-card rounded-lg border p-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Common Topics</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            {[
              { title: "Ordering & Checkout", desc: "How to place an order, payment methods, promo codes" },
              { title: "Shipping & Delivery", desc: "Delivery times, fees, coverage areas in Uganda" },
              { title: "Returns & Refunds", desc: "How to return items, refund timelines, conditions" },
              { title: "Account & Security", desc: "Login issues, password reset, account settings" },
              { title: "Product Quality", desc: "Defective items, warranty claims, replacements" },
              { title: "Mobile Money Payments", desc: "MTN MoMo, Airtel Money payment support" },
            ].map((topic) => (
              <div key={topic.title} className="bg-secondary/50 rounded-lg p-3">
                <p className="font-medium text-foreground">{topic.title}</p>
                <p className="text-xs mt-0.5">{topic.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-card rounded-lg border p-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Contact Support</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent" /> +256764593420</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /> support@nileshoppers.com</p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> Paidha, Zombo, Uganda</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
