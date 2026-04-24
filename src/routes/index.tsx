import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Personas } from "@/components/landing/Personas";
import { MorningBriefing } from "@/components/landing/MorningBriefing";
import { Integrations } from "@/components/landing/Integrations";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anlic Suite — Your AI Workforce for Modern Commerce" },
      {
        name: "description",
        content:
          "Deploy AI employees who manage your supply chain, monitor sentiment, and run operations while you sleep. Built for small businesses and marketplace sellers.",
      },
      { property: "og:title", content: "Anlic Suite — Your AI Workforce for Modern Commerce" },
      {
        property: "og:description",
        content:
          "Deploy AI employees who manage your supply chain, monitor sentiment, and run operations while you sleep.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Personas />
      <MorningBriefing />
      <Integrations />
      <Pricing />
      <Footer />
    </div>
  );
}
