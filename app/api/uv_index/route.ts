import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const lat = 45.464203;
    const lon = 9.189982;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(url, {
      next: {
        revalidate: 900,
      },
    });

    const UVData = await res.json();
    return NextResponse.json(UVData);
  } catch (error) {
    console.log("error", error);
    return new Response("error", { status: 500 });
  }
}
