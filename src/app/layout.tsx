import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Sora } from "next/font/google";
import { MotionProvider } from "@/components/animations/motion-provider";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { BackgroundStickers } from "@/components/ui/background-stickers";
import { siteConfig } from "@/config/site";
import { organizationJsonLd, serializeJsonLd, websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

// Sora gives headings an engineered, geometric voice; Instrument Sans keeps
// long-form text calm and readable. Both are self-hosted by next/font.
const heading = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1e32" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.language} suppressHydrationWarning className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-dvh antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <MotionProvider>
            <BackgroundStickers />
            <a
              href="#main-content"
              className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-lg transition-transform focus:translate-y-0"
            >
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </ThemeProvider>

        <script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd()) }}
        />
        <script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd()) }}
        />
      </body>
    </html>
  );
}
