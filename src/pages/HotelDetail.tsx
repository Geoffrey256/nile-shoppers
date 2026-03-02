import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getHotelById, tierColors, tierOrder, Room } from "@/data/hotels";
import { formatPrice } from "@/lib/currency";
import { ArrowLeft, Star, MapPin, Users, Check, Calendar, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const hotel = getHotelById(Number(id));
  const { toast } = useToast();

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [showBooking, setShowBooking] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [booked, setBooked] = useState(false);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Hotel not found</h1>
          <Link to="/category/stays" className="text-primary hover:underline mt-4 inline-block">Browse all stays</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const sortedRooms = [...hotel.rooms].sort(
    (a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier)
  );

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
      : 1;

  const handleBook = () => {
    if (!name || !phone || !checkIn || !checkOut) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setBooked(true);
    toast({ title: "Booking confirmed!", description: `Your ${selectedRoom?.name} at ${hotel.name} has been reserved.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-4 md:py-8">
        <Link to="/category/stays" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Stays
        </Link>

        {/* Hotel header */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-lg overflow-hidden aspect-[3/2]">
            <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{hotel.name}</h1>
            <p className="flex items-center gap-1.5 text-muted-foreground mt-2">
              <MapPin className="w-4 h-4" /> {hotel.location}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <span className="font-semibold text-foreground">{hotel.rating}</span>
              <span className="text-sm text-muted-foreground">({hotel.reviews} reviews)</span>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">{hotel.description}</p>

            {/* Google Maps embed */}
            <div className="mt-4 rounded-lg overflow-hidden border">
              <iframe
                title={`Map of ${hotel.name}`}
                width="100%"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5000!2d${hotel.lng}!3d${hotel.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sug!4v1`}
              />
            </div>
          </div>
        </div>

        {/* Rooms */}
        <h2 className="text-xl font-bold text-foreground mb-4">Available Rooms</h2>
        <div className="grid gap-4 mb-8">
          {sortedRooms.map((room) => (
            <div
              key={room.tier}
              className={`bg-card border rounded-lg overflow-hidden transition-shadow ${
                selectedRoom?.tier === room.tier ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
              }`}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 aspect-video sm:aspect-auto overflow-hidden shrink-0">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${tierColors[room.tier]}`}>
                      {room.tier}
                    </span>
                    <h3 className="font-bold text-foreground">{room.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{room.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {room.amenities.map((a) => (
                      <span key={a} className="inline-flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        <Check className="w-3 h-3" /> {a}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" /> Up to {room.maxGuests} guest{room.maxGuests > 1 ? "s" : ""}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg text-primary">{formatPrice(room.price)}<span className="text-xs font-normal text-muted-foreground">/night</span></span>
                      <button
                        onClick={() => { setSelectedRoom(room); setShowBooking(true); setBooked(false); }}
                        className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking form */}
        {showBooking && selectedRoom && (
          <div className="bg-card border rounded-lg p-6 mb-8 max-w-lg mx-auto">
            {booked ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
                <p className="text-muted-foreground mb-1">{selectedRoom.name} at {hotel.name}</p>
                <p className="text-muted-foreground text-sm">{checkIn} → {checkOut} · {nights} night{nights > 1 ? "s" : ""}</p>
                <p className="font-bold text-primary text-lg mt-3">Total: {formatPrice(selectedRoom.price * nights)}</p>
                <p className="text-xs text-muted-foreground mt-4">We will contact you at {phone} to confirm your reservation.</p>
                <button
                  onClick={() => { setShowBooking(false); setBooked(false); }}
                  className="mt-4 text-primary hover:underline text-sm"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-foreground mb-1">Book {selectedRoom.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{formatPrice(selectedRoom.price)} per night</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm bg-background text-foreground" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Phone Number</label>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <span className="px-3 bg-secondary text-muted-foreground text-sm"><Phone className="w-4 h-4" /></span>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="flex-1 px-3 py-2 text-sm bg-background text-foreground outline-none" placeholder="+256..." />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Check-in</label>
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <span className="px-2 bg-secondary"><Calendar className="w-4 h-4 text-muted-foreground" /></span>
                        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="flex-1 px-2 py-2 text-sm bg-background text-foreground outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Check-out</label>
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <span className="px-2 bg-secondary"><Calendar className="w-4 h-4 text-muted-foreground" /></span>
                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="flex-1 px-2 py-2 text-sm bg-background text-foreground outline-none" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Guests</label>
                    <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2 text-sm bg-background text-foreground">
                      {Array.from({ length: selectedRoom.maxGuests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                  {checkIn && checkOut && nights > 0 && (
                    <div className="bg-secondary rounded-lg p-3 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">{formatPrice(selectedRoom.price)} × {nights} night{nights > 1 ? "s" : ""}</span><span className="font-semibold text-foreground">{formatPrice(selectedRoom.price * nights)}</span></div>
                    </div>
                  )}
                  <button onClick={handleBook} className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                    Confirm Booking
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HotelDetail;
