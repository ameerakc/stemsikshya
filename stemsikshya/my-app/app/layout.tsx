import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "STEM Sikshya – Coding, Robotics and AI",
  description:
    "STEAM education institute for Coding, Robotics, AI and IT Training.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfair.variable}  overflow-x-hidden bg-white antialiased`}
        style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}