import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shield, ShieldOff, Search } from "lucide-react";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [adminIds, setAdminIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const load = async () => {
    const { data: profiles } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    const { data: roles } = await supabase.from("user_roles").select("user_id, role");
    setUsers((profiles as Profile[]) || []);
    setAdminIds(new Set((roles || []).filter((r: any) => r.role === "admin").map((r: any) => r.user_id)));
  };

  useEffect(() => { load(); }, []);

  const toggleAdmin = async (userId: string, isAdmin: boolean) => {
    if (isAdmin) {
      await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
    } else {
      await supabase.from("user_roles").insert({ user_id: userId, role: "admin" } as any);
    }
    toast({ title: isAdmin ? "Admin role removed" : "Admin role granted" });
    load();
  };

  const filtered = users.filter(u =>
    u.full_name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-foreground">User Management</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users…"
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((u) => {
          const isAdmin = adminIds.has(u.id);
          return (
            <Card key={u.id}>
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{u.full_name || "No name"}</p>
                  <p className="text-sm text-muted-foreground truncate">{u.email}</p>
                  <p className="text-xs text-muted-foreground">Joined {new Date(u.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {isAdmin && <Badge>Admin</Badge>}
                  <Button size="sm" variant={isAdmin ? "destructive" : "outline"} onClick={() => toggleAdmin(u.id, isAdmin)}>
                    {isAdmin ? <><ShieldOff className="w-3 h-3 mr-1" /> Remove Admin</> : <><Shield className="w-3 h-3 mr-1" /> Make Admin</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && <p className="text-muted-foreground text-center py-8">No users found</p>}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
