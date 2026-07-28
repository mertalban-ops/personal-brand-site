"use server";

import { headers } from "next/headers";

type ContactSubmitResult = {
  success: boolean;
  message: string;
};

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

function countryFlag(code: string): string {
  if (!code || code.length !== 2) return "";
  return [...code.toUpperCase()].map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)).join("");
}

function parseUserAgent(ua: string): { device: string; browser: string; os: string } {
  const isPhone = /iPhone|Android.*Mobile|Windows Phone/i.test(ua);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);
  const device = isPhone ? "📱 Telefon" : isTablet ? "📟 Tablet" : "💻 Masaüstü";

  let browser = "Bilinmiyor";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/i.test(ua)) browser = "Opera";
  else if (/Chrome\/(?!.*Chromium)/i.test(ua) && !/Edg/i.test(ua)) browser = "Chrome";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Safari\/(?!.*Chrome)/i.test(ua)) browser = "Safari";

  let os = "Bilinmiyor";
  if (/Windows NT 10/i.test(ua)) os = "Windows 10/11";
  else if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/iPhone OS ([\d_]+)/i.test(ua)) os = `iOS ${ua.match(/iPhone OS ([\d_]+)/i)![1].replace(/_/g, ".")}`;
  else if (/iPad.*OS ([\d_]+)/i.test(ua)) os = `iPadOS ${ua.match(/iPad.*OS ([\d_]+)/i)![1].replace(/_/g, ".")}`;
  else if (/Android ([\d.]+)/i.test(ua)) os = `Android ${ua.match(/Android ([\d.]+)/i)![1]}`;
  else if (/Mac OS X ([\d_]+)/i.test(ua)) os = `macOS ${ua.match(/Mac OS X ([\d_]+)/i)![1].replace(/_/g, ".")}`;
  else if (/Linux/i.test(ua)) os = "Linux";

  return { device, browser, os };
}

function parseReferer(referer: string): string {
  if (!referer) return "Direkt / Bilinmiyor";
  try {
    const url = new URL(referer);
    const host = url.hostname.replace(/^www\./, "");
    if (host.includes("google")) return `🔍 Google`;
    if (host.includes("bing")) return `🔍 Bing`;
    if (host.includes("instagram")) return `📷 Instagram`;
    if (host.includes("linkedin")) return `💼 LinkedIn`;
    if (host.includes("twitter") || host.includes("x.com")) return `🐦 Twitter/X`;
    if (host.includes("facebook")) return `👥 Facebook`;
    if (host.includes("youtube")) return `▶️ YouTube`;
    if (host.includes("albanexa")) return `🔁 Albanexa (iç link)`;
    return `🌐 ${host}`;
  } catch {
    return "Direkt / Bilinmiyor";
  }
}

async function getGeoInfo(ip: string): Promise<{ location: string; isp: string; timezone: string; flag: string }> {
  const cleanIp = ip.split(",")[0].trim();
  if (cleanIp === "unknown-ip" || cleanIp === "::1" || cleanIp.startsWith("127.") || cleanIp.startsWith("192.168.")) {
    return { location: "Yerel / Test", isp: "-", timezone: "-", flag: "🏠" };
  }
  try {
    const res = await fetch(
      `http://ip-api.com/json/${cleanIp}?fields=country,countryCode,city,regionName,isp,timezone&lang=tr`,
      { signal: AbortSignal.timeout(3000) }
    );
    if (!res.ok) throw new Error();
    const d = await res.json();
    const flag = countryFlag(d.countryCode || "");
    const location = [d.city, d.regionName, d.country].filter(Boolean).join(", ");
    return { location: location || "Bilinmiyor", isp: d.isp || "-", timezone: d.timezone || "-", flag };
  } catch {
    return { location: "Geolocation hatası", isp: "-", timezone: "-", flag: "🌍" };
  }
}

