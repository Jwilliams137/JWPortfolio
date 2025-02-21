import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing form data' }, { status: 400 });
    }

    const formSubmitUrl = `https://formsubmit.co/${process.env.ADMIN_EMAIL}`;

    const res = await fetch(formSubmitUrl, {
      method: 'POST',
      body: new URLSearchParams({
        name,
        email,
        message,
        _subject: 'New message from your website visitor',
        _next: 'http://localhost:3000/thank-you', // Local thank-you page redirect
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Form submit failed' }, { status: 500 });
    }

    // If successful, redirect to the thank-you page
    return NextResponse.redirect('http://localhost:3000/thank-you'); 
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
