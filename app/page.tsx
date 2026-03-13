// app/page.tsx  (or app/(marketing)/page.tsx — wherever your home route lives)

import EmployersSection from "@/components/home/EmployersSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import Footer from "@/components/home/Footer";
import GlobalStyles from "@/components/home/Globalstyles";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import Navbar from "@/components/home/Navbar";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";
export default function HomePage() {
  return (
    <div
      className="min-h-screen text-slate-900 overflow-x-hidden grain"
      style={{ background: "#e9eff8", fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Inject CSS animations & fonts once */}
      <GlobalStyles />

      {/* Grain overlay */}
      <div />

      <Navbar />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <EmployersSection />
      <ContactSection />
      <Footer />
    </div>
  );
}