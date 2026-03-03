import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getHotelById, tierColors } from "@/data/hotels";
import { formatPrice } from "@/lib/currency";
import { ArrowLeft, Calendar, Phone, Users, Check, MapPin, CreditCard, Smartphone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";

const BookRoom = () => {
  const { hotelId, tier } = useParams<{ hotelId: string; tier: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const hotel = getHotelById(Number(hotelId));

  const room = hotel?.rooms.find((r) => r.tier === tier);

  const [step, setStep] = useState<"details" | "payment" | "confirm" | "receipt">("details");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    paymentMethod: "momo",
    momoNumber: "",
    specialRequests: "",
  });

  const update = (field: string, value: string | number) =>
    setForm((p) => ({ ...p, [field]: value }));

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 1;
    return Math.max(1, Math.ceil((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000));
  }, [form.checkIn, form.checkOut]);

  const totalPrice = room ? room.price * nights : 0;

  const bookingId = useMemo(() => `BK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`, []);

  const canProceedDetails = form.fullName.trim() && form.phone.trim() && form.checkIn && form.checkOut;
  const canProceedPayment = form.paymentMethod === "cod" || form.momoNumber.trim().length >= 10;

  const handleConfirm = () => {
    setStep("receipt");
    toast({ title: "Booking confirmed!", description: `Reference: ${bookingId}` });
  };

  if (!hotel || !room) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Room not found</h1>
          <Link to="/category/hotel-booking" className="text-primary hover:underline mt-4 inline-block">Browse Hotels</Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Receipt view
  if (step === "receipt") {
    const qrData = JSON.stringify({
      bookingId,
      hotel: hotel.name,
      room: room.name,
      tier: room.tier,
      guest: form.fullName,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      nights,
      guests: form.guests,
      total: totalPrice,
    });

    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-8 px-4">
          <div className="max-w-lg mx-auto">
            <div className="bg-card border rounded-xl overflow-hidden">
              {/* Receipt header */}
              <div className="bg-primary text-primary-foreground p-6 text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3" />
                <h1 className="text-xl font-bold">Booking Confirmed!</h1>
                <p className="text-sm opacity-90 mt-1">Reference: {bookingId}</p>
              </div>

              <div className="p-6 space-y-4">
                {/* Room info */}
                <div className="flex gap-4">
                  <img src={room.image} alt={room.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div>
                    <Badge className={`${tierColors[room.tier]} border-0 text-xs mb-1`}>{room.tier}</Badge>
                    <h2 className="font-bold text-foreground">{room.name}</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {hotel.name}</p>
                  </div>
                </div>

                <Separator />

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Guest</p>
                    <p className="font-medium text-foreground">{form.fullName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{form.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Check-in</p>
                    <p className="font-medium text-foreground">{form.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Check-out</p>
                    <p className="font-medium text-foreground">{form.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Nights</p>
                    <p className="font-medium text-foreground">{nights}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Guests</p>
                    <p className="font-medium text-foreground">{form.guests}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="text-sm font-medium text-foreground">
                    {form.paymentMethod === "momo" ? "MTN MoMo" : form.paymentMethod === "airtel" ? "Airtel Money" : "Cash on Arrival"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                </div>

                <Separator />

                {/* QR Code */}
                <div className="flex flex-col items-center py-4">
                  <p className="text-sm text-muted-foreground mb-3">Show this QR code at check-in</p>
                  <div className="bg-white p-4 rounded-xl">
                    <QRCodeSVG value={qrData} size={180} level="M" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{bookingId}</p>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => navigate(`/hotel-booking/${hotel.id}`)}>
                  Back to Hotel
                </Button>
                <Button className="flex-1" onClick={() => window.print()}>
                  Print Receipt
                </Button>
              </div>
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
          <Link
            to={`/hotel-booking/${hotel.id}/room/${room.tier}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Room Details
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-6">Book {room.name}</h1>

          {/* Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[
              { key: "details", label: "Details", icon: Users },
              { key: "payment", label: "Payment", icon: CreditCard },
              { key: "confirm", label: "Confirm", icon: CheckCircle2 },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    step === s.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </div>
                {i < 2 && <div className="w-8 h-px bg-border" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2">
              {step === "details" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Guest & Stay Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input placeholder="John Doe" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number *</Label>
                        <Input placeholder="+256 7XX XXX XXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email (optional)</Label>
                      <Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Check-in *</Label>
                        <Input type="date" value={form.checkIn} onChange={(e) => update("checkIn", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Check-out *</Label>
                        <Input type="date" value={form.checkOut} onChange={(e) => update("checkOut", e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Number of Guests</Label>
                      <select
                        value={form.guests}
                        onChange={(e) => update("guests", Number(e.target.value))}
                        className="w-full border rounded-lg px-3 py-2 text-sm bg-background text-foreground"
                      >
                        {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>
                        ))}
                      </select>
                    </div>
                    <Button className="w-full" size="lg" disabled={!canProceedDetails} onClick={() => setStep("payment")}>
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === "payment" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" /> Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <RadioGroup value={form.paymentMethod} onValueChange={(v) => update("paymentMethod", v)} className="space-y-3">
                      {[
                        { value: "momo", label: "MTN Mobile Money", desc: "Pay via MTN MoMo", icon: Smartphone, color: "text-yellow-600" },
                        { value: "airtel", label: "Airtel Money", desc: "Pay via Airtel Money", icon: Smartphone, color: "text-red-500" },
                        { value: "cod", label: "Cash on Arrival", desc: "Pay at the hotel", icon: CreditCard, color: "text-green-600" },
                      ].map((pm) => (
                        <label
                          key={pm.value}
                          className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                            form.paymentMethod === pm.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
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

                    {(form.paymentMethod === "momo" || form.paymentMethod === "airtel") && (
                      <div className="space-y-2">
                        <Label>{form.paymentMethod === "momo" ? "MTN MoMo" : "Airtel Money"} Number</Label>
                        <Input placeholder="+256 7XX XXX XXX" value={form.momoNumber} onChange={(e) => update("momoNumber", e.target.value)} />
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep("details")} className="flex-1">Back</Button>
                      <Button className="flex-1" size="lg" disabled={!canProceedPayment} onClick={() => setStep("confirm")}>Review Booking</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === "confirm" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Review & Confirm</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-secondary rounded-lg p-4 space-y-2 text-sm">
                      <p className="font-medium text-foreground">Guest Details</p>
                      <p className="text-muted-foreground">{form.fullName}</p>
                      <p className="text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> {form.phone}</p>
                    </div>
                    <div className="bg-secondary rounded-lg p-4 space-y-2 text-sm">
                      <p className="font-medium text-foreground">Stay</p>
                      <p className="text-muted-foreground">{form.checkIn} → {form.checkOut} · {nights} night{nights > 1 ? "s" : ""}</p>
                      <p className="text-muted-foreground">{form.guests} guest{form.guests > 1 ? "s" : ""}</p>
                    </div>
                    <div className="bg-secondary rounded-lg p-4 space-y-2 text-sm">
                      <p className="font-medium text-foreground">Payment</p>
                      <p className="text-muted-foreground">
                        {form.paymentMethod === "momo" ? `MTN MoMo – ${form.momoNumber}` : form.paymentMethod === "airtel" ? `Airtel Money – ${form.momoNumber}` : "Cash on Arrival"}
                      </p>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-base font-bold">
                      <span className="text-foreground">Total ({nights} night{nights > 1 ? "s" : ""})</span>
                      <span className="text-primary">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep("payment")} className="flex-1">Back</Button>
                      <Button className="flex-1" size="lg" onClick={handleConfirm}>Confirm Booking</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Summary sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-5 space-y-4">
                  <div className="flex gap-3">
                    <img src={room.image} alt={room.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <Badge className={`${tierColors[room.tier]} border-0 text-xs mb-1`}>{room.tier}</Badge>
                      <p className="font-bold text-sm text-foreground">{room.name}</p>
                      <p className="text-xs text-muted-foreground">{hotel.name}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{formatPrice(room.price)} × {nights} night{nights > 1 ? "s" : ""}</span>
                      <span className="font-medium text-foreground">{formatPrice(totalPrice)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary">{formatPrice(totalPrice)}</span>
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

export default BookRoom;
