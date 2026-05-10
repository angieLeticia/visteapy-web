"use client";

import { useState, useRef, useCallback, ChangeEvent, DragEvent } from "react";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface CatalogItem {
  id: number;
  name: string;
  category: string;
  colors: string[];
  price: string;
  image: string;
}

interface TryOnResult {
  description: string;
  favoredParts: string[];
  accessories: string;
  shoes: string;
  complementaryColors: string;
  verdict: string;
  stars: number;
}

interface RecItem {
  productId: number;
  compatibility: number;
  reason: string;
  highlight: string;
}

interface RecsResult {
  analysis: { skinTone: string; bodyType: string; style: string };
  recommendations: RecItem[];
}

// ─── Catalog ───────────────────────────────────────────────────────────────────
const catalog: CatalogItem[] = [
  { id: 1, name: "Vestido Lino Mediterráneo", category: "Vestidos", colors: ["blanco", "beige", "terracota"], price: "$89.900", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400" },
  { id: 2, name: "Blusa Seda Nocturna", category: "Blusas", colors: ["negro", "vino", "azul marino"], price: "$54.900", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400" },
  { id: 3, name: "Jean Boyfriend Clásico", category: "Pantalones", colors: ["azul medio", "negro", "gris"], price: "$79.900", image: "https://images.unsplash.com/photo-1617178388553-a9d022974a5c?w=400" },
  { id: 4, name: "Chaqueta Oversize Camel", category: "Outerwear", colors: ["camel", "crema", "beige oscuro"], price: "$134.900", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" },
  { id: 5, name: "Falda Midi Floral", category: "Faldas", colors: ["verde salvia", "rosa palo", "mostaza"], price: "$64.900", image: "https://images.unsplash.com/photo-1583496661160-fb5218d0e1d1?w=400" },
  { id: 6, name: "Conjunto Lino Verano", category: "Conjuntos", colors: ["blanco roto", "celeste", "coral"], price: "$109.900", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400" },
];

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  bg: "#FAFAF8",
  charcoal: "#1C1C1A",
  warm: "#C4A882",
  warmLight: "#EDE3D4",
  nude: "#F5EDE0",
  white: "#FFFFFF",
  muted: "#9E9690",
  dark: "#4A4744",
  border: "#E8E0D6",
};

const F = {
  playfair: "var(--font-playfair)",
  inter: "var(--font-inter)",
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
function fileToBase64(file: File): Promise<{ base64: string; mediaType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const [header, base64] = result.split(",");
      const mediaType = header.match(/:(.*?);/)?.[1] ?? "image/jpeg";
      resolve({ base64, mediaType });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function compressImage(dataUrl: string, maxPx = 768): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.src = dataUrl;
  });
}

async function callClaude(payload: object): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("Falta NEXT_PUBLIC_ANTHROPIC_API_KEY en tu .env.local.");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } })?.error?.message ?? `Error ${res.status}`);
  }
  const data = (await res.json()) as { content: Array<{ text: string }> };
  return data.content[0].text;
}

function parseJSON<T>(raw: string): T | null {
  try {
    const block = raw.match(/```json\s*([\s\S]*?)\s*```/);
    const obj = raw.match(/(\{[\s\S]*\})/);
    return JSON.parse(block ? block[1] : obj ? obj[1] : raw) as T;
  } catch {
    return null;
  }
}

async function downloadImage(url: string, filename: string) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, "_blank");
  }
}

