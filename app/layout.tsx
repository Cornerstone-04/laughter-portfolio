import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "sonner";
import LoadingScreen from "@/components/shared/loading-screen";

export const metadata: Metadata = {
  title: "Laughter Ephraim – Post Production Editor",
  description:
    "Laughter Ephraim is an AMVCA-nominated film editor with 6+ years of experience crafting stories with precision and creativity. Passionate about the power of storytelling to connect, inspire, and entertain.",
  metadataBase: new URL("https://laughterephraim.vercel.app/"),
  openGraph: {
    title: "Laughter Ephraim – Post Production Editor",
    description:
      "Laughter Ephraim is an AMVCA-nominated film editor with 6+ years of experience crafting stories with precision and creativity. Passionate about the power of storytelling to connect, inspire, and entertain.",
    url: "https://laughterephraim.vercel.app/",
    siteName: "Laughter Ephraim",
    images: ["/android-chrome-512x512.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@film__addict",
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
    <html
      lang="en"
      className="scroll-smooth scroll-pt-20 md:scroll-pt-24"
      suppressHydrationWarning
    >
      <head>
        {/* Set initial theme BEFORE hydration to avoid flashes/mismatch */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var stored = localStorage.getItem('dark-mode');
    var shouldDark = stored === null
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : stored === 'true';
    var root = document.documentElement;
    if (shouldDark) root.classList.add('dark');
    else root.classList.remove('dark');
  } catch (e) {}
})();
            `,
          }}
        />
      </head>
      <body className="relative" suppressHydrationWarning>
        <ThemeProvider>
          <LoadingScreen />
          <Navbar />
          <main className="min-h-dvh">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
