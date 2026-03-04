import { useState } from "react";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Save, Store, Truck, Bell } from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    storeName: "Nile Shoppers",
    currency: "UGX",
    freeDeliveryThreshold: "500000",
    enableNotifications: true,
    enableDeliveryTracking: true,
    maintenanceMode: false,
  });

  const save = () => {
    toast({ title: "Settings saved successfully" });
  };

  return (
    <AdminLayout>
      <h2 className="text-xl font-bold text-foreground mb-4">Settings</h2>

      <div className="grid gap-4 max-w-2xl">
        <Card>
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Store className="w-4 h-4" /> Store Settings</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Store Name</Label><Input value={settings.storeName} onChange={e => setSettings(s => ({...s, storeName: e.target.value}))} /></div>
            <div><Label>Currency</Label><Input value={settings.currency} onChange={e => setSettings(s => ({...s, currency: e.target.value}))} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Truck className="w-4 h-4" /> Delivery</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Free Delivery Threshold</Label><Input type="number" value={settings.freeDeliveryThreshold} onChange={e => setSettings(s => ({...s, freeDeliveryThreshold: e.target.value}))} /></div>
            <div className="flex items-center justify-between">
              <Label>Enable Delivery Tracking</Label>
              <Switch checked={settings.enableDeliveryTracking} onCheckedChange={v => setSettings(s => ({...s, enableDeliveryTracking: v}))} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Enable Push Notifications</Label>
              <Switch checked={settings.enableNotifications} onCheckedChange={v => setSettings(s => ({...s, enableNotifications: v}))} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Maintenance Mode</Label>
              <Switch checked={settings.maintenanceMode} onCheckedChange={v => setSettings(s => ({...s, maintenanceMode: v}))} />
            </div>
          </CardContent>
        </Card>

        <Button onClick={save} className="w-full sm:w-auto"><Save className="w-4 h-4 mr-1" /> Save Settings</Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
