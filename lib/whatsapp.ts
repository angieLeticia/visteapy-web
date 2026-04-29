// TODO: reemplazar por número real cuando esté listo
const WHATSAPP_NUMBER = "57XXXXXXXXXX";

export function buildWhatsAppUrl(lookName: string, size?: string): string {
  const text = size
    ? `Hola Visteapy, me interesa el look ${lookName} talla ${size}`
    : `Hola Visteapy, me interesa el look ${lookName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppGeneral(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Visteapy, quiero conocer más sobre sus looks")}`;
}
