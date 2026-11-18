import { NextRequest, NextResponse } from 'next/server';
import { verifyAndGetSecretLetter } from '@/lib/secret-letter-server';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: 'Meri Princess, pehle apna secret password likhein ❤️',
      },
      { status: 400 }
    );
  }

  const password =
    typeof body === 'object' && body !== null && 'password' in body
      ? (body as { password?: unknown }).password
      : undefined;

  const result = verifyAndGetSecretLetter(password);

  if (!result.ok) {
    if (result.reason === 'empty') {
      return NextResponse.json(
        {
          ok: false,
          message: 'Meri Princess, apna secret password toh enter karein ❤️',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        message:
          'Yeh secret password sahi nahi hai, Meri Princess... Dil se dobara koshish karein ❤️',
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    ok: true,
    letter: result.letter,
  });
}
