export const metadata = {
  title: "SymYouLater — AI Marketing Tools",
  description: "10 precision AI tools for marketers, creators and businesses. Write better content, faster.",
  keywords: "AI marketing tools, hashtag generator, caption writer, content calendar, social media tools",
  openGraph: {
    title: "SymYouLater — AI Marketing Tools",
    description: "10 precision AI tools for marketers, creators and businesses.",
    url: "https://symyoulater.co.uk",
    siteName: "SymYouLater",
    type: "website",
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