// ─── Step Indicator ────────────────────────────────────────────────────────────
function StepIndicator({ current, steps }: { current: number; steps: string[] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 48 }}>
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={n} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: done ? C.charcoal : active ? C.warm : "transparent",
                  border: `2px solid ${done || active ? "transparent" : C.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
              >
                {done ? (
                  <span style={{ color: C.white, fontSize: 14 }}>✓</span>
                ) : (
                  <span
                    style={{
                      fontFamily: F.inter,
                      fontSize: 13,
                      fontWeight: 500,
                      color: active ? C.white : C.muted,
                    }}
                  >
                    {n}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontFamily: F.inter,
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: active ? C.charcoal : done ? C.warm : C.muted,
                  whiteSpace: "nowrap",
                  transition: "color 0.3s ease",
                }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  width: 60,
                  height: 1,
                  background: done ? C.warm : C.border,
                  margin: "0 12px",
                  marginBottom: 24,
                  transition: "background 0.3s ease",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Image Uploader ────────────────────────────────────────────────────────────
interface UploaderProps {
  preview: string | null;
  onFile: (preview: string, file: File) => void;
  placeholder: string;
  minHeight?: number;
}

function ImageUploader({ preview, onFile, placeholder, minHeight = 240 }: UploaderProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => onFile(e.target?.result as string, file);
      reader.readAsDataURL(file);
    },
    [onFile]
  );

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  if (preview) {
    return (
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: `2px solid ${C.warm}` }}>
        <img src={preview} alt="preview" style={{ width: "100%", maxHeight: 320, objectFit: "contain", display: "block", background: C.nude }} />
        <button
          onClick={() => inputRef.current?.click()}
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            background: "rgba(28,28,26,0.75)",
            color: C.white,
            border: "none",
            borderRadius: 100,
            padding: "7px 16px",
            fontFamily: F.inter,
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Cambiar
        </button>
        <input ref={inputRef} type="file" accept="image/*" onChange={onChange} style={{ display: "none" }} />
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      style={{
        borderRadius: 14,
        border: `2px dashed ${dragging ? C.warm : C.border}`,
        background: dragging ? C.warmLight : C.nude,
        cursor: "pointer",
        transition: "border-color 0.2s, background 0.2s",
        minHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: C.warmLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
        }}
      >
        📷
      </div>
      <p
        style={{
          fontFamily: F.playfair,
          fontSize: 17,
          fontStyle: "italic",
          color: C.charcoal,
          margin: 0,
          textAlign: "center",
          padding: "0 20px",
          lineHeight: 1.4,
        }}
      >
        {placeholder}
      </p>
      <p style={{ fontFamily: F.inter, fontSize: 11, color: C.muted, margin: 0, letterSpacing: "0.06em" }}>
        Arrastra o haz clic para subir
      </p>
      <input ref={inputRef} type="file" accept="image/*" onChange={onChange} style={{ display: "none" }} />
    </div>
  );
}

// ─── Loading Skeleton ──────────────────────────────────────────────────────────
const LOADING_MSGS = [
  "Estamos vistiendo tu look…",
  "Ajustando la prenda a tu silueta…",
  "Aplicando magia de estilista…",
  "Casi lista tu inspiración…",
  "Un momento, esto vale la pena…",
];

function LoadingSkeleton({ msg }: { msg: string }) {
  return (
    <div style={{ animation: "ai-fadeup 0.4s ease forwards" }}>
      {/* Shimmer slider placeholder */}
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          height: 420,
          background: "linear-gradient(90deg, #EDE3D4 25%, #F5EDE0 50%, #EDE3D4 75%)",
          backgroundSize: "200% 100%",
          animation: "ai-shimmer 1.6s linear infinite",
          marginBottom: 24,
        }}
      />
      {/* Message */}
      <div style={{ textAlign: "center", padding: "8px 0 32px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: C.warmLight,
            borderRadius: 100,
            padding: "12px 24px",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              border: `2px solid ${C.warm}`,
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "ai-spin 0.8s linear infinite",
            }}
          />
          <span style={{ fontFamily: F.inter, fontSize: 13, color: C.dark, letterSpacing: "0.04em" }}>
            {msg}
          </span>
        </div>
      </div>
      {/* Skeleton cards below */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            style={{
              height: 80,
              borderRadius: 12,
              background: "linear-gradient(90deg, #EDE3D4 25%, #F5EDE0 50%, #EDE3D4 75%)",
              backgroundSize: "200% 100%",
              animation: `ai-shimmer ${1.6 + n * 0.2}s linear infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Error State ───────────────────────────────────────────────────────────────
function ErrorState({ msg, onRetry }: { msg: string; onRetry: () => void }) {
  return (
    <div
      style={{
        background: "#FFF5F5",
        border: "1px solid #FFCCCC",
        borderRadius: 16,
        padding: "32px 28px",
        textAlign: "center",
        animation: "ai-fadeup 0.4s ease forwards",
      }}
    >
      <p style={{ fontFamily: F.inter, fontSize: 13, color: "#CC4444", margin: "0 0 20px", lineHeight: 1.6 }}>
        ⚠ {msg}
      </p>
      <button
        onClick={onRetry}
        style={{
          background: C.charcoal,
          color: C.white,
          border: "none",
          borderRadius: 100,
          padding: "12px 32px",
          fontFamily: F.inter,
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Intentar nuevamente
      </button>
    </div>
  );
}

// ─── Stars ─────────────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ fontSize: 17, color: n <= count ? C.warm : C.warmLight, lineHeight: 1 }}>★</span>
      ))}
    </div>
  );
}

