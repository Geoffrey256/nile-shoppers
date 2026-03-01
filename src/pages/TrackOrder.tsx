import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package } from "lucide-react";
import { useState } from "react";

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 max-w-xl">
        <h1 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Package className="w-6 h-6 text-accent" /> Track Order
        </h1>
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <p className="text-sm text-muted-foreground">Enter your order ID or tracking number below.</p>
          <div className="flex gap-2">
            <Input
              placeholder="e.g. NS-20260301-00123"
              value={trackingId}
              onChange={(e) => { setTrackingId(e.target.value); setSearched(false); }}
            />
            <Button className="gap-1.5 shrink-0" onClick={() => setSearched(true)}>
              <Search className="w-4 h-4" /> Track
            </Button>
          </div>
          {searched && trackingId && (
            <div className="bg-secondary rounded-lg p-4 text-sm text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">Order: {trackingId}</p>
              <p>Order tracking is being set up. Please contact support at <strong>+256764593420</strong> for real-time updates on your delivery.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;
