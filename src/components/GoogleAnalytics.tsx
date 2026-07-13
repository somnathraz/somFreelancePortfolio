import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Loads afterInteractive so ads/conversion events are not missed without blocking LCP. */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){window.dataLayer.push(arguments);};
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            send_page_view: false,
            transport_type: 'beacon'
          });
        `}
      </Script>
    </>
  );
}
