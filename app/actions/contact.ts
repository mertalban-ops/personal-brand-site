"use server";

import { headers } from "next/headers";

type ContactSubmitResult = {
  success: boolean;
  message: string;
};

// In-memory rate limiting map for basic protection
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 submissions per minute

export async function submitContactForm(prevState: any, formData: FormData): Promise<ContactSubmitResult> {
  try {
    // 1. Honeypot check (hidden field)
    const honeypot = formData.get("cf_website_confirm");
    if (honeypot && honeypot.toString().length > 0) {
      // Quietly reject bot submissions
      return { success: true, message: "Submission simulated successfully" };
    }

    // 2. Basic Rate Limiting check based on client IP
    const clientHeaders = await headers();
    const clientIp = clientHeaders.get("x-forwarded-for") || "unknown-ip";
    
    const now = Date.now();
    const ipTimestamps = rateLimitMap.get(clientIp) || [];
    const validTimestamps = ipTimestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
    
    if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return {
        success: false,
        message: "Çok fazla istek gönderdiniz. Lütfen bir dakika bekleyip tekrar deneyin.",
      };
    }
    
    validTimestamps.push(now);
    rateLimitMap.set(clientIp, validTimestamps);

    // 3. Extract and validate fields (Faz 10)
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const company = formData.get("company")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const needType = formData.get("needType")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";
    
    const currentMethod = formData.get("currentMethod")?.toString().trim() || "";
    const problem = formData.get("problem")?.toString().trim() || "";
    const userCount = formData.get("userCount")?.toString().trim() || "";
    const timeline = formData.get("timeline")?.toString().trim() || "";
    const budget = formData.get("budget")?.toString().trim() || "";
    const additionalInfo = formData.get("additionalInfo")?.toString().trim() || "";

    // Server-side validation
    if (!name || name.length < 2) {
      return { success: false, message: "Lütfen geçerli bir isim girin." };
    }
    if (!email || !email.includes("@")) {
      return { success: false, message: "Lütfen geçerli bir e-posta adresi girin." };
    }
    if (!needType) {
      return { success: false, message: "Lütfen ihtiyacınız olan çözüm türünü seçin." };
    }
    if (!problem || problem.length < 10) {
      return { success: false, message: "Lütfen yaşadığınız problemi biraz daha detaylı açıklayın (en az 10 karakter)." };
    }

    // 4. Simulate saving to database or sending notification email
    console.log(`[SECURE SUBMIT] Success submission from ${email} (${name}) for ${needType}`);
    console.log({
      name,
      email,
      company,
      phone,
      needType,
      message,
      currentMethod,
      problem,
      userCount,
      timeline,
      budget,
      additionalInfo,
      timestamp: new Date().toISOString(),
      clientIp
    });

    // In a real application, connect to database or send an email:
    // await supabase.from('leads').insert([{ name, email, ... }])

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
