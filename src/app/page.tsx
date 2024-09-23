"use client";

import { useEffect, useState } from "react";

type Member = {
  name: string;
  trophies: number;
}

type ClubData = {
  name: string;
  members: Member[];
}

type PlayerData = {
  name: string;
  trophies: number;
};

export default function Home() {
  const [club, setClub] = useState<ClubData | undefined>();
  const [player, setPlayer] = useState<PlayerData | undefined>();
  

  useEffect(() => {
    // 두 개의 API를 병렬로 호출
    Promise.all([
      fetch("/api/club").then((res) => res.json()),
      fetch("/api/player").then((res) => res.json())
    ])
      .then(([clubData, playerData]) => {
        setClub(clubData);
        setPlayer(playerData);
      })
      .catch((error) => console.error("Error fetching club data:", error));
  }, []);

  if (!club) return <div>Loading...</div>;

  console.log("club : ", club);
  console.log("club : ", player);

  const memberInfo = club.members.map(
    (member: { name: string; trophies: number }) => ({
      name: member.name,
      trophies: member.trophies,
    })
  );

  return (
    <div>
      <h1>클럽 이름: {club.name}</h1>

      {/* 멤버 리스트와 트로피 점수 출력 */}
      <ul>
        {memberInfo.map((member, index) => (
          <li key={index}>
            {member.name}: {member.trophies} 트로피
          </li>
        ))}
      </ul>
      <h1>{player?.name}</h1>
      <p>{player?.trophies}</p>
    </div>
  );
}
