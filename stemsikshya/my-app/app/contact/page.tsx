import Navbar from "@/components/Navbar";
import ContactContent from "@/components/ContactContent";
import SiteFooter from "@/components/SiteFooter";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "Contact Us – STEM Sikshya",
  description: "Get in touch with STEM Sikshya in Naikap, Kathmandu.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactContent />
      <SiteFooter />
      <Footer />
      <ScrollProgress />
    </>
  );
}