// ─── Try-On Result ─────────────────────────────────────────────────────────────
function TryOnResultPanel({
  originalPhoto,
  resultUrl,
  result,
  garment,
  onReset,
}: {
  originalPhoto: string;
  resultUrl: string;
  result: TryOnResult;
  garment: CatalogItem | null;
  onReset: () => void;
}) {
  return (
    <div style={{ animation: "ai-fadeup 0.6s cubic-bezier(0.22,1,0.36,1) forwards" }}>
      {/* ── Before/After Reveal ── */}
      <div style={{ marginBottom: 8 }}>
        <p
          style={{
            fontFamily: F.inter,
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: C.muted,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Desliza para comparar
        </p>
        <BeforeAfterSlider before={originalPhoto} after={resultUrl} containerHeight={520} />
      </div>

      {/* ── Actions ── */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "20px 0 36px",
        }}
      >
        <button
          onClick={() => downloadImage(resultUrl, "visteapy-look.jpg")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: C.charcoal,
            color: C.white,
            border: "none",
            borderRadius: 100,
            padding: "12px 28px",
            fontFamily: F.inter,
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          ↓ Descargar look
        </button>
        <button
          onClick={onReset}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            color: C.dark,
            border: `1.5px solid ${C.border}`,
            borderRadius: 100,
            padding: "12px 28px",
            fontFamily: F.inter,
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          ↺ Probar otra prenda
        </button>
      </div>

      {/* ── Garment CTA Card ── */}
      {garment && (
        <div
          style={{
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          <img
            src={garment.image}
            alt={garment.name}
            style={{ width: 72, height: 72, objectFit: "contain", borderRadius: 10, background: C.nude, flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: 160 }}>
            <p style={{ fontFamily: F.playfair, fontSize: 20, color: C.charcoal, margin: "0 0 4px" }}>
              {garment.name}
            </p>
            <p style={{ fontFamily: F.inter, fontSize: 12, color: C.warm, margin: "0 0 8px", letterSpacing: "0.04em" }}>
              {garment.price} · {garment.category}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {garment.colors.map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily: F.inter,
                    fontSize: 10,
                    background: C.nude,
                    color: C.dark,
                    padding: "3px 10px",
                    borderRadius: 100,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
            <button
              onClick={() => alert(`"${garment.name}" agregado al carrito ✦`)}
              style={{
                background: C.charcoal,
                color: C.white,
                border: "none",
                borderRadius: 100,
                padding: "11px 22px",
                fontFamily: F.inter,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Agregar al carrito
            </button>
            <button
              onClick={() => alert(`Ver prenda: ${garment.name}`)}
              style={{
                background: "transparent",
                color: C.charcoal,
                border: `1.5px solid ${C.charcoal}`,
                borderRadius: 100,
                padding: "11px 22px",
                fontFamily: F.inter,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Ver prenda
            </button>
          </div>
        </div>
      )}

      {/* ── Stylist Analysis ── */}
      <div
        style={{
          background: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: C.charcoal,
            padding: "22px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: F.inter,
                fontSize: 10,
                letterSpacing: "0.28em",
                color: C.warm,
                textTransform: "uppercase",
                margin: "0 0 6px",
              }}
            >
              Análisis de estilista · IA
            </p>
            <p style={{ fontFamily: F.playfair, fontSize: 22, fontWeight: 400, color: C.white, margin: 0 }}>
              {garment?.name ?? "Tu prenda personalizada"}
            </p>
          </div>
          <Stars count={result.stars} />
        </div>

        <div style={{ padding: "24px 28px" }}>
          <p
            style={{
              fontFamily: F.playfair,
              fontSize: 19,
              fontStyle: "italic",
              lineHeight: 1.65,
              color: C.charcoal,
              marginBottom: 24,
            }}
          >
            &ldquo;{result.description}&rdquo;
          </p>

          {/* Favored parts */}
          <div style={{ marginBottom: 24 }}>
            <p
              style={{
                fontFamily: F.inter,
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: C.muted,
                marginBottom: 10,
              }}
            >
              Te favorece en
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {result.favoredParts.map((p, i) => (
                <span
                  key={i}
                  style={{
                    background: C.warmLight,
                    color: C.charcoal,
                    padding: "6px 16px",
                    borderRadius: 100,
                    fontFamily: F.inter,
                    fontSize: 12,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Styling grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {([
              ["Accesorios", result.accessories],
              ["Calzado", result.shoes],
              ["Paleta", result.complementaryColors],
            ] as [string, string][]).map(([label, val]) => (
              <div key={label} style={{ background: C.nude, borderRadius: 12, padding: "14px 16px" }}>
                <p
                  style={{
                    fontFamily: F.inter,
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: C.muted,
                    margin: "0 0 6px",
                  }}
                >
                  {label}
                </p>
                <p style={{ fontFamily: F.inter, fontSize: 13, color: C.dark, margin: 0, lineHeight: 1.5 }}>
                  {val}
                </p>
              </div>
            ))}
          </div>

          {/* Verdict */}
          <div
            style={{
              background: C.charcoal,
              borderRadius: 14,
              padding: "18px 22px",
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
            }}
          >
            <span style={{ color: C.warm, fontSize: 18, flexShrink: 0, marginTop: 2 }}>✦</span>
            <div>
              <p
                style={{
                  fontFamily: F.inter,
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: C.warm,
                  margin: "0 0 6px",
                }}
              >
                Veredicto
              </p>
              <p style={{ fontFamily: F.playfair, fontSize: 18, color: C.white, margin: 0, lineHeight: 1.55 }}>
                {result.verdict}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Honest disclaimer */}
      <p
        style={{
          fontFamily: F.inter,
          fontSize: 11,
          color: C.muted,
          textAlign: "center",
          marginTop: 16,
          lineHeight: 1.5,
        }}
      >
        Esto es una visualización de inspiración — los resultados reales pueden variar según la prenda y el cuerpo.
      </p>
    </div>
  );
}

// ─── Recommendation Card ───────────────────────────────────────────────────────
function RecCard({ rec, item, rank }: { rec: RecItem; item: CatalogItem; rank: number }) {
  return (
    <div
      style={{
        background: C.white,
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid ${C.border}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        animation: `ai-fadeup ${0.4 + rank * 0.12}s cubic-bezier(0.22,1,0.36,1) forwards`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "rgba(28,28,26,0.8)",
            color: C.warm,
            fontFamily: F.inter,
            fontSize: 10,
            letterSpacing: "0.12em",
            padding: "5px 12px",
            borderRadius: 100,
          }}
        >
          #{rank} para ti
        </div>
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: C.warm,
            color: C.white,
            fontFamily: F.inter,
            fontSize: 13,
            fontWeight: 600,
            padding: "5px 12px",
            borderRadius: 100,
          }}
        >
          {rec.compatibility}%
        </div>
      </div>

      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
        <p style={{ fontFamily: F.playfair, fontSize: 21, color: C.charcoal, margin: "0 0 4px", lineHeight: 1.2 }}>
          {item.name}
        </p>
        <p style={{ fontFamily: F.inter, fontSize: 12, color: C.warm, margin: "0 0 14px", letterSpacing: "0.04em" }}>
          {item.price} · {item.category}
        </p>

        <div
          style={{
            display: "inline-block",
            background: C.warmLight,
            borderRadius: 8,
            padding: "6px 12px",
            marginBottom: 12,
          }}
        >
          <span style={{ fontFamily: F.inter, fontSize: 11, color: C.charcoal }}>✦ {rec.highlight}</span>
        </div>

        <p style={{ fontFamily: F.inter, fontSize: 13, color: C.dark, lineHeight: 1.65, marginBottom: 16, flex: 1 }}>
          {rec.reason}
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {item.colors.map((c) => (
            <span
              key={c}
              style={{
                fontFamily: F.inter,
                fontSize: 10,
                background: C.nude,
                color: C.charcoal,
                padding: "4px 10px",
                borderRadius: 100,
              }}
            >
              {c}
            </span>
          ))}
        </div>

        <button
          onClick={() => alert(`"${item.name}" agregado al carrito ✦`)}
          style={{
            width: "100%",
            background: C.charcoal,
            color: C.white,
            border: "none",
            padding: "13px 0",
            borderRadius: 100,
            fontFamily: F.inter,
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AIFashionExperience() {
  const [tab, setTab] = useState<"tryon" | "recs">("tryon");

  // Try-On state
  const [tryPhoto, setTryPhoto] = useState<string | null>(null);
  const [tryFile, setTryFile] = useState<File | null>(null);
  const [garmentId, setGarmentId] = useState<number | null>(null);
  const [customGarmImg, setCustomGarmImg] = useState<string | null>(null);
  const [customGarmCategory, setCustomGarmCategory] = useState<string>("Blusas");
  const [garmentMode, setGarmentMode] = useState<"catalog" | "custom">("catalog");
  const [tryResult, setTryResult] = useState<TryOnResult | null>(null);
  const [tryonImage, setTryonImage] = useState<string | null>(null);
  const [tryLoadingMsg, setTryLoadingMsg] = useState(LOADING_MSGS[0]);
  const [tryLoading, setTryLoading] = useState(false);
  const [tryError, setTryError] = useState<string | null>(null);

  // Recs state
  const [recPhoto, setRecPhoto] = useState<string | null>(null);
  const [recFile, setRecFile] = useState<File | null>(null);
  const [recsResult, setRecsResult] = useState<RecsResult | null>(null);
  const [recsLoading, setRecsLoading] = useState(false);
  const [recsError, setRecsError] = useState<string | null>(null);

  const msgTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startMsgRotation = () => {
    let i = 0;
    msgTimerRef.current = setInterval(() => {
      i = (i + 1) % LOADING_MSGS.length;
      setTryLoadingMsg(LOADING_MSGS[i]);
    }, 4000);
  };

  const stopMsgRotation = () => {
    if (msgTimerRef.current) clearInterval(msgTimerRef.current);
  };

  // ─── Try-On handler ────────────────────────────────────────────────────────
  async function handleTryOn() {
    if (!tryFile || !tryPhoto) return;
    if (garmentMode === "catalog" && !garmentId) return;
    if (garmentMode === "custom" && !customGarmImg) return;

    setTryLoading(true);
    setTryError(null);
    setTryResult(null);
    setTryonImage(null);
    setTryLoadingMsg(LOADING_MSGS[0]);
    startMsgRotation();

    try {
      const { base64, mediaType } = await fileToBase64(tryFile);
      const garment = garmentMode === "catalog" ? catalog.find((c) => c.id === garmentId)! : null;
      const garmImg =
        garmentMode === "catalog"
          ? garment!.image.replace("?w=400", "?w=800")
          : customGarmImg!;
      const garmentCategory = garmentMode === "catalog" ? garment!.category : customGarmCategory;
      const garmentDes =
        garmentMode === "catalog"
          ? `${garment!.name} — ${garment!.category}`
          : `Prenda personalizada — ${customGarmCategory}`;

      const compressedPhoto = await compressImage(tryPhoto, 768);

      const startRes = await fetch("/api/tryon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ humanImg: compressedPhoto, garmImg, garmentDes, garmentCategory }),
      });
      const startData = (await startRes.json()) as { predictionId?: string; error?: string };
      if (!startRes.ok || !startData.predictionId) {
        throw new Error(startData.error ?? "Error al iniciar la generación.");
      }

      const predictionId = startData.predictionId;
      let imageUrl: string | null = null;

      for (let i = 0; i < 80; i++) {
        await new Promise((r) => setTimeout(r, 4000));
        const pollRes = await fetch(`/api/tryon?id=${predictionId}`);
        const pollData = (await pollRes.json()) as { status: string; imageUrl?: string; error?: string };
        if (pollData.status === "succeeded" && pollData.imageUrl) {
          imageUrl = pollData.imageUrl;
          break;
        }
        if (pollData.status === "failed") {
          throw new Error(pollData.error ?? "La generación de imagen falló.");
        }
        if (i >= 14) throw new Error("El tiempo de espera se agotó (60 seg). Intenta nuevamente.");
      }
      if (!imageUrl) throw new Error("Tiempo de espera agotado. Intenta nuevamente.");
      setTryonImage(imageUrl);

      // Claude styling analysis
      setTryLoadingMsg("La estilista IA está analizando tu look…");
      const raw = await callClaude({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: `Eres una estilista personal de moda de lujo con 20 años de experiencia en colorimetría y morfología corporal. Analiza las dos imágenes: la primera es la foto de la persona, la segunda es la prenda. Responde ÚNICAMENTE con un objeto JSON válido y sin texto adicional, siguiendo esta estructura exacta:
{
  "description": "descripción visual cálida y detallada (2-3 oraciones) de cómo se ve la prenda en esta persona específica",
  "favoredParts": ["parte del cuerpo que favorece 1", "parte 2", "parte 3"],
  "accessories": "sugerencia concreta de accesorios",
  "shoes": "sugerencia concreta de calzado",
  "complementaryColors": "colores que completan el look",
  "verdict": "veredicto final inspirador en 1-2 oraciones",
  "stars": número entero del 1 al 5
}`,
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
              garment
                ? { type: "image" as const, source: { type: "url" as const, url: garment.image.replace("?w=400", "?w=600") } }
                : { type: "image" as const, source: { type: "base64" as const, media_type: (customGarmImg!.match(/:(.*?);/)?.[1] ?? "image/png") as "image/jpeg" | "image/png" | "image/gif" | "image/webp", data: customGarmImg!.split(",")[1] } },
              {
                type: "text",
                text: garment
                  ? `Analiza cómo se vería "${garment.name}" (${garment.category}, disponible en: ${garment.colors.join(", ")}) en esta persona. Sé cálida, visual y específica como una estilista de lujo.`
                  : `Analiza cómo se vería esta prenda personalizada de tipo ${customGarmCategory} en esta persona. Sé cálida, visual y específica como una estilista de lujo.`,
              },
            ],
          },
        ],
      });
      const parsed = parseJSON<TryOnResult>(raw);
      if (!parsed) throw new Error("La IA devolvió una respuesta inválida. Intenta nuevamente.");
      setTryResult(parsed);
    } catch (e) {
      setTryError(e instanceof Error ? e.message : "Ocurrió un error inesperado.");
    } finally {
      stopMsgRotation();
      setTryLoading(false);
    }
  }

  // ─── Recs handler ──────────────────────────────────────────────────────────
  async function handleRecs() {
    if (!recFile) return;
    setRecsLoading(true);
    setRecsError(null);
    setRecsResult(null);
    try {
      const { base64, mediaType } = await fileToBase64(recFile);
      const catalogStr = catalog
        .map((i) => `ID:${i.id} | "${i.name}" | ${i.category} | Colores: ${i.colors.join(", ")} | ${i.price}`)
        .join("\n");
      const raw = await callClaude({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: `Eres una estilista personal experta en colorimetría y morfología corporal. Analiza la foto de la persona y selecciona las 3 prendas del catálogo que mejor le favorezcan. Responde ÚNICAMENTE con un objeto JSON válido y sin texto adicional:
{
  "analysis": {
    "skinTone": "descripción del tono de piel y su paleta favorecida",
    "bodyType": "silueta percibida en 3-5 palabras",
    "style": "estilo general percibido en 3-5 palabras"
  },
  "recommendations": [
    {
      "productId": número (del catálogo),
      "compatibility": número del 72 al 97,
      "reason": "razón personalizada de 2-3 oraciones mencionando piel, silueta o cabello específicamente",
      "highlight": "beneficio más destacado en máximo 7 palabras"
    }
  ]
}

Catálogo disponible:
${catalogStr}`,
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
              { type: "text", text: "Analiza mi foto y recomiéndame las 3 prendas del catálogo que más me favorezcan con un análisis personalizado y detallado." },
            ],
          },
        ],
      });
      const parsed = parseJSON<RecsResult>(raw);
      if (!parsed) throw new Error("La IA devolvió una respuesta inválida. Intenta nuevamente.");
      setRecsResult(parsed);
    } catch (e) {
      setRecsError(e instanceof Error ? e.message : "Ocurrió un error inesperado.");
    } finally {
      setRecsLoading(false);
    }
  }

  const selectedGarment = catalog.find((c) => c.id === garmentId) ?? null;
  const canTryOn = !!tryPhoto && (garmentMode === "catalog" ? !!garmentId : !!customGarmImg);
  const canRecs = !!recPhoto;

  // Derive current step for stepper
  const currentStep = !tryPhoto ? 1 : !canTryOn ? 2 : 3;
  const showResult = !tryLoading && !tryError && !!tryonImage && !!tryResult;

  function resetTryon() {
    stopMsgRotation();
    setTryLoading(false);
    setTryResult(null);
    setTryonImage(null);
    setTryError(null);
    setGarmentId(null);
    setCustomGarmImg(null);
    setGarmentMode("catalog");
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <section style={{ background: C.bg, fontFamily: F.inter }}>
      <style>{`
        @keyframes ai-spin { to { transform: rotate(360deg); } }
        @keyframes ai-fadeup {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ai-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .ai-garment-card { transition: transform 0.22s ease, box-shadow 0.22s ease; cursor: pointer; }
        .ai-garment-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(196,168,130,0.22) !important; }
        .ai-cta { transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s; }
        .ai-cta:hover:not(:disabled) { opacity: 0.88; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(28,28,26,0.16); }
        .ai-tab-btn { transition: background 0.22s, color 0.22s; }
        @media (max-width: 640px) {
          .ai-catalog-grid { display: flex !important; flex-wrap: nowrap !important; overflow-x: auto; gap: 12px !important; padding-bottom: 8px; scroll-snap-type: x mandatory; }
          .ai-catalog-grid > * { min-width: 140px; scroll-snap-align: start; }
        }
      `}</style>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px 96px" }}>

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p
            style={{
              fontFamily: F.inter,
              fontSize: 10,
              letterSpacing: "0.35em",
              color: C.warm,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Probador Virtual · IA
          </p>
          <h2
            style={{
              fontFamily: F.playfair,
              fontSize: "clamp(36px, 5vw, 62px)",
              fontWeight: 400,
              color: C.charcoal,
              lineHeight: 1.1,
              margin: "0 0 16px",
            }}
          >
            Visualiza tu estilo
            <br />
            <em style={{ fontStyle: "italic", color: C.warm }}>antes de comprar</em>
          </h2>
          <p
            style={{
              fontFamily: F.inter,
              fontSize: 15,
              color: C.muted,
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Una inspiración visual impulsada por IA — no es una promesa de cómo te verás,
            es una herramienta para descubrir tu estilo.
          </p>
        </div>

        {/* ── Tabs ───────────────────────────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <div
            style={{
              display: "flex",
              gap: 4,
              background: C.nude,
              borderRadius: 100,
              padding: 5,
              maxWidth: 480,
              width: "100%",
            }}
          >
            {(["tryon", "recs"] as const).map((t) => (
              <button
                key={t}
                className="ai-tab-btn"
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: "12px 18px",
                  borderRadius: 100,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: F.inter,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  background: tab === t ? C.charcoal : "transparent",
                  color: tab === t ? C.white : C.muted,
                }}
              >
                {t === "tryon" ? "✦  Probador Virtual" : "◆  Mis Recomendaciones"}
              </button>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* TAB: PROBADOR VIRTUAL                                              */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {tab === "tryon" && (
          <div>
            {!showResult && (
              <StepIndicator
                current={currentStep}
                steps={["Tu foto", "Elige prenda", "Visualiza"]}
              />
            )}

            {/* ── If we have a result, show the reveal ─── */}
            {showResult ? (
              <TryOnResultPanel
                originalPhoto={tryPhoto!}
                resultUrl={tryonImage!}
                result={tryResult!}
                garment={selectedGarment}
                onReset={resetTryon}
              />
            ) : (
              <>
                {/* ── Step 1: Photo upload ─── */}
                <div
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: 18,
                    padding: "28px 28px 24px",
                    marginBottom: 20,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: tryPhoto ? C.charcoal : C.warm,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ color: C.white, fontSize: 12, fontWeight: 600 }}>
                        {tryPhoto ? "✓" : "1"}
                      </span>
                    </div>
                    <p style={{ fontFamily: F.inter, fontSize: 13, fontWeight: 500, color: C.charcoal, margin: 0, letterSpacing: "0.04em" }}>
                      Sube tu foto
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: tryPhoto ? "1fr" : "1fr 1fr", gap: 20, alignItems: "start" }}>
                    <ImageUploader
                      preview={tryPhoto}
                      onFile={(url, file) => { resetTryon(); setTryPhoto(url); setTryFile(file); }}
                      placeholder="Foto tuya de cuerpo entero"
                      minHeight={220}
                    />
                    {!tryPhoto && (
                      <div
                        style={{
                          background: C.warmLight,
                          borderRadius: 12,
                          padding: "18px 20px",
                          alignSelf: "center",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: F.inter,
                            fontSize: 11,
                            fontWeight: 600,
                            color: C.charcoal,
                            margin: "0 0 10px",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          Para mejor resultado
                        </p>
                        {[
                          "Fondo blanco o pared lisa",
                          "Cuerpo completo, de frente",
                          "Brazos ligeramente separados",
                          "Buena iluminación, sin sombras",
                        ].map((tip) => (
                          <p
                            key={tip}
                            style={{ fontFamily: F.inter, fontSize: 12, color: C.dark, margin: "0 0 6px", lineHeight: 1.5 }}
                          >
                            ✓ {tip}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Step 2: Garment selection ─── */}
                <div
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: 18,
                    padding: "28px 28px 24px",
                    marginBottom: 20,
                    opacity: tryPhoto ? 1 : 0.45,
                    transition: "opacity 0.3s ease",
                    pointerEvents: tryPhoto ? "auto" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: canTryOn ? C.charcoal : tryPhoto ? C.warm : C.border,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ color: C.white, fontSize: 12, fontWeight: 600 }}>
                        {canTryOn ? "✓" : "2"}
                      </span>
                    </div>
                    <p style={{ fontFamily: F.inter, fontSize: 13, fontWeight: 500, color: C.charcoal, margin: 0, letterSpacing: "0.04em" }}>
                      Elige la prenda a visualizar
                    </p>
                  </div>

                  {/* Mode toggle */}
                  <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                    {(["catalog", "custom"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => { setGarmentMode(mode); setTryResult(null); }}
                        style={{
                          flex: 1,
                          maxWidth: 160,
                          padding: "9px 0",
                          borderRadius: 100,
                          border: `1.5px solid ${garmentMode === mode ? C.charcoal : C.border}`,
                          background: garmentMode === mode ? C.charcoal : "transparent",
                          color: garmentMode === mode ? C.white : C.muted,
                          fontFamily: F.inter,
                          fontSize: 10,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                        }}
                      >
                        {mode === "catalog" ? "Del catálogo" : "Mi prenda"}
                      </button>
                    ))}
                  </div>

                  {garmentMode === "catalog" ? (
                    <div className="ai-catalog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(145px, 1fr))", gap: 14 }}>
                      {catalog.map((item) => {
                        const sel = garmentId === item.id;
                        return (
                          <div
                            key={item.id}
                            className="ai-garment-card"
                            onClick={() => { setGarmentId(item.id); setTryResult(null); setTryonImage(null); }}
                            style={{
                              borderRadius: 12,
                              overflow: "hidden",
                              border: `2px solid ${sel ? C.warm : C.border}`,
                              background: C.bg,
                              boxShadow: sel ? `0 0 0 3px ${C.warmLight}` : "none",
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }}
                            />
                            <div style={{ padding: "10px 12px 12px" }}>
                              <p style={{ fontFamily: F.playfair, fontSize: 13, color: C.charcoal, margin: "0 0 3px", lineHeight: 1.3 }}>
                                {item.name}
                              </p>
                              <p style={{ fontFamily: F.inter, fontSize: 10, color: C.warm, margin: 0 }}>
                                {item.price}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
                      <div>
                        <ImageUploader
                          preview={customGarmImg}
                          onFile={(url) => { setCustomGarmImg(url); setTryResult(null); setTryonImage(null); }}
                          placeholder="Foto de tu prenda"
                          minHeight={200}
                        />
                        {!customGarmImg && (
                          <div style={{ marginTop: 10, background: C.warmLight, borderRadius: 10, padding: "12px 14px" }}>
                            {["Fondo blanco limpio", "Solo la prenda, sin persona", "Flat-lay o ghost mannequin"].map((tip) => (
                              <p key={tip} style={{ fontFamily: F.inter, fontSize: 11, color: C.dark, margin: "0 0 4px" }}>✓ {tip}</p>
                            ))}
                          </div>
                        )}
                      </div>
                      <div>
                        <p style={{ fontFamily: F.inter, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted, marginBottom: 10 }}>
                          Tipo de prenda
                        </p>
                        <select
                          value={customGarmCategory}
                          onChange={(e) => setCustomGarmCategory(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "11px 14px",
                            borderRadius: 10,
                            border: `1.5px solid ${C.border}`,
                            background: C.bg,
                            fontFamily: F.inter,
                            fontSize: 13,
                            color: C.charcoal,
                            cursor: "pointer",
                          }}
                        >
                          {["Blusas", "Vestidos", "Pantalones", "Faldas", "Outerwear", "Conjuntos"].map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Step 3: CTA ─── */}
                <div
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: 18,
                    padding: "28px",
                    textAlign: "center",
                    opacity: canTryOn ? 1 : 0.45,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: canTryOn ? C.warm : C.border,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ color: C.white, fontSize: 12, fontWeight: 600 }}>3</span>
                    </div>
                    <p style={{ fontFamily: F.inter, fontSize: 13, fontWeight: 500, color: C.charcoal, margin: 0 }}>
                      Visualiza tu look
                    </p>
                  </div>
                  <button
                    className="ai-cta"
                    onClick={handleTryOn}
                    disabled={!canTryOn || tryLoading}
                    style={{
                      background: canTryOn ? C.charcoal : C.border,
                      color: C.white,
                      border: "none",
                      padding: "18px 64px",
                      borderRadius: 100,
                      fontFamily: F.inter,
                      fontSize: 12,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      cursor: canTryOn && !tryLoading ? "pointer" : "not-allowed",
                    }}
                  >
                    ✦ Visualizar mi look
                  </button>
                  <p style={{ fontFamily: F.inter, fontSize: 11, color: C.muted, marginTop: 12, lineHeight: 1.5 }}>
                    El proceso toma ~30-60 segundos · resultado es inspiración visual, no exacto
                  </p>
                </div>

                {/* ── Loading / Error states ─── */}
                {tryLoading && (
                  <div style={{ marginTop: 32 }}>
                    <LoadingSkeleton msg={tryLoadingMsg} />
                  </div>
                )}
                {tryError && !tryLoading && (
                  <div style={{ marginTop: 32 }}>
                    <ErrorState msg={tryError} onRetry={handleTryOn} />
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* TAB: RECOMENDACIONES                                               */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {tab === "recs" && (
          <div>
            <div style={{ maxWidth: 520, margin: "0 auto 36px" }}>
              <p
                style={{
                  fontFamily: F.inter,
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: C.muted,
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                Tu foto · Tu estilo
              </p>
              <ImageUploader
                preview={recPhoto}
                onFile={(url, file) => { setRecPhoto(url); setRecFile(file); setRecsResult(null); }}
                placeholder="Sube una foto tuya para recomendaciones personalizadas"
                minHeight={260}
              />
            </div>

            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <button
                className="ai-cta"
                onClick={handleRecs}
                disabled={!canRecs || recsLoading}
                style={{
                  background: canRecs ? C.charcoal : C.border,
                  color: C.white,
                  border: "none",
                  padding: "18px 60px",
                  borderRadius: 100,
                  fontFamily: F.inter,
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: canRecs && !recsLoading ? "pointer" : "not-allowed",
                }}
              >
                {recsLoading ? "Analizando…" : "◆ Descubrir mi estilo"}
              </button>
            </div>

            {recsLoading && (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    background: C.warmLight,
                    borderRadius: 100,
                    padding: "14px 28px",
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      border: `2px solid ${C.warm}`,
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      animation: "ai-spin 0.8s linear infinite",
                    }}
                  />
                  <span style={{ fontFamily: F.inter, fontSize: 13, color: C.dark }}>
                    Analizando tu estilo personal…
                  </span>
                </div>
              </div>
            )}

            {recsError && !recsLoading && (
              <ErrorState msg={recsError} onRetry={handleRecs} />
            )}

            {recsResult && !recsLoading && (
              <div style={{ animation: "ai-fadeup 0.5s ease forwards" }}>
                {/* Analysis summary */}
                <div
                  style={{
                    background: C.charcoal,
                    borderRadius: 18,
                    padding: "28px 32px",
                    marginBottom: 32,
                    display: "flex",
                    gap: 32,
                    flexWrap: "wrap",
                  }}
                >
                  {([
                    ["Tono de piel", recsResult.analysis.skinTone],
                    ["Silueta", recsResult.analysis.bodyType],
                    ["Estilo percibido", recsResult.analysis.style],
                  ] as [string, string][]).map(([label, val]) => (
                    <div key={label} style={{ flex: "1 1 160px" }}>
                      <p
                        style={{
                          fontFamily: F.inter,
                          fontSize: 9,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: C.warm,
                          margin: "0 0 8px",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        style={{
                          fontFamily: F.playfair,
                          fontSize: 18,
                          color: C.white,
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {val}
                      </p>
                    </div>
                  ))}
                </div>

                <h3
                  style={{
                    fontFamily: F.playfair,
                    fontSize: 28,
                    fontWeight: 400,
                    color: C.charcoal,
                    textAlign: "center",
                    margin: "0 0 28px",
                  }}
                >
                  Las 3 prendas que más te favorecen
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 22 }}>
                  {recsResult.recommendations.map((rec, i) => {
                    const item = catalog.find((c) => c.id === rec.productId);
                    return item ? <RecCard key={rec.productId} rec={rec} item={item} rank={i + 1} /> : null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
