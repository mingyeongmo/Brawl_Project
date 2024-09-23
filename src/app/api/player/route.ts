import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch('https://api.brawlstars.com/v1/players/%23LRJCUPUJP', {
            method: 'GET',
            headers: {
                Authorization:`Bearer ${process.env.BRAWL_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.error('Error fetching Brawl Stars API:', res.status, res.statusText);
            return NextResponse.json({ error: 'Failed to fetch player data'}, {status: res.status});
        }

    const player = await res.json();
    return NextResponse.json(player);

    } catch (error) {
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}