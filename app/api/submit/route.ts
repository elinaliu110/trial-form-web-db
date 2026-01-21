import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    console.log("Debug: Received request body", body);
    
    if (!scriptUrl) {
      console.error("Debug Error: NEXT_PUBLIC_GOOGLE_SCRIPT_URL is missing!");
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // 建立 8 秒超時控制，避免 fetch 永久卡住
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'text/plain;charset=utf-8' 
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Debug Error: Google Script returned", errorText);
        return NextResponse.json({ error: 'Google Script Error', details: errorText }, { status: 502 });
      }

      return NextResponse.json({ message: 'Success' });

    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error('Detailed Fetch Error: Request Timed Out (8s)');
        return NextResponse.json({ error: 'Connection to Google Timed Out' }, { status: 504 });
      }
      // 這裡會印出具體原因，例如 ECONNREFUSED (網路被擋)
      console.error('Detailed Fetch Error:', fetchError.cause || fetchError.message);
      return NextResponse.json({ error: 'Network fetch failed', details: fetchError.message }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Debug Fatal Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}