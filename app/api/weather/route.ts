import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const lat = 35.689487;
    const lon = 139.691711;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await fetch(url, {
      next: {
        revalidate: 900,
      },
    });

    const weather = await res.json();
    return NextResponse.json(weather);
  } catch (error) {
    console.log("Error fetching data");
    return new Response("error", { status: 500 });
  }
}
