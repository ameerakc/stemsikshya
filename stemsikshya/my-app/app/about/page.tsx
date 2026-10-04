import Navbar from "@/components/Navbar";
import AboutIntro from "@/components/AboutIntro";
import AboutStats from "@/components/AboutStats";
import TeamScroll from "@/components/TeamScroll";
import AboutTestimonials from "@/components/AboutTestimonials";
import AboutExtras from "@/components/AboutExtras";
import TogetherMarquee from "@/components/TogetherMarquee";
import SiteFooter from "@/components/SiteFooter";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutIntro />
      <AboutStats />
      <TeamScroll />
      <AboutTestimonials />
      <AboutExtras />
      <TogetherMarquee />
      <SiteFooter />
      <Footer />
      <ScrollProgress />
    </>
  );
}