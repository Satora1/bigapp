import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const { env: { imagekit: { publicKey, privateKey, urlEndpoint } } } = config;

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint
});

export async function GET() {
  const authParams = imagekit.getAuthenticationParameters();

  return new NextResponse(JSON.stringify(authParams), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://bigapp-n6wpmnuut-satora1s-projects.vercel.app",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

// obsługa preflight OPTIONS (ważne!)
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://bigapp-n6wpmnuut-satora1s-projects.vercel.app",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
