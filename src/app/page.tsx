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

export default function Home() {
  const [club, setClub] = useState<ClubData | undefined>();

  useEffect(() => {
    fetch("/api/player") // API Route 호출
      .then((res) => res.json())
      .then((data) => setClub(data))
      .catch((error) => console.error("Error fetching club data:", error));
  }, []);

  if (!club) return <div>Loading...</div>;

  console.log("club : ", club);

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
    </div>
  );
}
