import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const dataDirectory = path.join(process.cwd(), "data");
const eventsFilePath = path.join(dataDirectory, "events.json");

export async function POST(request: Request) {
  try {
    const event = await request.json();
    const serverTimestamp = new Date().toISOString();
    const eventWithServerTimestamp = { ...event, serverTimestamp };

    await fs.mkdir(dataDirectory, { recursive: true });

    let events: unknown[] = [];
    try {
      const existing = await fs.readFile(eventsFilePath, "utf8");
      events = JSON.parse(existing ?? "[]");
      if (!Array.isArray(events)) {
        events = [];
      }
    } catch (error) {
      const err = error as { code?: string };
      if (err.code !== "ENOENT") {
        throw error;
      }
    }

    events.push(eventWithServerTimestamp);
    await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2), "utf8");

    return NextResponse.json({ success: true, event: eventWithServerTimestamp });
  } catch (error) {
    console.error("Error saving event:", error);
    return NextResponse.json(
      { success: false, error: "Unable to save event." },
      { status: 500 }
    );
  }
}
