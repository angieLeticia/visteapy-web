import { NextRequest, NextResponse } from "next/server";

type FashnStatus = { id: string; status: string; output?: string[]; error?: string | null };

const CATEGORY_MAP: Record<string, string> = {
  Vestidos: "one-pieces",
  Conjuntos: "one-pieces",
  Blusas: "tops",
  Outerwear: "tops",
  Pantalones: "bottoms",
  Faldas: "bottoms",
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.FASHN_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "FASHN_API_KEY no configurado" }, { status: 500 });

  const { humanImg, garmImg, garmentDes, garmentCategory } = (await req.json()) as {
    humanImg: string;
    garmImg: string;
    garmentDes: string;
    garmentCategory: string;
  };

  const category = CATEGORY_MAP[garmentCategory] ?? "tops";

  const createRes = await fetch("https://api.fashn.ai/v1/run", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model_name: "tryon-v1.6",
      inputs: {
        model_image: humanImg,
        garment_image: garmImg,
        category,
        segmentation_free: false,
        mode: "quality",
        garment_photo_type: "auto",
      },
    }),
  });

  if (!createRes.ok) {
    const err = (await createRes.json()) as { error?: string; detail?: string };
    return NextResponse.json({ error: err.error ?? err.detail ?? `Error ${createRes.status}` }, { status: 500 });
  }

  const data = (await createRes.json()) as { id: string; error?: string };
  if (data.error) return NextResponse.json({ error: data.error }, { status: 500 });

  return NextResponse.json({ predictionId: data.id });
}

export async function GET(req: NextRequest) {
  const apiKey = process.env.FASHN_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "FASHN_API_KEY no configurado" }, { status: 500 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Falta el parámetro id" }, { status: 400 });

  const pollRes = await fetch(`https://api.fashn.ai/v1/status/${id}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const poll = (await pollRes.json()) as FashnStatus;

  if (poll.status === "completed" && poll.output?.length) {
    return NextResponse.json({ status: "succeeded", imageUrl: poll.output[0] });
  }

  if (poll.status === "failed") {
    return NextResponse.json({ status: "failed", error: poll.error ?? "La predicción falló." });
  }

  return NextResponse.json({ status: poll.status });
}
