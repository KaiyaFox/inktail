import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import "./globals.css";
import { Theme } from '@radix-ui/themes';
import Navbar from "./components/Navbar";
import '@radix-ui/themes/styles.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InkTail - Expression Unleashed",
  description: "Commissioned art and design.",

};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <Theme accentColor="crimson" grayColor="sand" radius="small" scaling="95%" appearance="dark">
    <Navbar />
    {children}
    <Footer />
    </Theme>
    </body>
    </html>
  );
}
