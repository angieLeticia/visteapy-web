import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import MiCuentaClient from "./MiCuentaClient";

export const metadata = {
  title: "Mi cuenta — Visteapy",
};

export default async function MiCuentaPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  // Cargar perfil y wishlist en paralelo
  const [{ data: profile }, { data: wishlist }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("wishlist_items")
      .select("*")
      .eq("user_id", user.id)
      .order("added_at", { ascending: false }),
  ]);

  return (
    <MiCuentaClient
      user={user}
      profile={profile}
      wishlist={wishlist ?? []}
    />
  );
}
