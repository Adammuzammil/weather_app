import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const lat = 45.464203;
    const lon = 9.189982;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await fetch(url, {
      next: {
        revalidate: 1800,
      },
    });

    const dailyData = await res.json();
    return NextResponse.json(dailyData);
  } catch (error) {
    console.log("error", error);
    return new Response("error", { status: 500 });
  }
}
