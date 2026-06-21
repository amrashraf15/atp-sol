import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { ConvexClientProvider } from "../ConvexClientProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atp-sol.vercel.app"),

  title: {
    default: "ATP Rivalry",
    template: "%s | ATP Rivalry",
  },

  description:
    "ATP Rivalry is a tennis dashboard for tracking ATP seasons, rankings, tournaments, match history, and player rivalries.",

  applicationName: "ATP Rivalry",

  keywords: [
    "ATP",
    "Tennis",
    "ATP Rankings",
    "Grand Slam",
    "Masters 1000",
    "Tennis Dashboard",
    "Player Rivalry",
    "Match History",
    "Convex",
    "Next.js",
  ],

  authors: [{ name: "Amr Ashraf" }],
  creator: "Amr Ashraf",
  publisher: "Amr Ashraf",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "ATP Rivalry",
    description:
      "Track ATP seasons, tournaments, rankings, and player rivalries in one modern tennis dashboard.",
    url: "https://atp-sol.vercel.app",
    siteName: "ATP Rivalry",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ATP Rivalry",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ATP Rivalry",
    description:
      "Track ATP seasons, rankings, tournaments, and rivalries in one tennis dashboard.",
    images: ["/opengraph-image.png"],
  },

  category: "sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConvexClientProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ConvexClientProvider>
      </body>
    </html>
  );
} 