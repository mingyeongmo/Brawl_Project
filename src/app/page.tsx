// app/page.tsx
import React from "react";

type PlayerData = {
  name: string;
  trophies: number;
  // 필요한 데이터 타입 정의
};

async function fetchPlayer(): Promise<PlayerData> {
  const res = await fetch("https://api.brawlstars.com/v1/clubs/GC8RPLJP", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.BRAWL_API_TOKEN}`, // 서버 환경 변수 사용
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // throw new Error("Failed to fetch player data");
    console.log("hi");
  }

  return res.json();
}

export default async function Home() {
  const player = await fetchPlayer();

  return (
    <div>
      <h1>Player: {player.name}</h1>
      <p>Trophies: {player.trophies}</p>
    </div>
  );
}
