import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // 如果變數缺失，直接報錯而不執行 fetch
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase Environment Variables!");
      return NextResponse.json({ error: 'Server Config Missing' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const data = await req.json();

    const { data: insertedData, error } = await supabase
      .from('applications')
      .insert([
        {
          product: data.product,
          scenario: data.scenario,
          company: data.company,
          contact_name: data.contactName,
          contact_email: data.contactEmail,
          bdm: data.bdm,
          sales: data.sales,
          comments: data.comments,
        },
      ]);

    if (error) throw error;

    return NextResponse.json({ message: 'Success' });

  } catch (error: any) {
    // 印出 error.cause 
    console.error('Detailed Debug Error:', {
      message: error.message,
      cause: error.cause, 
      stack: error.stack
    });
    return NextResponse.json({ 
      error: error.message, 
      reason: error.cause?.message || "Check Server Logs" 
    }, { status: 500 });
  }
}
