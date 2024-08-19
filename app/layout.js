import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cardify",
  description: "Simplify learning effortlessly",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
        <Script src="https://cdn.tailwindcss.com" strategy="lazyOnload" />
        </head>
        <body className={inter.className}>{children}</body>
        <Analytics/>
      </html>
    </ClerkProvider>
  );
}
