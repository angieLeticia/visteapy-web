import { supabase } from "./supabase";

export type Size = string;

export interface Product {
  id: string;
  mode_slug: string;
  name: string;
  description: string;
  price: number;
  sizes: Size[];
  sold_out_sizes: Size[];
  image: string;
  reference: string | null;
  sort_order: number;
}

export interface Mode {
  slug: string;
  name: string;
  tagline: string;
  opening_poem: string;
  palette: string[];
  hero_image: string;
  hero_image_alt: string;
  sort_order: number;
  products?: Product[];
}

export async function getAllModes(): Promise<Mode[]> {
  const { data, error } = await supabase
    .from("modes")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error("getAllModes error:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getModeWithProducts(slug: string): Promise<Mode | null> {
  const { data: mode, error: modeError } = await supabase
    .from("modes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (modeError || !mode) return null;

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("mode_slug", slug)
    .order("sort_order");

  if (productsError) {
    console.error("getProducts error:", productsError.message);
    return { ...mode, products: [] };
  }

  return { ...mode, products: products ?? [] };
}

export async function getAllModeSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("modes")
    .select("slug")
    .order("sort_order");

  if (error) {
    console.error("getAllModeSlugs error:", error.message);
    return [];
  }
  return (data ?? []).map((m) => m.slug);
}

export function formatPrice(price: number): string {
  return `$ ${price.toLocaleString("es-CO")} COP`;
}
