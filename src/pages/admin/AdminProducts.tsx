import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/currency";
import { Plus, Edit2, Trash2, Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number;
  image_url: string;
  category: string;
  stock: number;
  is_active: boolean;
  sold: number;
}

const emptyProduct = { name: "", description: "", price: 0, original_price: 0, image_url: "", category: "", stock: 0 };

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts((data as Product[]) || []);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(emptyProduct); setDialogOpen(true); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description, price: p.price, original_price: p.original_price, image_url: p.image_url, category: p.category, stock: p.stock });
    setDialogOpen(true);
  };

  const save = async () => {
    if (editing) {
      await supabase.from("products").update(form as any).eq("id", editing.id);
      toast({ title: "Product updated" });
    } else {
      await supabase.from("products").insert(form as any);
      toast({ title: "Product created" });
    }
    setDialogOpen(false);
    load();
  };

  const toggleActive = async (p: Product) => {
    await supabase.from("products").update({ is_active: !p.is_active } as any).eq("id", p.id);
    toast({ title: p.is_active ? "Product deactivated" : "Product activated" });
    load();
  };

  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    toast({ title: "Product deleted" });
    load();
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-foreground">Product Management</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-52">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…"
              className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <Button onClick={openNew} size="sm"><Plus className="w-4 h-4 mr-1" /> Add</Button>
        </div>
      </div>

      <div className="grid gap-3">
        {filtered.map((p) => (
          <Card key={p.id}>
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-3 py-4">
              {p.image_url && <img src={p.image_url} alt={p.name} className="w-14 h-14 rounded-md object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.category} · Stock: {p.stock} · Sold: {p.sold}</p>
                <p className="text-sm font-semibold text-primary">{formatPrice(p.price)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <Badge variant={p.is_active ? "default" : "secondary"} className="cursor-pointer" onClick={() => toggleActive(p)}>
                  {p.is_active ? "Active" : "Inactive"}
                </Badge>
                <Button size="sm" variant="outline" onClick={() => openEdit(p)}><Edit2 className="w-3 h-3" /></Button>
                <Button size="sm" variant="destructive" onClick={() => deleteProduct(p.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-muted-foreground text-center py-8">No products yet</p>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} /></div>
            <div><Label>Description</Label><Input value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Price (UGX)</Label><Input type="number" value={form.price} onChange={e => setForm(f => ({...f, price: Number(e.target.value)}))} /></div>
              <div><Label>Original Price</Label><Input type="number" value={form.original_price} onChange={e => setForm(f => ({...f, original_price: Number(e.target.value)}))} /></div>
            </div>
            <div><Label>Image URL</Label><Input value={form.image_url} onChange={e => setForm(f => ({...f, image_url: e.target.value}))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Category</Label><Input value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} /></div>
              <div><Label>Stock</Label><Input type="number" value={form.stock} onChange={e => setForm(f => ({...f, stock: Number(e.target.value)}))} /></div>
            </div>
            <Button onClick={save} className="w-full">{editing ? "Update" : "Create"} Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProducts;
