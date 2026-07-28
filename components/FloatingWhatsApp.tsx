"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/config";
import { useLanguage } from "@/context/LanguageContext";
import { track } from "@vercel/analytics";

export default function FloatingWhatsApp() {
  const { language } = useLanguage();

  if (!siteConfig.whatsappNumber) return null;

  const messages: Record<string, string> = {
    tr: "Merhaba, Albanexa web sitesinden ulaşıyorum. İşletmem için özel bir web sitesi veya dijital sistem hakkında görüşmek istiyorum.",
    en: "Hello, I am contacting you from the Albanexa website. I would like to discuss a custom website or digital system for my business.",
    de: "Hallo, ich kontaktiere Sie über die Albanexa-Website. Ich möchte ein individuelles Websystem oder eine Website für mein Unternehmen besprechen.",
  };

  const labels: Record<string, string> = {
    tr: "WhatsApp ile İletişime Geçin",
    en: "Chat on WhatsApp",
    de: "Über WhatsApp kontaktieren",
  };

  const text = encodeURIComponent(messages[language] || messages.tr);
  const label = labels[language] || labels.tr;
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;

  const handleClick = () => {
    try {
      track("whatsapp_click", { location: "floating_widget", language });
    } catch (err) {
      // Ignore tracking error
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className="fixed bottom-6 right-6 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 transition-all duration-300 hover:scale-105 hover:bg-[#22c35e] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-bg"
    >
      <MessageCircle className="h-6 w-6 fill-current" />
      <span className="sr-only">{label}</span>
    </a>
  );
}
