import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do I place an order?", a: "Browse products, add items to your cart, and proceed to checkout. You can pay via Mobile Money (MTN MoMo, Airtel Money), bank transfer, or card." },
  { q: "What payment methods do you accept?", a: "We accept MTN Mobile Money, Airtel Money, Visa, Mastercard, and bank transfers. Cash on delivery is available in select areas." },
  { q: "How long does delivery take?", a: "Delivery typically takes 2–5 business days within major towns, and up to 7 days for rural areas across Uganda." },
  { q: "What is your return policy?", a: "You can return most items within 7 days of delivery. Items must be unused, in original packaging with all accessories. See our Return Policy page for details." },
  { q: "Do you deliver outside Uganda?", a: "Currently we deliver within Uganda only. We plan to expand to South Sudan, DRC, and Kenya soon." },
  { q: "How do I track my order?", a: "Visit the Help Center and use the Track Order tool with your order ID, or contact us at +256764593420 for status updates." },
  { q: "Are your products genuine?", a: "Yes! We source directly from authorized distributors and manufacturers. All electronics come with manufacturer warranty." },
  { q: "Can I cancel my order?", a: "Orders can be cancelled within 24 hours of placement if they haven't been shipped yet. Contact support to request cancellation." },
  { q: "Is my personal data safe?", a: "Absolutely. We use encryption and follow best practices to protect your personal and payment information." },
  { q: "How do I become a seller on Nile Shoppers?", a: "Visit the 'Sell on Nile Shoppers' page and fill out the seller application form. Our team will review and get back to you within 48 hours." },
];

const FAQs = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h1>
      <div className="bg-card rounded-lg border p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-sm text-left font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
    <Footer />
  </div>
);

export default FAQs;
