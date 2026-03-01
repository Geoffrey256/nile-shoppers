import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Store, TrendingUp, Shield, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Sell = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container py-8 space-y-8">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
          Sell on <span className="text-accent">Nile Shoppers</span>
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Join thousands of merchants reaching millions of customers across East Africa.
          Start selling today and grow your business with our powerful platform.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Store, title: "Easy Onboarding", desc: "Set up your shop in minutes with our guided seller registration." },
          { icon: Shield, title: "Secure Payments", desc: "Get paid safely through mobile money, Visa, or bank transfer." },
          { icon: TrendingUp, title: "Marketing Tools", desc: "Boost your sales with built-in promotions and analytics." },
          { icon: Headphones, title: "Seller Support", desc: "Dedicated support team to help you succeed." },
        ].map((item) => (
          <div key={item.title} className="bg-card rounded-lg border p-6 space-y-3 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-card rounded-lg border p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">Ready to start selling?</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Create your seller account today and list your first product in under 5 minutes.
        </p>
        <Button asChild size="lg">
          <Link to="/signup">Create Seller Account</Link>
        </Button>
      </section>
    </main>
    <Footer />
  </div>
);

export default Sell;
