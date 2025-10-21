import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) – CoverArtLand",
  description:
    "Answers to common questions about Coverartland, our digital cover artworks, purchasing, licensing, delivery, and more.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions (FAQ) – CoverArtLand",
    description:
      "Find answers to common questions about Coverartland, our digital products, and the purchase process.",
    type: "website",
    url: "/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions (FAQ) – CoverArtLand",
    description:
      "Answers to common questions about our cover artworks, purchasing, delivery, licensing, refunds, and more.",
  },
};

function lastUpdatedLabel() {
  const d = new Date();
  const month = d.toLocaleString("en-US", { month: "long" });
  const year = d.getFullYear();
  return `${month}, ${year}`;
}

export default function FAQPage() {
  return (
    <main>
      <section className="border-b bg-gradient-to-b from-muted/40 to-background">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Frequently Asked Questions (FAQ) – CoverArtLand
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {lastUpdatedLabel()}</p>
          <p className="mt-5 max-w-3xl text-base text-muted-foreground">
            Below you’ll find answers to some of the most common questions about Coverartland, our digital products, and the purchase process.
          </p>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4 py-10">
          <Accordion type="single" collapsible>
            {[
              {
                q: "1. What is Coverartland?",
                a: (
                  <>Coverartland is an online marketplace where you can purchase custom and pre-made digital cover artworks for your music. We provide high-quality designs for artists, producers, and record labels who want professional visuals for their music releases.</>
                ),
              },
              {
                q: "2. How do I purchase a cover artwork?",
                a: (
                  <>Simply browse through our collection, choose the artwork you like, and click “Buy Now.” You can pay securely through Mastercard or Paypal. Once your payment is confirmed, you’ll receive an email with a download link or your custom design file.</>
                ),
              },
              {
                q: "3. Are the covers unique or reused?",
                a: (
                  <>Most pre-made covers are sold only once, which means once you purchase it, it becomes exclusive to you and will be marked as “Sold.” However, some templates or customizable designs may be available for multiple buyers. Details are always mentioned on each product page.</>
                ),
              },
              {
                q: "4. Can I request a custom cover?",
                a: (
                  <>Yes! We offer custom cover design services tailored to your vision. Visit our Custom Cover Art Design page for more details.</>
                ),
              },
              {
                q: "5. How will I receive my purchased cover?",
                a: (
                  <>All products are digital. After your payment is processed, you’ll receive your cover via email or direct download link. No physical delivery is required.</>
                ),
              },
              {
                q: "6. What file formats do you provide?",
                a: (
                  <>We usually deliver covers in 2 versions, blank and with artist and music piece names, and in JPG or PNG format (3000×3000 px) suitable for all major streaming platforms (Spotify, Apple Music, SoundCloud, etc.). Custom designs can also include PSD (Photoshop) files upon request.</>
                ),
              },
              {
                q: "7. Do you offer refunds?",
                a: (
                  <>Because all of our products are digital, all sales are final. Refunds are only available if the file is defective, corrupted, or incorrect. Please review our Refund Policy for full details.</>
                ),
              },
              {
                q: "8. Can I use the artwork commercially?",
                a: (
                  <>Yes. Once purchased, you have a non-exclusive license to use the artwork for your personal or commercial music projects, such as album covers, singles, streaming releases, or social media promotions. You cannot resell, redistribute, or claim ownership of the design.</>
                ),
              },
              {
                q: "9. What payment methods do you accept?",
                a: (
                  <>We accept payments through major providers, which support most major credit and debit cards. All transactions are encrypted and 100% secure.</>
                ),
              },
              {
                q: "10. How long does it take to receive a custom cover?",
                a: <>We guarantee delivery within 24 hours after payment.</>,
              },
              {
                q: "11. Can I make changes to a pre-made cover after purchase?",
                a: (
                  <>Minor edits such as adding your artist name or title are included. For major changes (colors, backgrounds, etc.), additional fees may apply. Contact us for customization options.</>
                ),
              },
              {
                q: "12. I didn’t receive my download link. What should I do?",
                a: (
                  <>
                    Please check your spam or junk folder first. If the email isn’t there, contact us at {" "}
                    <a href="mailto:purchases@coverartland.com" className="underline">
                      purchases@coverartland.com
                    </a>{" "}
                    and include your order number—we’ll resend the file promptly.
                  </>
                ),
              },
              {
                q: "13. Are your designs original?",
                a: (
                  <>Yes. All our artworks are created by professional designers. We ensure that every design is original and not copied or generated from copyrighted materials.</>
                ),
              },
              {
                q: "14. Can I resell or redistribute the artwork I buy?",
                a: (
                  <>No. Purchased artworks are for personal or commercial use only. Reselling, redistributing, or rebranding them as your own is strictly prohibited.</>
                ),
              },
              {
                q: "15. How can I contact CoverArtLand?",
                a: (
                  <>
                    You can reach us anytime at {" "}
                    <a href="mailto:support@coverartland.com" className="underline">
                      support@coverartland.com
                    </a>
                    .
                  </>
                ),
              },
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx + 1}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
}
