import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Visteapy <hola@visteapy.com>";

function bienvenidaHtml(nombre: string): string {
  const displayName = nombre || "Protagonista";
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenida a Visteapy</title>
</head>
<body style="margin:0;padding:0;background:#FAFAF8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF8;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#FAFAF8;max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <a href="https://visteapy.com" style="text-decoration:none;">
                <div style="font-family:Georgia,serif;font-size:32px;font-weight:700;letter-spacing:-0.02em;color:#1C1C1A;">APY</div>
                <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#1C1C1A;opacity:0.4;margin-top:2px;">visteapy</div>
              </a>
            </td>
          </tr>

          <!-- Hero line -->
          <tr>
            <td style="padding:0 32px 32px;">
              <div style="width:40px;height:1px;background:#B87355;margin-bottom:24px;"></div>
              <h1 style="font-family:Georgia,serif;font-size:28px;color:#1C1C1A;margin:0 0 16px;line-height:1.3;font-weight:400;">
                Bienvenida, ${displayName}.
              </h1>
              <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#1C1C1A;opacity:0.6;line-height:1.7;margin:0;">
                Ya eres parte de Visteapy — el universo donde el estilo se convierte en lenguaje propio.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px 32px;">
              <div style="border-top:1px solid #E8E4DE;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 32px 32px;">
              <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#1C1C1A;opacity:0.6;line-height:1.8;margin:0 0 20px;">
                Ahora puedes guardar los looks que te enamoran, explorar cada universo de moda y, cuando estés lista, escribirnos directamente para hacer tuyo ese outfit.
              </p>
              <p style="font-family:Georgia,serif;font-size:16px;color:#1C1C1A;font-style:italic;line-height:1.7;margin:0 0 32px;">
                &ldquo;La moda es arquitectura: es una cuestión de proporciones.&rdquo;
              </p>

              <!-- CTA Button -->
              <a href="https://visteapy.com/#modos"
                style="display:inline-block;background:#1C1C1A;color:#FAFAF8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;padding:14px 32px;">
                Explorar universos
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px 32px;">
              <div style="border-top:1px solid #E8E4DE;"></div>
            </td>
          </tr>

          <!-- Features quick list -->
          <tr>
            <td style="padding:0 32px 40px;">
              <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#1C1C1A;opacity:0.4;margin:0 0 16px;">
                Lo que puedes hacer
              </p>
              <table cellpadding="0" cellspacing="0" style="width:100%;">
                <tr>
                  <td style="padding:8px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#1C1C1A;opacity:0.7;border-bottom:1px solid #E8E4DE;">
                    ♡ &nbsp; Guardar looks a tu wishlist
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#1C1C1A;opacity:0.7;border-bottom:1px solid #E8E4DE;">
                    ✦ &nbsp; Usar el Estilista IA para verte con el look puesto
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#1C1C1A;opacity:0.7;">
                    → &nbsp; Escribirnos por WhatsApp y hacer el outfit tuyo
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:0 32px 40px;">
              <p style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#1C1C1A;opacity:0.3;line-height:1.7;margin:0;">
                Recibiste este correo porque creaste una cuenta en
                <a href="https://visteapy.com" style="color:#B87355;text-decoration:none;">visteapy.com</a>.<br/>
                Si no fuiste tú, ignora este mensaje.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { email, nombre } = (await req.json()) as { email: string; nombre?: string };

    if (!email) {
      return NextResponse.json({ error: "email requerido" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY no configurado — correo omitido");
      return NextResponse.json({ skipped: true });
    }

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [email],
      subject: "Bienvenida a tu universo — Visteapy",
      html: bienvenidaHtml(nombre ?? ""),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data?.id });
  } catch (err) {
    console.error("Email bienvenida error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
