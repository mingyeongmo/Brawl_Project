// app/api/player/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.brawlstars.com/v1/clubs/%23GC8RPLJP', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.BRAWL_API_TOKEN}`, // API 토큰 사용
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error('Error fetching Brawl Stars API:', res.status, res.statusText);  // 에러 로그 출력
      return NextResponse.json({ error: 'Failed to fetch club data' }, { status: res.status });
    }

    const club = await res.json();
    return NextResponse.json(club);
  } catch (error) {
    console.error('Error in API Route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
