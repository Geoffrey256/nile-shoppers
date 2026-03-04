import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/currency";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const COLORS = ["hsl(217,91%,50%)", "hsl(25,95%,53%)", "hsl(142,71%,45%)", "hsl(0,84%,60%)", "hsl(270,60%,50%)"];

const AdminAnalytics = () => {
  const [ordersByStatus, setOrdersByStatus] = useState<any[]>([]);
  const [revenueByDay, setRevenueByDay] = useState<any[]>([]);
  const [topCategories, setTopCategories] = useState<any[]>([]);
  const [totals, setTotals] = useState({ revenue: 0, orders: 0, avgOrder: 0 });

  useEffect(() => {
    const load = async () => {
      const { data: orders } = await supabase.from("orders").select("status, total, created_at");
      const { data: products } = await supabase.from("products").select("category, sold");

      if (orders) {
        const revenue = orders.reduce((s, o) => s + Number(o.total), 0);
        setTotals({ revenue, orders: orders.length, avgOrder: orders.length ? Math.round(revenue / orders.length) : 0 });

        // By status
        const statusCount: Record<string, number> = {};
        orders.forEach(o => { statusCount[o.status] = (statusCount[o.status] || 0) + 1; });
        setOrdersByStatus(Object.entries(statusCount).map(([name, value]) => ({ name, value })));

        // By day (last 7 days)
        const dayMap: Record<string, number> = {};
        orders.forEach(o => {
          const day = new Date(o.created_at).toLocaleDateString("en", { weekday: "short" });
          dayMap[day] = (dayMap[day] || 0) + Number(o.total);
        });
        setRevenueByDay(Object.entries(dayMap).map(([name, revenue]) => ({ name, revenue })));
      }

      if (products) {
        const catMap: Record<string, number> = {};
        products.forEach((p: any) => { catMap[p.category || "Uncategorized"] = (catMap[p.category || "Uncategorized"] || 0) + (p.sold || 0); });
        setTopCategories(Object.entries(catMap).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value })));
      }
    };
    load();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-xl font-bold text-foreground mb-4">Real-time Analytics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card><CardContent className="py-4"><p className="text-sm text-muted-foreground">Total Revenue</p><p className="text-2xl font-bold text-foreground">{formatPrice(totals.revenue)}</p></CardContent></Card>
        <Card><CardContent className="py-4"><p className="text-sm text-muted-foreground">Total Orders</p><p className="text-2xl font-bold text-foreground">{totals.orders}</p></CardContent></Card>
        <Card><CardContent className="py-4"><p className="text-sm text-muted-foreground">Avg Order Value</p><p className="text-2xl font-bold text-foreground">{formatPrice(totals.avgOrder)}</p></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-sm">Revenue Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="hsl(217,91%,50%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Orders by Status</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={ordersByStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {ordersByStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-sm">Top Categories by Sales</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topCategories}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(25,95%,53%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
