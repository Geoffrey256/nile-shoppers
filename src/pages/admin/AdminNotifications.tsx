import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Bell, Send } from "lucide-react";

const AdminNotifications = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [targetUserId, setTargetUserId] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const send = async () => {
    if (!title || !message) return;
    setSending(true);

    if (targetUserId) {
      await supabase.from("notifications").insert({ user_id: targetUserId, title, message, type } as any);
      toast({ title: "Notification sent to user" });
    } else {
      // Send to all users
      const { data: profiles } = await supabase.from("profiles").select("id");
      if (profiles && profiles.length > 0) {
        const rows = profiles.map((p: any) => ({ user_id: p.id, title, message, type }));
        await supabase.from("notifications").insert(rows as any);
        toast({ title: `Notification sent to ${profiles.length} users` });
      }
    }

    setTitle("");
    setMessage("");
    setSending(false);
  };

  return (
    <AdminLayout>
      <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Bell className="w-5 h-5" /> Send Notifications
      </h2>

      <Card>
        <CardContent className="py-4 space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Notification title" />
          </div>
          <div>
            <Label>Message</Label>
            <Input value={message} onChange={e => setMessage(e.target.value)} placeholder="Notification message" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label>Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="promo">Promo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>User ID (blank = all users)</Label>
              <Input value={targetUserId} onChange={e => setTargetUserId(e.target.value)} placeholder="Leave empty for all" />
            </div>
          </div>
          <Button onClick={send} disabled={sending || !title || !message} className="w-full sm:w-auto">
            <Send className="w-4 h-4 mr-1" /> {sending ? "Sending…" : "Send Notification"}
          </Button>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminNotifications;
