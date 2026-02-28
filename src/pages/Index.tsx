import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import FlashSale from "@/components/FlashSale";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-4 space-y-6">
        <HeroBanner />
        <PromoBanner />
        <CategoryGrid />
        <FlashSale />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
