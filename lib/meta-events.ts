declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackPageView() {
  window.fbq?.("track", "PageView");
}

export function trackViewContent(contentName: string) {
  window.fbq?.("track", "ViewContent", { content_name: contentName });
}

export function trackContact() {
  window.fbq?.("track", "Contact");
}

export function trackLead() {
  window.fbq?.("track", "Lead");
}
