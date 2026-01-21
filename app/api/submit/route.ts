export async function POST(req: Request) {
  try {
    const body = await req.json();
    // 確保這裡的變數名稱與 .env.local 一致
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    console.log("Debug: Received request body", body);
    
    if (!scriptUrl) {
      console.error("Debug Error: NEXT_PUBLIC_GOOGLE_SCRIPT_URL is missing!");
      return Response.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Debug Error: Google Script returned", errorText);
      return Response.json({ error: 'Google Script Error' }, { status: 502 });
    }

    return Response.json({ message: 'Success' });
  } catch (error: any) {
    console.error('Debug Fatal Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}