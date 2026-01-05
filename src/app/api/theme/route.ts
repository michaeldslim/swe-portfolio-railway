import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { ThemeName } from "@/types";
import { hasSupabaseTheme, supabaseServerClient } from "@/server/supabaseClient";

const THEME_COOKIE_NAME = "anon_theme_id";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const theme = body?.theme as ThemeName | undefined;

		if (!theme || !["dark-teal", "dark-green", "light-neutral"].includes(theme)) {
			return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
		}

		// If Supabase is not configured (e.g., production Netlify with no secrets),
		// treat this as a no-op but still return success so the UI doesn't break.
		if (!hasSupabaseTheme || !supabaseServerClient) {
			return new NextResponse(null, { status: 204 });
		}

		const cookieStore = await cookies();
		let anonId = cookieStore.get(THEME_COOKIE_NAME)?.value;
		let isNewAnon = false;
		if (!anonId) {
			anonId = crypto.randomUUID();
			isNewAnon = true;
		}

		await supabaseServerClient
			.from("theme_preferences")
			.upsert({ anon_id: anonId, theme }, { onConflict: "anon_id" });

		const response = new NextResponse(null, { status: 204 });
		if (isNewAnon && anonId) {
			response.cookies.set(THEME_COOKIE_NAME, anonId, {
				path: "/",
				maxAge: 60 * 60 * 24 * 365,
				httpOnly: true,
				sameSite: "lax",
			});
		}

		return response;
	} catch {
		return NextResponse.json({ error: "Bad request" }, { status: 400 });
	}
}
