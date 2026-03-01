import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ReturnPolicy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">Return Policy</h1>
      <div className="bg-card rounded-lg border p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Eligibility</h2>
          <p>Items can be returned within <strong>7 days</strong> of delivery. Products must be unused, in their original packaging, and with all tags and accessories intact.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Non-Returnable Items</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Perishable goods (food, live fish, etc.)</li>
            <li>Underwear and personal hygiene products</li>
            <li>Customized or personalized items</li>
            <li>Digital downloads and gift cards</li>
          </ul>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">How to Return</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Contact our support team at <strong>+256764593420</strong> or email support@nileshoppers.com</li>
            <li>Provide your order number and reason for return</li>
            <li>Pack the item securely in its original packaging</li>
            <li>Drop it off at an authorized return point or schedule a pickup</li>
          </ol>
        </section>
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">Refund Timeline</h2>
          <p>Refunds are processed within <strong>5–10 business days</strong> after we receive and inspect the returned item. Refunds are issued to the original payment method or as Nile Shoppers store credit.</p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default ReturnPolicy;
