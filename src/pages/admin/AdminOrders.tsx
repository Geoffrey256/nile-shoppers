import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/currency";
import { QRCodeSVG } from "qrcode.react";
import { Search, Truck } from "lucide-react";

const statuses = ["pending", "processing", "shipped", "in_transit", "delivered", "cancelled"];
const statusColors: Record<string, "default" | "secondary" | "destructive"> = {
  pending: "secondary", processing: "secondary", shipped: "default", in_transit: "default", delivered: "default", cancelled: "destructive",
};

interface Order {
  id: string;
  order_number: string;
  status: string;
  items: any[];
  total: number;
  shipping_address: string;
  created_at: string;
  user_id: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders((data as Order[]) || []);
  };

  useEffect(() => {
    load();
    const channel = supabase.channel("admin-orders").on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => load()).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status } as any).eq("id", id);
    toast({ title: `Order updated to ${status}` });
    load();
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.order_number.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2"><Truck className="w-5 h-5" /> Orders & Deliveries</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Order #…"
              className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((o) => (
          <Card key={o.id}>
            <CardContent className="py-4">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="shrink-0">
                  <QRCodeSVG value={JSON.stringify({ orderId: o.id, orderNumber: o.order_number })} size={80} level="M" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-foreground">{o.order_number}</span>
                    <Badge variant={statusColors[o.status] || "secondary"}>{o.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(o.created_at).toLocaleDateString()} · {Array.isArray(o.items) ? o.items.length : 0} item(s)
                  </p>
                  <p className="text-sm font-semibold text-primary mt-1">{formatPrice(Number(o.total))}</p>
                  {o.shipping_address && <p className="text-xs text-muted-foreground mt-1">📍 {o.shipping_address}</p>}
                </div>
                <div className="shrink-0 w-full sm:w-auto">
                  <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                    <SelectTrigger className="w-full sm:w-36"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {statuses.map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-muted-foreground text-center py-8">No orders found</p>}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
