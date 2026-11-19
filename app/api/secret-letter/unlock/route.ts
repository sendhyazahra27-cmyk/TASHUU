import { NextRequest, NextResponse } from 'next/server';
import { verifyAndGetSecretLetter } from '@/lib/secret-letter-server';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  Pragma: 'no-cache',
};

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    const rawBody = await request.text();
    body = rawBody ? JSON.parse(rawBody) : null;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: 'Meri Princess, pehle apna secret password likhein ❤️',
      },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  const rawPassword =
    typeof body === 'object' && body !== null && 'password' in body
      ? (body as { password?: unknown }).password
      : undefined;

  // Strictly handle password as a string (never coerce to number).
  const password = typeof rawPassword === 'string' ? rawPassword : undefined;

  const result = verifyAndGetSecretLetter(password);

  if (!result.ok) {
    if (result.reason === 'empty') {
      return NextResponse.json(
        {
          ok: false,
          message: 'Meri Princess, apna secret password toh enter karein ❤️',
        },
        { status: 400, headers: NO_STORE_HEADERS }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        message:
          'Yeh secret password sahi nahi hai, Meri Princess... Dil se dobara koshish karein ❤️',
      },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      letter: result.letter,
    },
    { status: 200, headers: NO_STORE_HEADERS }
  );
}
