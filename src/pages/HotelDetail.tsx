import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getHotelById, tierColors, tierOrder } from "@/data/hotels";
import { formatPrice } from "@/lib/currency";
import { ArrowLeft, Star, MapPin, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const hotel = getHotelById(Number(id));

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

  const sortedRooms = [...hotel.rooms].sort(
    (a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-4 md:py-8">
        <Link to="/category/hotel-booking" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Hotel Booking
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

            {/* OpenStreetMap */}
            <div className="mt-4 rounded-lg overflow-hidden border">
              <iframe
                title={`Map of ${hotel.name}`}
                width="100%"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${hotel.lng - 0.01}%2C${hotel.lat - 0.01}%2C${hotel.lng + 0.01}%2C${hotel.lat + 0.01}&layer=mapnik&marker=${hotel.lat}%2C${hotel.lng}`}
              />
            </div>
          </div>
        </div>

        {/* Rooms – clickable cards linking to room detail */}
        <h2 className="text-xl font-bold text-foreground mb-4">Available Rooms</h2>
        <div className="grid gap-4 mb-8">
          {sortedRooms.map((room) => (
            <Link
              key={room.tier}
              to={`/hotel-booking/${hotel.id}/room/${room.tier}`}
              className="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow block"
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
                    {room.amenities.slice(0, 4).map((a) => (
                      <span key={a} className="inline-flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        <Check className="w-3 h-3" /> {a}
                      </span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="text-xs text-muted-foreground">+{room.amenities.length - 4} more</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" /> Up to {room.maxGuests} guest{room.maxGuests > 1 ? "s" : ""}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg text-primary">
                        {formatPrice(room.price)}<span className="text-xs font-normal text-muted-foreground">/night</span>
                      </span>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HotelDetail;
