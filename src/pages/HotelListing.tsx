import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { hotels } from "@/data/hotels";
import { ArrowLeft, Star, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/currency";

const HotelListing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-4 md:py-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Find Your Stay</h1>
          <p className="text-muted-foreground mt-1">Browse guest houses and hotels near you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => {
            const cheapest = Math.min(...hotel.rooms.map((r) => r.price));
            return (
              <Link
                key={hotel.id}
                to={`/stays/${hotel.id}`}
                className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-bold text-foreground text-lg">{hotel.name}</h2>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {hotel.city}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{hotel.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-semibold text-foreground">{hotel.rating}</span>
                      <span className="text-xs text-muted-foreground">({hotel.reviews} reviews)</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">From</p>
                      <p className="font-bold text-primary">{formatPrice(cheapest)}<span className="text-xs font-normal text-muted-foreground">/night</span></p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HotelListing;
