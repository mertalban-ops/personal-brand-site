"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Wallet, ShoppingCart, TrendingUp, Check,
  Wrench, Car, CheckCircle2, Clock, AlertCircle,
  Shield, Search, BarChart3, Users, Download,
  Bell, FileText, ChevronRight, Zap,
} from "lucide-react";

type ProjectType = "stockapp" | "auto-service" | "carpass" | "business-dashboard";

// ── Typewriter ─────────────────────────────────────────────────────────
function Typewriter({ text, speed = 52 }: { text: string; speed?: number }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return (
    <span>
      {out}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block ml-px"
        style={{ width: 1.5, height: "0.8em", background: "#10b981", verticalAlign: "middle" }}
      />
    </span>
  );
}

// ── Shared UI primitives ───────────────────────────────────────────────
const s = {
  bg: "#07121c",
  card: "rgba(11,31,51,0.85)",
  border: "rgba(255,255,255,0.07)",
  ink: "#eef2f6",
  muted: "#9baebd",
  faint: "#4b667e",
  accent: "#10b981",
  blue: "#38bdf8",
  amber: "#f59e0b",
};

function StatCard({ icon: Icon, label, value, sub, color = s.accent }: {
  icon: React.ElementType; label: string; value: string; sub?: string; color?: string;
}) {
  return (
    <div style={{ background: s.card, border: `1px solid ${s.border}`, borderRadius: 10, padding: "10px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
        <div style={{ background: `${color}22`, borderRadius: 5, padding: 4 }}>
          <Icon size={10} color={color} />
        </div>
        <span style={{ color: s.faint, fontSize: "0.56rem", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{label}</span>
      </div>
      <p style={{ color: s.ink, fontSize: "0.88rem", fontWeight: 700, margin: 0 }}>{value}</p>
      {sub && <p style={{ color: s.faint, fontSize: "0.54rem", margin: "2px 0 0" }}>{sub}</p>}
    </div>
  );
}

function TableRow({ cells, highlight }: { cells: string[]; highlight?: boolean }) {
  return (
    <motion.div
      animate={highlight ? { backgroundColor: ["rgba(16,185,129,0.18)", "rgba(16,185,129,0.04)"] } : {}}
      transition={highlight ? { duration: 1.8, delay: 0.2 } : {}}
      style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "5px 10px", borderBottom: `1px solid ${s.border}` }}
    >
      {cells.map((c, i) => (
        <span key={i} style={{ color: highlight && i === 0 ? s.accent : i === 0 ? s.ink : s.muted, fontSize: "0.61rem", fontWeight: highlight && i === 0 ? 700 : 400 }}>{c}</span>
      ))}
    </motion.div>
  );
}

function FormField({ label, value, typing, active }: { label: string; value: string; typing?: boolean; active?: boolean }) {
  return (
    <div style={{ marginBottom: 7 }}>
      <p style={{ color: s.faint, fontSize: "0.55rem", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "0.09em", marginBottom: 3 }}>{label}</p>
      <div style={{ background: s.bg, border: `1px solid ${active ? s.accent : s.border}`, borderRadius: 6, padding: "5px 9px", fontSize: "0.68rem", color: value ? s.ink : s.faint, minHeight: 26, boxShadow: active ? `0 0 0 2px rgba(16,185,129,0.12)` : "none" }}>
        {typing && active ? <Typewriter text={value} /> : value}
      </div>
    </div>
  );
}

function SectionTitle({ label, right }: { label: string; right?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
      <p style={{ color: s.ink, fontSize: "0.72rem", fontWeight: 700 }}>{label}</p>
      {right && <span style={{ color: s.accent, fontSize: "0.58rem" }}>{right}</span>}
    </div>
  );
}

function SuccessBadge({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 10, padding: "0 8px" }}>
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        style={{ background: "rgba(16,185,129,0.14)", borderRadius: "50%", padding: 14, border: `2px solid rgba(16,185,129,0.35)`, boxShadow: "0 0 28px rgba(16,185,129,0.2)" }}
      >
        <Check size={28} color={s.accent} strokeWidth={2.5} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ textAlign: "center" as const }}>
        <p style={{ color: s.accent, fontSize: "0.62rem", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: 4 }}>{title}</p>
        <p style={{ color: s.ink, fontSize: "1.45rem", fontWeight: 800, margin: "4px 0" }}>{value}</p>
        {sub && <p style={{ color: s.muted, fontSize: "0.61rem" }}>{sub}</p>}
      </motion.div>
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────
function AnalysisRow({ label, status, delay }: { label: string; status: "ok" | "warn" | "check"; delay: number }) {
  const color = status === "ok" ? s.accent : status === "warn" ? s.amber : s.blue;
  const Icon = status === "ok" ? CheckCircle2 : status === "warn" ? AlertCircle : Search;
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}
      style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${s.border}` }}
    >
      <Icon size={12} color={color} />
      <span style={{ color: s.muted, fontSize: "0.62rem", flex: 1 }}>{label}</span>
      <motion.div
        initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: delay + 0.15, duration: 0.6, ease: "easeOut" }}
        style={{ height: 3, background: `${color}20`, borderRadius: 4, width: "30%", overflow: "hidden" }}
      >
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: delay + 0.15, duration: 0.6, ease: "easeOut" }}
          style={{ height: "100%", background: color, transformOrigin: "left" }}
        />
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.75 }}
        style={{ color, fontSize: "0.58rem", fontWeight: 700, fontFamily: "monospace", minWidth: 28, textAlign: "right" as const }}
      >
        {status === "ok" ? "TEMİZ" : status === "warn" ? "UYARI" : "KONTROL"}
      </motion.span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN SETS
// ─────────────────────────────────────────────────────────────────────

// ── StockApp ──────────────────────────────────────────────────────────
const stockScreens = [
  // 0 — Dashboard
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, gap: 9, height: "100%" }}>
      <SectionTitle label="Operasyon Paneli" right="Bugün · 14:32" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        <StatCard icon={Package} label="Aktif Ürün" value="1.248" sub="14 kritik stok" />
        <StatCard icon={Wallet} label="Açık Cari" value="₺284.500" sub="37 müşteri" color={s.blue} />
        <StatCard icon={ShoppingCart} label="Bekleyen Sipariş" value="23" sub="bugün girildi" color={s.amber} />
        <StatCard icon={TrendingUp} label="Tahsilat" value="₺96.200" sub="+%18 geçen ay" />
      </div>
      <div style={{ background: s.card, border: `1px solid ${s.border}`, borderRadius: 8, padding: "8px 10px", flex: 1 }}>
        <p style={{ color: s.faint, fontSize: "0.54rem", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 6 }}>Son İşlemler</p>
        {[
          { dot: s.accent, label: "Tahsilat — Çelik Ltd.", val: "+₺12.000" },
          { dot: s.amber, label: "Stok Çıkışı — #SIP-1021", val: "−48 Adet" },
          { dot: s.blue, label: "Yeni Müşteri — Alpay AŞ", val: "Eklendi" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, padding: "3.5px 0", borderBottom: i < 2 ? `1px solid ${s.border}` : "none" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: r.dot, flexShrink: 0 }} />
            <span style={{ color: s.muted, fontSize: "0.59rem", flex: 1 }}>{r.label}</span>
            <span style={{ color: s.ink, fontSize: "0.59rem", fontWeight: 600 }}>{r.val}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  // 1 — Stok ekle form
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 13 }}>
        <div style={{ background: "rgba(16,185,129,0.13)", border: `1px solid rgba(16,185,129,0.3)`, borderRadius: 6, padding: "3px 9px" }}>
          <span style={{ color: s.accent, fontSize: "0.58rem", fontWeight: 700, fontFamily: "monospace" }}>+ YENİ STOK GİRİŞİ</span>
        </div>
      </div>
      <FormField label="Ürün Adı" value="Samsung 55'' Neo QLED TV" typing active />
      <FormField label="Stok Kodu" value="SAM-TV-55-Q80C" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <FormField label="Miktar" value="12 Adet" />
        <FormField label="Birim Fiyat" value="₺15.900" />
      </div>
      <FormField label="Kategori" value="Elektronik / TV & Görüntü" />
      <motion.div
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0 }}
        style={{ marginTop: "auto", background: s.accent, borderRadius: 8, padding: "8px", textAlign: "center" as const, cursor: "pointer" }}
      >
        <span style={{ color: "#000", fontSize: "0.7rem", fontWeight: 700 }}>Kaydet  →</span>
      </motion.div>
    </div>
  ),
  // 2 — Stok listesi
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, height: "100%" }}>
      <SectionTitle label="Stok Listesi" right="1.249 kayıt" />
      <div style={{ background: s.bg, borderRadius: 8, border: `1px solid ${s.border}`, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "5px 10px", borderBottom: `1px solid ${s.border}`, background: "rgba(255,255,255,0.03)" }}>
          {["Ürün", "Stok", "Fiyat"].map(h => (
            <span key={h} style={{ color: s.faint, fontSize: "0.53rem", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{h}</span>
          ))}
        </div>
        <TableRow cells={["Samsung 55'' Neo QLED ✦", "12", "₺15.900"]} highlight />
        <TableRow cells={["iPhone 16 Pro 256GB", "31", "₺62.990"]} />
        <TableRow cells={["Sony WH-1000XM5", "8", "₺8.499"]} />
        <TableRow cells={["MacBook Air M3", "5", "₺54.900"]} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        style={{ marginTop: 9, display: "flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 7, padding: "7px 10px" }}
      >
        <CheckCircle2 size={13} color={s.accent} />
        <span style={{ color: s.accent, fontSize: "0.62rem", fontWeight: 600 }}>Stok başarıyla eklendi — Samsung 55''</span>
      </motion.div>
    </div>
  ),
  // 3 — Tahsilat
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", height: "100%", gap: 12 }}>
      <SuccessBadge title="Tahsilat Kaydedildi" value="₺12.000" sub="Çelik Ltd. — Şubat 2025 bakiyesine işlendi" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ background: s.card, border: `1px solid ${s.border}`, borderRadius: 9, padding: "9px 14px", width: "100%" }}>
        {[
          ["Ödeme Yöntemi", "Banka Havalesi"],
          ["Önceki Bakiye", "₺284.500"],
          ["Kalan Bakiye", "₺272.500"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "3.5px 0", borderBottom: `1px solid ${s.border}` }}>
            <span style={{ color: s.muted, fontSize: "0.61rem" }}>{k}</span>
            <span style={{ color: s.ink, fontSize: "0.63rem", fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </motion.div>
    </div>
  ),
];

// ── AutoService ────────────────────────────────────────────────────────
const autoScreens = [
  // 0 — İş emirleri listesi
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, height: "100%" }}>
      <SectionTitle label="İş Emirleri" right="7 aktif" />
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 6, flex: 1 }}>
        {[
          { id: "#SRV-089", plate: "34 ABC 789", svc: "Yağ Değişimi", status: "Tamamlandı", color: s.accent },
          { id: "#SRV-090", plate: "06 XYZ 123", svc: "Fren Bakımı", status: "İşlemde", color: s.blue },
          { id: "#SRV-091", plate: "35 DEF 456", svc: "Periyodik Bakım", status: "Bekliyor", color: s.amber },
          { id: "#SRV-092", plate: "16 GHI 778", svc: "Elektrik Arızası", status: "Bekliyor", color: s.amber },
        ].map((row, i) => (
          <motion.div key={row.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
            style={{ background: s.card, border: `1px solid ${s.border}`, borderRadius: 8, padding: "8px 11px", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ background: `${row.color}15`, borderRadius: 5, padding: "4px 7px", minWidth: 28, textAlign: "center" as const }}>
              <Wrench size={10} color={row.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: s.faint, fontSize: "0.56rem", fontFamily: "monospace" }}>{row.id}</span>
                <span style={{ color: s.muted, fontSize: "0.58rem", fontFamily: "monospace" }}>·</span>
                <span style={{ color: s.ink, fontSize: "0.62rem", fontWeight: 600, fontFamily: "monospace" }}>{row.plate}</span>
              </div>
              <p style={{ color: s.muted, fontSize: "0.6rem", margin: "1px 0 0" }}>{row.svc}</p>
            </div>
            <span style={{ color: row.color, fontSize: "0.56rem", fontWeight: 700, background: `${row.color}15`, borderRadius: 4, padding: "2px 6px" }}>{row.status}</span>
          </motion.div>
        ))}
      </div>
    </div>
  ),
  // 1 — Yeni iş emri
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 13 }}>
        <div style={{ background: "rgba(56,189,248,0.12)", border: `1px solid rgba(56,189,248,0.28)`, borderRadius: 6, padding: "3px 9px" }}>
          <span style={{ color: s.blue, fontSize: "0.58rem", fontWeight: 700, fontFamily: "monospace" }}>+ YENİ İŞ EMRİ</span>
        </div>
      </div>
      <FormField label="Araç Plakası" value="34 MRT 2025" typing active />
      <FormField label="Müşteri Adı" value="Mert Alban" />
      <FormField label="Servis Türü" value="Periyodik Bakım + Yağ Değişimi" />
      <FormField label="Km / Tahmini Süre" value="87.420 km  ·  2-3 saat" />
      <FormField label="Not" value="Isıtma sistemi de kontrol edilecek" />
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1 }}
        style={{ marginTop: "auto", background: s.blue, borderRadius: 8, padding: "8px", textAlign: "center" as const }}>
        <span style={{ color: "#000", fontSize: "0.7rem", fontWeight: 700 }}>İş Emri Oluştur  →</span>
      </motion.div>
    </div>
  ),
  // 2 — Servis adımları
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, height: "100%" }}>
      <div style={{ marginBottom: 12 }}>
        <p style={{ color: s.ink, fontSize: "0.72rem", fontWeight: 700 }}>Servis Takibi</p>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
          <span style={{ color: s.faint, fontSize: "0.56rem", fontFamily: "monospace" }}>#SRV-093</span>
          <span style={{ color: s.faint }}>·</span>
          <span style={{ color: s.ink, fontSize: "0.6rem", fontFamily: "monospace" }}>34 MRT 2025</span>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" as const, gap: 2 }}>
        {[
          { label: "Araç Kabul ve Muayene", done: true, delay: 0 },
          { label: "Yıkama ve Hazırlık", done: true, delay: 0.12 },
          { label: "Yağ & Filtre Değişimi", done: true, delay: 0.24 },
          { label: "Fren & Süspansiyon Kontrolü", done: false, active: true, delay: 0.36 },
          { label: "Kalite Kontrol & Test", done: false, delay: 0.48 },
          { label: "Müşteriye Teslim", done: false, delay: 0.6 },
        ].map((step, i) => (
          <motion.div key={step.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: step.delay }}
            style={{ display: "flex", alignItems: "center", gap: 9, padding: "6px 10px", borderRadius: 7,
              background: step.active ? "rgba(56,189,248,0.08)" : "transparent",
              border: step.active ? `1px solid rgba(56,189,248,0.2)` : "1px solid transparent" }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              background: step.done ? s.accent : step.active ? s.blue : "rgba(255,255,255,0.05)",
              border: step.done ? "none" : step.active ? `1px solid ${s.blue}` : `1px solid ${s.border}` }}>
              {step.done ? <Check size={9} color="#000" strokeWidth={3} /> : step.active ?
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}><Clock size={9} color={s.blue} /></motion.div>
                : null}
            </div>
            <span style={{ color: step.done ? s.muted : step.active ? s.blue : s.faint, fontSize: "0.62rem", fontWeight: step.active ? 600 : 400 }}>{step.label}</span>
            {step.active && <span style={{ marginLeft: "auto", color: s.blue, fontSize: "0.54rem", fontFamily: "monospace" }}>İşlemde…</span>}
          </motion.div>
        ))}
      </div>
    </div>
  ),
  // 3 — Teslim edildi
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", height: "100%", gap: 11 }}>
      <SuccessBadge title="Araç Teslim Edildi" value="₺2.850" sub="34 MRT 2025 — Mert Alban" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} style={{ background: s.card, border: `1px solid ${s.border}`, borderRadius: 9, padding: "9px 14px", width: "100%" }}>
        {[
          ["Yağ & Filtre", "₺850"],
          ["İşçilik", "₺1.600"],
          ["Diğer Parçalar", "₺400"],
          ["TOPLAM", "₺2.850"],
        ].map(([k, v], i) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "3.5px 0", borderBottom: i < 3 ? `1px solid ${s.border}` : "none" }}>
            <span style={{ color: i === 3 ? s.ink : s.muted, fontSize: "0.61rem", fontWeight: i === 3 ? 700 : 400 }}>{k}</span>
            <span style={{ color: i === 3 ? s.accent : s.ink, fontSize: "0.63rem", fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </motion.div>
    </div>
  ),
];

// ── CARPASS ────────────────────────────────────────────────────────────
const carpassScreens = [
  // 0 — Sorgulama giriş
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, height: "100%", justifyContent: "center", gap: 12 }}>
      <div style={{ textAlign: "center" as const, marginBottom: 8 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 8, padding: "5px 12px", marginBottom: 10 }}>
          <Shield size={13} color={s.accent} />
          <span style={{ color: s.accent, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em" }}>CARPASS</span>
        </div>
        <p style={{ color: s.ink, fontSize: "0.78rem", fontWeight: 700, margin: "0 0 3px" }}>Araç Güven Raporu</p>
        <p style={{ color: s.muted, fontSize: "0.6rem" }}>Plakayı girin, saniyeler içinde sonuç alın</p>
      </div>
      <div>
        <FormField label="Araç Plakası" value="34 CAR 001" typing active />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
          <FormField label="Şase No (opsiyonel)" value="" />
          <FormField label="Model Yılı" value="2021" />
        </div>
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.0 }}
        style={{ background: s.accent, borderRadius: 9, padding: "10px", textAlign: "center" as const }}>
        <span style={{ color: "#000", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.03em" }}>Sorgula  →</span>
      </motion.div>
    </div>
  ),
  // 1 — Analiz yükleniyor
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, height: "100%", justifyContent: "center", gap: 12 }}>
      <div style={{ textAlign: "center" as const, marginBottom: 4 }}>
        <motion.div
          animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          style={{ display: "inline-block", marginBottom: 8 }}
        >
          <Search size={28} color={s.accent} />
        </motion.div>
        <p style={{ color: s.ink, fontSize: "0.72rem", fontWeight: 700, margin: "0 0 2px" }}>Analiz Ediliyor</p>
        <p style={{ color: s.muted, fontSize: "0.6rem" }}>34 CAR 001 — veritabanları taranıyor…</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
        <AnalysisRow label="Hasar Kayıt Geçmişi" status="ok" delay={0.1} />
        <AnalysisRow label="Kilometre Tutarsızlığı" status="ok" delay={0.4} />
        <AnalysisRow label="Sigorta ve Tescil Geçmişi" status="check" delay={0.7} />
        <AnalysisRow label="Airbag & Flood Kaydı" status="ok" delay={1.0} />
        <AnalysisRow label="İpotek / Haciz Durumu" status="ok" delay={1.3} />
      </div>
    </div>
  ),
  // 2 — Risk detayları
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, height: "100%" }}>
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <p style={{ color: s.ink, fontSize: "0.72rem", fontWeight: 700 }}>Risk Raporu</p>
          <span style={{ color: s.faint, fontSize: "0.56rem", fontFamily: "monospace" }}>34 CAR 001 · 2021</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 5 }}>
        {[
          { label: "Hasar Kaydı", val: "0 Kayıt", ok: true },
          { label: "Orijinal Km", val: "42.750 km", ok: true },
          { label: "Tescil Sahipleri", val: "2 Sahip", ok: true },
          { label: "Flood / Airbag", val: "Kayıt Yok", ok: true },
          { label: "İpotek/Haciz", val: "Temiz", ok: true },
          { label: "Teknik Muayene", val: "Geçerli (2026)", ok: true },
        ].map((row, i) => (
          <motion.div key={row.label} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 9px", background: row.ok ? "rgba(16,185,129,0.05)" : "rgba(245,158,11,0.05)", border: `1px solid ${row.ok ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.2)"}`, borderRadius: 7 }}>
            <CheckCircle2 size={11} color={row.ok ? s.accent : s.amber} />
            <span style={{ color: s.muted, fontSize: "0.61rem", flex: 1 }}>{row.label}</span>
            <span style={{ color: row.ok ? s.ink : s.amber, fontSize: "0.63rem", fontWeight: 600 }}>{row.val}</span>
          </motion.div>
        ))}
      </div>
    </div>
  ),
  // 3 — Trust score
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", height: "100%", gap: 10 }}>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 160, damping: 16 }}
        style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
          width: 90, height: 90, borderRadius: "50%",
          background: "conic-gradient(#10b981 0% 96%, rgba(255,255,255,0.05) 96% 100%)",
          boxShadow: "0 0 40px rgba(16,185,129,0.3)" }}>
        <div style={{ position: "absolute", inset: 6, borderRadius: "50%", background: s.bg, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: s.accent, fontSize: "1.35rem", fontWeight: 800, lineHeight: 1 }}>96</span>
          <span style={{ color: s.faint, fontSize: "0.5rem", letterSpacing: "0.1em" }}>/ 100</span>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ textAlign: "center" as const }}>
        <p style={{ color: s.accent, fontSize: "0.65rem", fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Güvenilir Araç</p>
        <p style={{ color: s.muted, fontSize: "0.6rem", margin: "3px 0" }}>34 CAR 001 · 6 kontrol tamamlandı</p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ display: "flex", gap: 7, width: "100%" }}>
        {[{ label: "Hasar", val: "0" }, { label: "Sahip", val: "2" }, { label: "Km", val: "42.7K" }].map(stat => (
          <div key={stat.label} style={{ flex: 1, background: s.card, border: `1px solid ${s.border}`, borderRadius: 8, padding: "7px 10px", textAlign: "center" as const }}>
            <p style={{ color: s.ink, fontSize: "0.8rem", fontWeight: 700, margin: 0 }}>{stat.val}</p>
            <p style={{ color: s.faint, fontSize: "0.54rem", margin: "1px 0 0" }}>{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  ),
];

// ── Business Dashboard ─────────────────────────────────────────────────
const dashScreens = [
  // 0 — MRR analytics
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, height: "100%" }}>
      <SectionTitle label="Gelir Paneli (MRR)" right="Temmuz 2025" />
      <div style={{ display: "flex", gap: 8, marginBottom: 9 }}>
        {[{ label: "MRR", val: "₺42.500", change: "+12%", color: s.accent },
          { label: "ARR", val: "₺510K", change: "+9%", color: s.blue },
          { label: "Aktif Müşteri", val: "184", change: "+7", color: s.amber }].map(card => (
          <div key={card.label} style={{ flex: 1, background: s.card, border: `1px solid ${s.border}`, borderRadius: 9, padding: "9px 10px" }}>
            <p style={{ color: s.faint, fontSize: "0.54rem", fontFamily: "monospace", textTransform: "uppercase" as const, margin: "0 0 4px" }}>{card.label}</p>
            <p style={{ color: s.ink, fontSize: "0.8rem", fontWeight: 700, margin: 0 }}>{card.val}</p>
            <span style={{ color: card.color, fontSize: "0.55rem", fontWeight: 700 }}>{card.change}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, background: s.card, border: `1px solid ${s.border}`, borderRadius: 9, padding: "10px", display: "flex", flexDirection: "column" as const }}>
        <p style={{ color: s.faint, fontSize: "0.54rem", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 8 }}>Aylık Gelir Trendi</p>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 4 }}>
          {[28, 35, 31, 42, 38, 48, 52, 58, 55, 62, 70, 80].map((h, i) => (
            <motion.div key={i} initial={{ height: "8%" }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.06, duration: 0.6, ease: "easeOut" }}
              style={{ flex: 1, background: i === 11 ? s.accent : `${s.accent}40`, borderRadius: "3px 3px 0 0", minHeight: 4 }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          {["Ağu", "", "", "Kas", "", "", "Şub", "", "", "May", "", "Tem"].map((m, i) => (
            <span key={i} style={{ color: s.faint, fontSize: "0.48rem", textAlign: "center" as const, flex: 1 }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  ),
  // 1 — Kullanıcı yönetimi
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, height: "100%" }}>
      <SectionTitle label="Kullanıcılar" right="184 aktif" />
      <div style={{ display: "flex", gap: 6, marginBottom: 9 }}>
        <div style={{ flex: 1, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 6, padding: "5px 9px", fontSize: "0.62rem", color: s.faint }}>Ara…</div>
        <div style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.28)", borderRadius: 6, padding: "5px 10px" }}>
          <span style={{ color: s.accent, fontSize: "0.62rem", fontWeight: 700 }}>+ Davet Et</span>
        </div>
      </div>
      <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "5px 10px", borderBottom: `1px solid ${s.border}`, background: "rgba(255,255,255,0.03)" }}>
          {["Ad", "Plan", "Durum"].map(h => (
            <span key={h} style={{ color: s.faint, fontSize: "0.53rem", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "0.07em" }}>{h}</span>
          ))}
        </div>
        {[
          { name: "Ahmet Y.", plan: "Pro", status: "Aktif", sc: s.accent },
          { name: "Zeynep K.", plan: "Kurumsal", status: "Aktif", sc: s.accent },
          { name: "Can B.", plan: "Starter", status: "Deneme", sc: s.amber },
          { name: "Elif Ş.", plan: "Pro", status: "Aktif", sc: s.accent },
        ].map((u, i) => (
          <div key={u.name} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "6px 10px", borderBottom: i < 3 ? `1px solid ${s.border}` : "none", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: `${s.accent}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: s.accent, fontSize: "0.5rem", fontWeight: 700 }}>{u.name[0]}</span>
              </div>
              <span style={{ color: s.ink, fontSize: "0.62rem" }}>{u.name}</span>
            </div>
            <span style={{ color: s.muted, fontSize: "0.6rem" }}>{u.plan}</span>
            <span style={{ color: u.sc, fontSize: "0.58rem", fontWeight: 600 }}>{u.status}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  // 2 — Rapor oluştur
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 13 }}>
        <div style={{ background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.28)", borderRadius: 6, padding: "3px 9px" }}>
          <span style={{ color: s.blue, fontSize: "0.58rem", fontWeight: 700, fontFamily: "monospace" }}>RAPOR OLUŞTUR</span>
        </div>
      </div>
      <FormField label="Rapor Türü" value="Gelir & Abonelik Özeti" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <FormField label="Başlangıç" value="01.01.2025" />
        <FormField label="Bitiş" value="31.07.2025" />
      </div>
      <FormField label="Format" value="PDF + Excel (.xlsx)" />
      <div style={{ marginBottom: 8 }}>
        <p style={{ color: s.faint, fontSize: "0.55rem", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "0.09em", marginBottom: 5 }}>Dahil Et</p>
        {["MRR Grafiği", "Müşteri Segmentleri", "Churn Analizi"].map((opt, i) => (
          <div key={opt} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: s.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={7} color="#000" strokeWidth={3} />
            </div>
            <span style={{ color: s.muted, fontSize: "0.61rem" }}>{opt}</span>
          </div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}
        style={{ marginTop: "auto", background: s.blue, borderRadius: 8, padding: "8px", textAlign: "center" as const }}>
        <span style={{ color: "#000", fontSize: "0.7rem", fontWeight: 700 }}>Rapor Oluştur  →</span>
      </motion.div>
    </div>
  ),
  // 3 — Export başarılı
  () => (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", height: "100%", gap: 11 }}>
      <SuccessBadge title="Rapor Hazırlandı" value="Q1–Q3 2025" sub="3 dosya · PDF + Excel · 7 aylık veri" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: "flex", flexDirection: "column" as const, gap: 7, width: "100%" }}>
        {[
          { name: "gelir-raporu-2025.pdf", size: "2.4 MB", icon: FileText, color: s.accent },
          { name: "abonelik-analizi.xlsx", size: "1.1 MB", icon: BarChart3, color: s.blue },
        ].map(f => (
          <motion.div key={f.name} whileHover={{ scale: 1.01 }}
            style={{ background: s.card, border: `1px solid ${s.border}`, borderRadius: 9, padding: "9px 12px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{ background: `${f.color}15`, borderRadius: 7, padding: 7 }}>
              <f.icon size={14} color={f.color} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: s.ink, fontSize: "0.63rem", fontWeight: 600, margin: 0 }}>{f.name}</p>
              <p style={{ color: s.faint, fontSize: "0.55rem", margin: "1px 0 0" }}>{f.size}</p>
            </div>
            <Download size={13} color={s.accent} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  ),
];

// ── Screen config per project ──────────────────────────────────────────
const config: Record<ProjectType, { screens: Array<() => React.ReactNode>; title: string; accent: string }> = {
  stockapp:           { screens: stockScreens,  title: "StockApp — Stok & Cari Takip",   accent: s.accent },
  "auto-service":     { screens: autoScreens,   title: "Hezer Auto — Servis Yönetimi",    accent: s.blue },
  carpass:            { screens: carpassScreens, title: "CARPASS — Araç Güven Raporu",    accent: s.accent },
  "business-dashboard": { screens: dashScreens, title: "SaaS Dashboard — Operasyon",     accent: s.blue },
};

// ── Screen transition variants ─────────────────────────────────────────
const flipVariants = {
  enter:  { rotateY: 55, opacity: 0, scale: 0.9, filter: "blur(4px)" },
  center: { rotateY: 0,  opacity: 1, scale: 1,   filter: "blur(0px)", transition: { duration: 0.55, ease: "easeOut" as const } },
  exit:   { rotateY: -55, opacity: 0, scale: 0.9, filter: "blur(4px)", transition: { duration: 0.4, ease: "easeIn" as const } },
};

// ── Main component ─────────────────────────────────────────────────────
export default function ProjectDemoVideo({
  type,
  hideChrome = false,
}: {
  type: ProjectType;
  hideChrome?: boolean;
}) {
  const { screens, title, accent } = config[type] ?? config.stockapp;
  const [idx, setIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = screens.length;
  const DURATION = 4500;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const t = setInterval(() => setIdx(i => (i + 1) % total), DURATION);
    return () => clearInterval(t);
  }, [total, isVisible]);

  return (
    <div ref={containerRef} style={{
      background: "#040c14",
      border: hideChrome ? "none" : `1px solid ${s.border}`,
      borderRadius: hideChrome ? 0 : 16,
      overflow: "hidden",
      width: "100%",
      height: hideChrome ? "100%" : undefined,
      display: hideChrome ? "flex" : undefined,
      flexDirection: hideChrome ? "column" as const : undefined,
    }}>
      {/* Chrome bar — hidden in phone mode */}
      {!hideChrome && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", borderBottom: `1px solid ${s.border}`, background: "rgba(255,255,255,0.02)" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#ff5f57", "#febc2e", "#28c840"].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.85 }} />
            ))}
          </div>
          <span style={{ color: s.faint, fontSize: "0.6rem", fontFamily: "monospace", letterSpacing: "0.04em" }}>{title}</span>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444" }} />
            <span style={{ color: "#ef4444", fontSize: "0.55rem", fontFamily: "monospace", fontWeight: 700 }}>DEMO</span>
          </motion.div>
        </div>
      )}

      {/* Screen area */}
      <div style={{
        position: "relative",
        height: hideChrome ? undefined : 240,
        flex: hideChrome ? 1 : undefined,
        perspective: 1200,
        overflow: "hidden",
        background: "#060f1a",
      }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={idx}
            variants={flipVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ position: "absolute", inset: 0 }}
          >
            {screens[idx]()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer: dots + progress bar — hidden in phone mode */}
      {!hideChrome && (
        <div style={{ padding: "8px 14px", borderTop: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.01)" }}>
          <div style={{ display: "flex", gap: 5 }}>
            {screens.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <motion.div animate={{ width: i === idx ? 18 : 6, background: i === idx ? accent : s.border }}
                  style={{ height: 6, borderRadius: 4 }} transition={{ duration: 0.3 }} />
              </button>
            ))}
          </div>
          <div style={{ flex: 1, margin: "0 12px", height: 2, background: s.border, borderRadius: 2, overflow: "hidden" }}>
            <motion.div
              key={idx}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: DURATION / 1000 - 0.5, ease: "linear" }}
              style={{ height: "100%", background: accent, transformOrigin: "left", borderRadius: 2 }}
            />
          </div>
          <span style={{ color: s.faint, fontSize: "0.55rem", fontFamily: "monospace" }}>{idx + 1}/{total}</span>
        </div>
      )}
    </div>
  );
}
