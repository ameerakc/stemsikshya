import Navbar from "@/components/Navbar";
import ServicesContent from "@/components/ServicesContent";
import TogetherMarquee from "@/components/TogetherMarquee";
import SiteFooter from "@/components/SiteFooter";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "Our Services – STEM Sikshya",
  description:
    "Coding, robotics, AI and drone training for Grade 1 to 12, plus job-ready IT courses.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <ServicesContent />
      <TogetherMarquee />
      <SiteFooter />
      <Footer />
      <ScrollProgress />
    </>
  );
}