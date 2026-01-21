import { cookies } from "next/headers";

import type { ThemeName } from "@/types";
import { hasSupabaseTheme, supabaseServerClient } from "./supabaseClient";

const THEME_COOKIE_NAME = "anon_theme_id";
const DEFAULT_THEME: ThemeName = "dark-green";

export async function getThemeForRequest(): Promise<ThemeName> {
  if (!hasSupabaseTheme || !supabaseServerClient) {
    return DEFAULT_THEME;
  }

  const cookieStore = await cookies();
  const anonId = cookieStore.get(THEME_COOKIE_NAME)?.value;

  if (!anonId) {
    console.log("[theme] No anon_id cookie found, using default theme");
    return DEFAULT_THEME;
  }

  const { data, error } = await supabaseServerClient
    .from("theme_preferences")
    .select("theme")
    .eq("anon_id", anonId)
    .maybeSingle();

  if (error || !data?.theme) {
    console.log("[theme] Supabase theme fetch fallback", {
      anonId,
      error,
      data,
    });
    return DEFAULT_THEME;
  }

  if (
    data.theme === "dark-teal" ||
    data.theme === "dark-green" ||
    data.theme === "light-neutral"
  ) {
    console.log("[theme] Using theme from Supabase", { anonId, theme: data.theme });
    return data.theme;
  }

  console.log("[theme] Invalid theme value in Supabase, using default", {
    anonId,
    theme: data.theme,
  });
  return DEFAULT_THEME;
}
