import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, Truck } from "lucide-react";
import { formatPrice } from "@/lib/currency";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0, pendingOrders: 0, deliveries: 0 });

  useEffect(() => {
    const load = async () => {
      const [{ count: users }, { count: products }, { data: orders }] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("total, status"),
      ]);
      const revenue = (orders || []).reduce((s, o) => s + Number(o.total), 0);
      const pending = (orders || []).filter(o => o.status === "pending" || o.status === "processing").length;
      const delivered = (orders || []).filter(o => o.status === "delivered").length;
      setStats({
        users: users || 0,
        products: products || 0,
        orders: (orders || []).length,
        revenue,
        pendingOrders: pending,
        deliveries: delivered,
      });
    };
    load();
  }, []);

  const cards = [
    { title: "Total Users", value: stats.users, icon: Users, color: "text-primary" },
    { title: "Products", value: stats.products, icon: Package, color: "text-accent" },
    { title: "Orders", value: stats.orders, icon: ShoppingCart, color: "text-success" },
    { title: "Revenue", value: formatPrice(stats.revenue), icon: DollarSign, color: "text-primary" },
    { title: "Pending Orders", value: stats.pendingOrders, icon: TrendingUp, color: "text-accent" },
    { title: "Deliveries", value: stats.deliveries, icon: Truck, color: "text-success" },
  ];

  return (
    <AdminLayout>
      <h2 className="text-xl font-bold text-foreground mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Card key={c.title}>
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              <c.icon className={`w-5 h-5 ${c.color}`} />
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl font-bold text-foreground">{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
