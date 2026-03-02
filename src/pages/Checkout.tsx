import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/currency";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, MapPin, Phone, Truck, CreditCard, Smartphone, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState<"shipping" | "payment" | "confirm">("shipping");
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
    momoNumber: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const deliveryFee = form.city.toLowerCase().includes("kampala") ? 0 : 5000;
  const grandTotal = totalPrice + deliveryFee;

  const canProceedShipping =
    form.fullName.trim() && form.phone.trim() && form.address.trim() && form.city.trim();

  const canProceedPayment =
    paymentMethod === "cod" || form.momoNumber.trim().length >= 10;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground opacity-40" />
            <h2 className="text-xl font-semibold text-foreground">Your cart is empty</h2>
            <p className="text-muted-foreground">Add some items before checking out.</p>
            <Button onClick={() => navigate("/")} className="mt-2">
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center space-y-4 max-w-md mx-auto px-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Order Placed Successfully!</h2>
            <p className="text-muted-foreground">
              Thank you, <span className="font-medium text-foreground">{form.fullName}</span>. Your order
              #{Math.floor(100000 + Math.random() * 900000)} has been received. We'll contact you at{" "}
              <span className="font-medium text-foreground">{form.phone}</span> to confirm delivery.
            </p>
            <div className="bg-secondary rounded-lg p-4 text-sm text-left space-y-1">
              <p><span className="text-muted-foreground">Delivery to:</span> {form.address}, {form.city}</p>
              <p><span className="text-muted-foreground">Payment:</span> {paymentMethod === "momo" ? "MTN Mobile Money" : paymentMethod === "airtel" ? "Airtel Money" : "Cash on Delivery"}</p>
              <p><span className="text-muted-foreground">Total paid:</span> {formatPrice(grandTotal)}</p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={() => navigate("/")} className="flex-1">
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={() => navigate("/track-order")} className="flex-1">
                Track Order
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-6 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[
              { key: "shipping", label: "Shipping", icon: MapPin },
              { key: "payment", label: "Payment", icon: CreditCard },
              { key: "confirm", label: "Confirm", icon: CheckCircle2 },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (s.key === "shipping") setStep("shipping");
                    if (s.key === "payment" && canProceedShipping) setStep("payment");
                    if (s.key === "confirm" && canProceedShipping && canProceedPayment) setStep("confirm");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    step === s.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </button>
                {i < 2 && <div className="w-8 h-px bg-border" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left – Form */}
            <div className="lg:col-span-2 space-y-6">
              {step === "shipping" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MapPin className="w-5 h-5 text-primary" /> Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input id="fullName" placeholder="John Doe" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" placeholder="+256 7XX XXX XXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (optional)</Label>
                      <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Input id="address" placeholder="Street, Area, Landmark" value={form.address} onChange={(e) => update("address", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City / Town *</Label>
                      <Input id="city" placeholder="Kampala" value={form.city} onChange={(e) => update("city", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes (optional)</Label>
                      <Textarea id="notes" placeholder="Any special delivery instructions..." value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} />
                    </div>

                    <div className="flex items-center gap-2 text-sm bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <Truck className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="text-green-700 dark:text-green-400">
                        {form.city.toLowerCase().includes("kampala")
                          ? "Free delivery within Kampala!"
                          : "Delivery fee: UGX 5,000 outside Kampala"}
                      </span>
                    </div>

                    <Button className="w-full" size="lg" disabled={!canProceedShipping} onClick={() => setStep("payment")}>
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === "payment" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CreditCard className="w-5 h-5 text-primary" /> Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      {[
                        { value: "momo", label: "MTN Mobile Money", desc: "Pay via MTN MoMo", icon: Smartphone, color: "text-yellow-600" },
                        { value: "airtel", label: "Airtel Money", desc: "Pay via Airtel Money", icon: Smartphone, color: "text-red-500" },
                        { value: "cod", label: "Cash on Delivery", desc: "Pay when you receive", icon: CreditCard, color: "text-green-600" },
                      ].map((pm) => (
                        <label
                          key={pm.value}
                          className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                            paymentMethod === pm.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                          }`}
                        >
                          <RadioGroupItem value={pm.value} />
                          <pm.icon className={`w-5 h-5 ${pm.color}`} />
                          <div>
                            <p className="font-medium text-sm text-foreground">{pm.label}</p>
                            <p className="text-xs text-muted-foreground">{pm.desc}</p>
                          </div>
                        </label>
                      ))}
                    </RadioGroup>

                    {(paymentMethod === "momo" || paymentMethod === "airtel") && (
                      <div className="space-y-2">
                        <Label htmlFor="momoNumber">
                          {paymentMethod === "momo" ? "MTN MoMo" : "Airtel Money"} Number
                        </Label>
                        <Input
                          id="momoNumber"
                          placeholder="+256 7XX XXX XXX"
                          value={form.momoNumber}
                          onChange={(e) => update("momoNumber", e.target.value)}
                        />
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep("shipping")} className="flex-1">
                        Back
                      </Button>
                      <Button className="flex-1" size="lg" disabled={!canProceedPayment} onClick={() => setStep("confirm")}>
                        Review Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === "confirm" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckCircle2 className="w-5 h-5 text-primary" /> Review & Confirm
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-secondary rounded-lg p-4 space-y-2 text-sm">
                      <p className="font-medium text-foreground">Shipping Details</p>
                      <p className="text-muted-foreground">{form.fullName}</p>
                      <p className="text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> {form.phone}</p>
                      <p className="text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {form.address}, {form.city}</p>
                      {form.notes && <p className="text-muted-foreground italic">"{form.notes}"</p>}
                    </div>

                    <div className="bg-secondary rounded-lg p-4 space-y-2 text-sm">
                      <p className="font-medium text-foreground">Payment</p>
                      <p className="text-muted-foreground">
                        {paymentMethod === "momo" ? `MTN Mobile Money – ${form.momoNumber}` : paymentMethod === "airtel" ? `Airtel Money – ${form.momoNumber}` : "Cash on Delivery"}
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold text-foreground">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" onClick={() => setStep("payment")} className="flex-1">
                        Back
                      </Button>
                      <Button className="flex-1" size="lg" onClick={handlePlaceOrder}>
                        Place Order – {formatPrice(grandTotal)}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right – Order Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 items-start">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">× {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-foreground whitespace-nowrap">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                      <span className="font-medium text-foreground">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className={`font-medium ${deliveryFee === 0 ? "text-green-600" : "text-foreground"}`}>
                        {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-base font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
