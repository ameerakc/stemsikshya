import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Expertise from "@/components/Expertise";
import Testimonials from "@/components/Testimonials";
import HowWeTeach from "@/components/HowWeTeach";
import CtaBanner from "@/components/CtaBanner";
import TogetherMarquee from "@/components/TogetherMarquee";
import SiteFooter from "@/components/SiteFooter";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Expertise />
      <Testimonials />
      <HowWeTeach />
      <CtaBanner />
      <TogetherMarquee />
      <SiteFooter />
      <Footer />
      <ScrollProgress />
    </>
  );
}