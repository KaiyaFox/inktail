import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import "./globals.css";
import { Theme } from '@radix-ui/themes';
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import '@radix-ui/themes/styles.css';
import UserProvider from "../contexts/UserProvider";
import React from "react";


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
      <UserProvider> {/* Context for global state user data */}
        <Theme accentColor="purple" grayColor="mauve" radius="small" scaling="100%" appearance="dark">
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flexGrow: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
        </Theme>
      </UserProvider>
      </body>
      </html>
  );
}
