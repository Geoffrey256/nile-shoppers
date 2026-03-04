import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/currency";
import { QrCode, Search, CheckCircle, XCircle } from "lucide-react";

const AdminVerify = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    setNotFound(false);
    setResult(null);

    // Try orders first
    let { data } = await supabase.from("orders").select("*").or(`order_number.eq.${query},id.eq.${query}`).maybeSingle();
    if (data) {
      setResult({ type: "order", data });
      setLoading(false);
      return;
    }

    // Try hotel bookings
    let { data: booking } = await supabase.from("hotel_bookings").select("*").or(`booking_number.eq.${query},id.eq.${query}`).maybeSingle();
    if (booking) {
      setResult({ type: "booking", data: booking });
      setLoading(false);
      return;
    }

    setNotFound(true);
    setLoading(false);
  };

  return (
    <AdminLayout>
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <QrCode className="w-5 h-5" /> Order Verification
      </h2>

      <Card className="mb-6">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground mb-3">Enter an order number, booking number, or scan a QR code ID to verify</p>
          <div className="flex gap-2">
            <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="ORD-XXXXXX or booking ID…"
              onKeyDown={e => e.key === "Enter" && search()} className="flex-1" />
            <Button onClick={search} disabled={loading || !query.trim()}>
              <Search className="w-4 h-4 mr-1" /> Verify
            </Button>
          </div>
        </CardContent>
      </Card>

      {notFound && (
        <Card className="border-destructive">
          <CardContent className="py-6 text-center">
            <XCircle className="w-12 h-12 text-destructive mx-auto mb-2" />
            <p className="font-semibold text-foreground">Not Found</p>
            <p className="text-sm text-muted-foreground">No order or booking matches "{query}"</p>
          </CardContent>
        </Card>
      )}

      {result?.type === "order" && (
        <Card className="border-success">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" /> Order Verified
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <p><span className="text-muted-foreground">Order #:</span> <strong>{result.data.order_number}</strong></p>
              <p><span className="text-muted-foreground">Status:</span> <Badge>{result.data.status}</Badge></p>
              <p><span className="text-muted-foreground">Total:</span> <strong className="text-primary">{formatPrice(Number(result.data.total))}</strong></p>
              <p><span className="text-muted-foreground">Date:</span> {new Date(result.data.created_at).toLocaleDateString()}</p>
              {result.data.shipping_address && <p className="sm:col-span-2"><span className="text-muted-foreground">Address:</span> {result.data.shipping_address}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {result?.type === "booking" && (
        <Card className="border-success">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" /> Booking Verified
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <p><span className="text-muted-foreground">Booking #:</span> <strong>{result.data.booking_number}</strong></p>
              <p><span className="text-muted-foreground">Status:</span> <Badge>{result.data.status}</Badge></p>
              <p><span className="text-muted-foreground">Hotel:</span> {result.data.hotel_name}</p>
              <p><span className="text-muted-foreground">Room:</span> {result.data.room_name} ({result.data.room_tier})</p>
              <p><span className="text-muted-foreground">Guest:</span> {result.data.guest_name}</p>
              <p><span className="text-muted-foreground">Check-in:</span> {result.data.check_in}</p>
              <p><span className="text-muted-foreground">Check-out:</span> {result.data.check_out}</p>
              <p><span className="text-muted-foreground">Total:</span> <strong className="text-primary">{formatPrice(Number(result.data.total_price))}</strong></p>
            </div>
          </CardContent>
        </Card>
      )}
    </AdminLayout>
  );
};

export default AdminVerify;
