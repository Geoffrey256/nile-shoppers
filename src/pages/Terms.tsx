import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">Terms & Conditions</h1>
      <div className="bg-card rounded-lg border p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">1. General</h2>
          <p>By accessing and using Nile Shoppers, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our platform.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">2. Account Registration</h2>
          <p>You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and all activity under your account.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">3. Pricing & Payments</h2>
          <p>All prices are listed in Ugandan Shillings (UGX). Prices may change without prior notice. Payment is required at the time of checkout via Mobile Money, bank transfer, or card.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">4. Shipping & Delivery</h2>
          <p>We aim to deliver within 2–7 business days depending on your location. Delivery fees vary by region. Free delivery is available on orders above UGX 200,000.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">5. Intellectual Property</h2>
          <p>All content on this site — including logos, images, and text — is the property of Nile Shoppers and may not be reproduced without written consent.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">6. Limitation of Liability</h2>
          <p>Nile Shoppers shall not be liable for indirect, incidental, or consequential damages arising from the use of our platform or products purchased.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">7. Contact</h2>
          <p>For questions about these terms, contact us at +256764593420 or support@nileshoppers.com. Located in Paidha, Zombo, Uganda.</p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
