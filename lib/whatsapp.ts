const WHATSAPP_NUMBER = "573219183669";

export function buildWhatsAppUrl(lookName: string, size?: string): string {
  const text = size
    ? `Hola Visteapy, me interesa el look "${lookName}" talla ${size}. ¿Está disponible?`
    : `Hola Visteapy, me interesa el look "${lookName}". ¿Pueden contarme más?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppGeneral(): string {
  const text =
    "Hola Visteapy ✨ Quiero conocer más sobre sus universos y encontrar mi look. ¿Por dónde empezamos?";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppByMode(modeSlug: string, modeMessages: Record<string, string>): string {
  const text = modeMessages[modeSlug] ?? "Hola Visteapy, quiero conocer más sobre sus looks.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
