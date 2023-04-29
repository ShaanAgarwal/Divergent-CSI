import React, { useState } from "react";
import "./HackathonPage.css";

const items = [
  {
    id: 1,
    title: "JPMC ML Hacakthon",
    description: "Fintech-centered ML hackathon organized by JMPC that brings together a community of professionals, students, and enthusiasts interested in financial technology and machine learning. ",
    releaseDate: "2023-05-07",
    prizemoney:"120000",
    relevanceScore: 25193,
  },
  {
    id: 2,
    title: "Hackathon for Sustainable Development Goals",
    description: " This hackathon is focused on developing innovative solutions to address the Sustainable Development Goals (SDGs) set by the United Nations. ",
    releaseDate: "2021-05-01",
    prizemoney:"73500",
    relevanceScore: 13275,
  },
  {
    id: 3,
    title: "EA Gaming Hackathon",
    description: "A hackathon focused on testing and improving the EAFC 24 game before release.",
    releaseDate: "2021-10-01",
    prizemoney:"180000",
    relevanceScore: 21197,
  },
];

const SortBy = () => {
  const [sortBy, setSortBy] = useState("relevance");

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "relevance") {
      return b.relevanceScore - a.relevanceScore;
    } else if (sortBy === "release-date") {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    }else if(sortBy === "prizemoney"){
      return b.prizemoney-a.prizemoney;
    }
  });

  return (
    <div>
      <select value={sortBy} onChange={handleSortByChange}>
        <option value="relevance">Sort by No of Participants (High to Low)</option>
        <option value="release-date">Sort by Release Date</option>
        <option value="prizemoney">Sort by Prize Pool</option>
      </select>
      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Release Date: {item.releaseDate}</p>
            <p>Participants: {item.relevanceScore}</p>
            <p>Prize Money:₹{item.prizemoney}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortBy;