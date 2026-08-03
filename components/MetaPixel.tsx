"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getConsentStatus } from "./CookieConsent";
import { trackPageView } from "@/lib/meta-events";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function MetaPixel() {
  const [consented, setConsented] = useState(false);
  const pathname = usePathname();
  const pixelReady = useRef(false);

  useEffect(() => {
    const check = () => {
      if (getConsentStatus() === "accepted") setConsented(true);
    };
    check();
    window.addEventListener("cookieConsentUpdated", check);
    return () => window.removeEventListener("cookieConsentUpdated", check);
  }, []);

  // Track PageView on navigation — skip initial load (script handles it)
  useEffect(() => {
    if (!consented || !pixelReady.current) return;
    trackPageView();
  }, [pathname, consented]);

  if (!consented || !PIXEL_ID) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      onLoad={() => {
        pixelReady.current = true;
      }}
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
          n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${PIXEL_ID}');
          fbq('track','PageView');
        `,
      }}
    />
  );
}
