import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { ThemeProvider } from "@/lib/theme-provider";

export const metadata: Metadata = {
  title: "Laughter Ephraim – Post Production Editor",
  description:
    "Laughter Ephraim is an AMVCA-nominated film editor with 6+ years of experience crafting stories with precision and creativity. Passionate about the power of storytelling to connect, inspire, and entertain.",
  metadataBase: new URL("https://laughterephraim.vercel.app"),
  openGraph: {
    title: "Laughter Ephraim – Post Production Editor",
    description:
      "Laughter Ephraim is an AMVCA-nominated film editor with 6+ years of experience crafting stories with precision and creativity. Passionate about the power of storytelling to connect, inspire, and entertain.",
    url: "https://laughterephraim.vercel.app",
    siteName: "Laughter Ephraim",
    images: ["/android-chrome-512x512.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laughter Ephraim – Post Production Editor",
    description:
      "Laughter Ephraim is an AMVCA-nominated film editor with 6+ years of experience crafting stories with precision and creativity. Passionate about the power of storytelling to connect, inspire, and entertain.",
    images: ["/android-chrome-512x512.png"],
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
