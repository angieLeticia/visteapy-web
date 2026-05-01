import { modes, Product } from "./modes";

export type FeaturedTab = "new" | "bestseller" | "sale";

export type FeaturedProduct = Product & { modeName: string; modeSlug: string };
export type SaleProduct = FeaturedProduct & { salePrice: number };

const allProducts: FeaturedProduct[] = modes.flatMap((m) =>
  m.products.map((p) => ({ ...p, modeName: m.name, modeSlug: m.slug }))
);

export const featuredProducts: { new: FeaturedProduct[]; bestseller: FeaturedProduct[]; sale: SaleProduct[] } = {
  new: [
    allProducts.find((p) => p.id === "re-001")!,
    allProducts.find((p) => p.id === "sa-005")!,
    allProducts.find((p) => p.id === "ri-003")!,
    allProducts.find((p) => p.id === "ro-005")!,
    allProducts.find((p) => p.id === "ma-002")!,
    allProducts.find((p) => p.id === "re-005")!,
    allProducts.find((p) => p.id === "sa-001")!,
    allProducts.find((p) => p.id === "ri-004")!,
  ].filter(Boolean),
  bestseller: [
    allProducts.find((p) => p.id === "ma-005")!,
    allProducts.find((p) => p.id === "ri-001")!,
    allProducts.find((p) => p.id === "sa-002")!,
    allProducts.find((p) => p.id === "ro-001")!,
    allProducts.find((p) => p.id === "re-003")!,
    allProducts.find((p) => p.id === "ma-001")!,
    allProducts.find((p) => p.id === "ri-005")!,
    allProducts.find((p) => p.id === "sa-004")!,
  ].filter(Boolean),
  sale: [
    { ...allProducts.find((p) => p.id === "ma-003")!, salePrice: 75000 },
    { ...allProducts.find((p) => p.id === "re-002")!, salePrice: 155000 },
    { ...allProducts.find((p) => p.id === "ri-002")!, salePrice: 89000 },
    { ...allProducts.find((p) => p.id === "ro-003")!, salePrice: 125000 },
    { ...allProducts.find((p) => p.id === "sa-003")!, salePrice: 129000 },
    { ...allProducts.find((p) => p.id === "ma-004")!, salePrice: 109000 },
  ].filter((p): p is SaleProduct => p !== undefined),
};
