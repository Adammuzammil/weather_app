import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const searchParams = req.nextUrl.searchParams;
    const city = searchParams.get("city");
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const res = await axios.get(url);
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching data");
    return new Response("error", { status: 500 });
  }
}
