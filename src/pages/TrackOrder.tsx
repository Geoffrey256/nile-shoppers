import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Package } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/currency";
import { QRCodeSVG } from "qrcode.react";

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "secondary" },
  processing: { label: "Processing", color: "secondary" },
  shipped: { label: "Shipped", color: "default" },
  in_transit: { label: "In Transit", color: "default" },
  delivered: { label: "Delivered", color: "default" },
  cancelled: { label: "Cancelled", color: "destructive" },
};

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = async () => {
    if (!trackingId.trim()) return;
    setLoading(true);
    setNotFound(false);
    setOrder(null);

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("order_number", trackingId.trim())
      .maybeSingle();

    if (data) {
      setOrder(data);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  const badge = order ? statusLabels[order.status] || { label: order.status, color: "secondary" } : null;
  const items = order ? (Array.isArray(order.items) ? order.items : []) : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container py-6 sm:py-8 max-w-xl px-4">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Package className="w-5 h-5 sm:w-6 sm:h-6 text-accent" /> Track Order
        </h1>
        <div className="bg-card rounded-lg border p-4 sm:p-6 space-y-4">
          <p className="text-sm text-muted-foreground">Enter your order number below.</p>
          <div className="flex gap-2">
            <Input
              placeholder="e.g. NS-20260301-00123"
              value={trackingId}
              onChange={(e) => { setTrackingId(e.target.value); setNotFound(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
            <Button className="gap-1.5 shrink-0" onClick={handleTrack} disabled={loading}>
              <Search className="w-4 h-4" /> {loading ? "..." : "Track"}
            </Button>
          </div>

          {notFound && (
            <div className="bg-destructive/10 rounded-lg p-4 text-sm text-destructive">
              No order found with that number. Please check and try again, or contact support at <strong>+256764593420</strong>.
            </div>
          )}

          {order && (
            <div className="bg-secondary rounded-lg p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="font-bold text-foreground">{order.order_number}</p>
                <Badge variant={badge?.color as any}>{badge?.label}</Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {order.qr_code_data && (
                  <div className="shrink-0 flex justify-center">
                    <QRCodeSVG value={order.qr_code_data} size={80} level="M" />
                  </div>
                )}
                <div className="flex-1 space-y-2 text-sm">
                  {items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      {item.image && <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />}
                      <span className="text-foreground flex-1 line-clamp-1">{item.name}</span>
                      <span className="text-muted-foreground">×{item.quantity || item.qty}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t flex justify-between">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-bold text-primary">{formatPrice(Number(order.total))}</span>
                  </div>
                  {order.shipping_address && (
                    <p className="text-muted-foreground">📍 {order.shipping_address}</p>
                  )}
                  <p className="text-muted-foreground">Placed: {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;
