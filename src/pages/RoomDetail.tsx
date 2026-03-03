import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getHotelById, tierColors, tierOrder } from "@/data/hotels";
import { formatPrice } from "@/lib/currency";
import { ArrowLeft, Star, MapPin, Users, Check, Wifi, Tv, Wind, Coffee, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const amenityIcons: Record<string, typeof Wifi> = {
  "Free Wi-Fi": Wifi,
  "Smart TV": Tv,
  "TV": Tv,
  "Air conditioning": Wind,
  "Fan / AC": Wind,
  "Fan": Wind,
  "Minibar": Coffee,
  "Airport shuttle": Car,
};

const RoomDetail = () => {
  const { hotelId, tier } = useParams<{ hotelId: string; tier: string }>();
  const navigate = useNavigate();
  const hotel = getHotelById(Number(hotelId));

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Hotel not found</h1>
          <Link to="/category/hotel-booking" className="text-primary hover:underline mt-4 inline-block">Browse all hotels</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const room = hotel.rooms.find((r) => r.tier === tier);

  if (!room) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Room not found</h1>
          <Link to={`/hotel-booking/${hotel.id}`} className="text-primary hover:underline mt-4 inline-block">Back to {hotel.name}</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-4 md:py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to={`/hotel-booking/${hotel.id}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {hotel.name}
          </Link>

          {/* Room image */}
          <div className="rounded-xl overflow-hidden aspect-[16/9] md:aspect-[21/9] mb-6">
            <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Details */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={`${tierColors[room.tier]} border-0 text-xs uppercase tracking-wider`}>
                    {room.tier}
                  </Badge>
                  <h1 className="text-2xl font-bold text-foreground">{room.name}</h1>
                </div>
                <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                  <MapPin className="w-4 h-4" /> {hotel.name} · {hotel.location}
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-foreground mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{room.description}</p>
              </div>

              <Separator />

              <div>
                <h2 className="font-semibold text-foreground mb-3">Amenities</h2>
                <div className="grid grid-cols-2 gap-3">
                  {room.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Check;
                    return (
                      <div key={amenity} className="flex items-center gap-2.5 text-sm text-foreground">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        {amenity}
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="font-semibold text-foreground mb-2">Room Details</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" /> Max Guests: <span className="text-foreground font-medium">{room.maxGuests}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="w-4 h-4 fill-accent text-accent" /> Hotel Rating: <span className="text-foreground font-medium">{hotel.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking sidebar */}
            <div>
              <div className="bg-card border rounded-xl p-5 sticky top-24 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price per night</p>
                  <p className="text-3xl font-bold text-primary">{formatPrice(room.price)}</p>
                </div>
                <Separator />
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> Free cancellation</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> Breakfast included</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" /> No prepayment needed</li>
                </ul>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => navigate(`/hotel-booking/${hotel.id}/book/${room.tier}`)}
                >
                  Book Now – {formatPrice(room.price)}/night
                </Button>
                <p className="text-xs text-center text-muted-foreground">You won't be charged yet</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoomDetail;
