import "@/styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { DEFAULT_METADATA, DEFAULT_URL } from "@/lib/constants";
import HolyLoader from "holy-loader";

export const metadata: Metadata = {
  title: {
    template: "%s | " + DEFAULT_METADATA.title,
    default: DEFAULT_METADATA.title,
  },
  description: DEFAULT_METADATA.description,
  //@ts-ignore
  metadataBase: new URL(DEFAULT_URL),
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
  twitter: {
    ...DEFAULT_METADATA.twitter
  },
  openGraph: {
    ...DEFAULT_METADATA.openGraph
  },
};
export const runtime = "edge";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HolyLoader color="#3b82f6" showSpinner />
        <div>
          <header className="bg-zinc-950 border-t border-zinc-800 lg:border-r fixed bottom-0 lg:top-0 left-0 z-10 h-16 w-full lg:h-full lg:w-20">
            <Navbar />
          </header>
          <div className="overflow-hidden pb-16 lg:pl-20 lg:pb-0 min-h-screen flex flex-col">
            <div className="flex-1 h-full">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
