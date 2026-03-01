import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Users, ShoppingBag, Globe, Heart } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 space-y-10">
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            About <span className="text-accent">Nile Shoppers</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Nile Shoppers is East Africa's growing online marketplace, bringing you the best deals on electronics, fashion, home appliances, aquarium supplies, and so much more — all delivered right to your doorstep.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-lg border p-6 space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" /> Our Mission
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To provide affordable, quality products to every household in Uganda and across East Africa. We believe online shopping should be easy, safe, and accessible to everyone — from Paidha to Kampala and beyond.
            </p>
          </div>
          <div className="bg-card rounded-lg border p-6 space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent" /> Our Values
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Customer first. We're committed to fast delivery, fair prices, easy returns, and outstanding customer support. Your satisfaction drives everything we do.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: ShoppingBag, label: "Products", value: "10,000+" },
            { icon: Users, label: "Happy Customers", value: "25,000+" },
            { icon: MapPin, label: "Cities Served", value: "50+" },
            { icon: Globe, label: "Categories", value: "20+" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-lg border p-5">
              <stat.icon className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="bg-card rounded-lg border p-6 space-y-3">
          <h2 className="text-xl font-bold text-foreground">Contact Us</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" /> +256764593420
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" /> support@nileshoppers.com
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" /> Paidha, Zombo, Uganda
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
