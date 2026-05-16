import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json(
        { success: false, error: "Missing Supabase configuration." },
        { status: 500 }
      );
    }

    const event = await request.json();
    const serverTimestamp = new Date().toISOString();
    const eventWithServerTimestamp = { ...event, serverTimestamp };

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
      },
    });

    const { data, error } = await supabase.from("experiment_events").insert([
      {
        participant_id: event.participantId ?? null,
        session_id: event.sessionId ?? null,
        condition: event.condition ?? null,
        event_type: event.eventType ?? null,
        client_timestamp: event.timestamp ?? null,
        server_timestamp: serverTimestamp,
        time_since_page_load: event.timeSincePageLoad ?? null,
        page: event.page ?? null,
        search_query: event.searchQuery ?? null,
        product_id:
          event.productId !== undefined && event.productId !== null
            ? String(event.productId)
            : null,
        product_name: event.productName ?? null,
        product_price: event.productPrice ?? null,
        product_label: event.productLabel ?? null,
        raw_event: eventWithServerTimestamp,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error saving event to Supabase:", error);
    return NextResponse.json(
      { success: false, error: "Unable to save event." },
      { status: 500 }
    );
  }
}
