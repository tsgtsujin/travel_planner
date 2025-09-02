import { NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const API_KEY = process.env.ORS_API_KEY;
  try {
    const res = await axios.post(
      "https://api.openrouteservice.org/v2/matrix/driving-car",
      body,
      {
        headers: {
          Authorization: API_KEY!,
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(JSON.stringify(res.data), {
      status: 200,
    });
  } catch (err) {
    console.error("ORS error:", err);
    return new Response("ORS error", { status: 500 });
  }
}
