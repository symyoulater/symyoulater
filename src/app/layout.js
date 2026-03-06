export const metadata = {
  title: {
    default: "SymYouLater — AI Marketing Tools",
    template: "%s | SymYouLater",
  },
  description: "10 precision AI tools for marketers, creators and businesses. Write better hashtags, captions, hooks, LinkedIn posts, ad copy and more — in seconds.",
  keywords: [
    "AI marketing tools", "hashtag generator", "caption writer", "TikTok hook generator",
    "LinkedIn post writer", "SEO meta description", "blog outline generator",
    "email subject line tester", "ad copy generator", "content calendar AI",
  ],
  authors: [{ name: "SymYouLater", url: "https://symyoulater.co.uk" }],
  creator: "SymYouLater",
  metadataBase: new URL("https://symyoulater.co.uk"),

  openGraph: {
    title: "SymYouLater — 10 AI Marketing Tools for Creators & Marketers",
    description: "Generate hashtags, captions, TikTok hooks, LinkedIn posts, ad copy and more. Free to start — no card needed.",
    url: "https://symyoulater.co.uk",
    siteName: "SymYouLater",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "SymYouLater — 10 AI Marketing Tools for Creators & Marketers",
      },
    ],
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SymYouLater — 10 AI Marketing Tools for Creators & Marketers",
    description: "Generate hashtags, captions, TikTok hooks, LinkedIn posts, ad copy and more. Free to start.",
    images: ["/og-image.svg"],
    creator: "@symyoulater",
  },

  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  alternates: {
    canonical: "https://symyoulater.co.uk",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&family=Outfit:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#080810" }}>
        {children}
      </body>
    </html>
  );
}
