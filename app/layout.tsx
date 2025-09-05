import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { ThemeProvider } from "@/lib/theme-provider";

export const metadata: Metadata = {
  title: "Laughter Ephraim – Post Production Editor",
  description:
    "Post Production Editor specializing in narrative, docs, promos, and social—DaVinci Resolve, Avid Media Composer, Premiere Pro.",
  metadataBase: new URL("https://laughterephraim.com"),
  openGraph: {
    title: "Laughter Ephraim – Post Production Editor",
    description:
      "Narrative, docs, promos, and social—DaVinci Resolve, Avid MC, Premiere Pro.",
    url: "https://laughterephraim.vercel.app",
    siteName: "Laughter Ephraim",
    images: ["/og-cover.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laughter Ephraim – Post Production Editor",
    description:
      "Narrative, docs, promos, and social—DaVinci Resolve, Avid MC, Premiere Pro.",
    images: ["/og-cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Optional: set dark class before React mounts to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var d = localStorage.getItem('dark-mode') === 'true';
                  if (d) document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="relative">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-dvh">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