export async function submitContactForm(prevState: any, formData: FormData): Promise<ContactSubmitResult> {
  try {
    const honeypot = formData.get("cf_website_confirm");
    if (honeypot && honeypot.toString().length > 0) {
      return { success: true, message: "Submission simulated successfully" };
    }

    const clientHeaders = await headers();
    const clientIp = clientHeaders.get("x-forwarded-for") || "unknown-ip";

    const now = Date.now();
    const ipTimestamps = rateLimitMap.get(clientIp) || [];
    const validTimestamps = ipTimestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
    if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return { success: false, message: "Çok fazla istek gönderdiniz. Lütfen bir dakika bekleyip tekrar deneyin." };
    }
    validTimestamps.push(now);
    rateLimitMap.set(clientIp, validTimestamps);

    const name        = formData.get("name")?.toString().trim() || "";
    const email       = formData.get("email")?.toString().trim() || "";
    const company     = formData.get("company")?.toString().trim() || "";
    const phone       = formData.get("phone")?.toString().trim() || "";
    const needType    = formData.get("needType")?.toString().trim() || "";
    const message     = formData.get("message")?.toString().trim() || "";
    const currentMethod  = formData.get("currentMethod")?.toString().trim() || "";
    const problem        = formData.get("problem")?.toString().trim() || "";
    const userCount      = formData.get("userCount")?.toString().trim() || "";
    const timeline       = formData.get("timeline")?.toString().trim() || "";
    const budget         = formData.get("budget")?.toString().trim() || "";
    const additionalInfo = formData.get("additionalInfo")?.toString().trim() || "";

    if (!name || name.length < 2) return { success: false, message: "Lütfen geçerli bir isim girin." };
    if (!email || !email.includes("@")) return { success: false, message: "Lütfen geçerli bir e-posta adresi girin." };
    if (!needType) return { success: false, message: "Lütfen ihtiyacınız olan çözüm türünü seçin." };
    if (!problem || problem.length < 10) return { success: false, message: "Lütfen yaşadığınız problemi biraz daha detaylı açıklayın (en az 10 karakter)." };

    // Collect visitor intelligence silently
    const ua      = clientHeaders.get("user-agent") || "";
    const referer = clientHeaders.get("referer") || "";
    const lang    = clientHeaders.get("accept-language")?.split(",")[0] || "-";
    const { device, browser, os } = parseUserAgent(ua);
    const source = parseReferer(referer);
    const geo = await getGeoInfo(clientIp);
    const localTime = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });

    // Send Telegram notification
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId   = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const lines = [
        `📬 Albanexa — Yeni Form Gönderimi`,
        ``,
        `👤 Ad: ${name}`,
        company ? `🏢 Firma: ${company}` : null,
        `✉️ E-posta: ${email}`,
        phone ? `📞 Telefon: ${phone}` : null,
        `🎯 İhtiyaç: ${needType}`,
        ``,
        `📝 Problem:\n${problem}`,
        currentMethod  ? `⚙️ Mevcut Yöntem: ${currentMethod}` : null,
        userCount      ? `👥 Kullanıcı Sayısı: ${userCount}` : null,
        timeline       ? `📅 Süre: ${timeline}` : null,
        budget         ? `💰 Bütçe: ${budget}` : null,
        additionalInfo ? `💬 Ek Bilgi: ${additionalInfo}` : null,
        message        ? `📄 Mesaj: ${message}` : null,
        ``,
        `─────────────────────`,
        `${geo.flag} Konum: ${geo.location}`,
        `📡 İSS: ${geo.isp}`,
        `🕐 Saat Dilimi: ${geo.timezone}`,
        `${device} · ${browser} · ${os}`,
        `🔗 Nereden: ${source}`,
        `🗣️ Dil: ${lang}`,
        ``,
        `🕑 ${localTime}`,
      ].filter(Boolean).join("\n");

      const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: lines }),
      });
      if (!tgRes.ok) {
        console.error("[TG] send failed:", await tgRes.text());
      }
    } else {
      console.error("[TG] missing env vars — BOT_TOKEN:", !!botToken, "CHAT_ID:", !!chatId);
    }

    return {
      success: true,
      message: "Talebiniz başarıyla alındı! Mert Alban en kısa sürede sizinle iletişime geçecek.",
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message: "Sistemde teknik bir hata oluştu. Lütfen daha sonra tekrar deneyin veya doğrudan e-posta ile ulaşın.",
    };
  }
}
