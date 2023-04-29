import React, { useState } from "react";
import "./HackathonPage.css";

const items = [
  {
    id: 1,
    title: "JPMC ML Hacakthon",
    description:
      "Fintech-centered ML hackathon organized by JMPC that brings together a community of professionals, students, and enthusiasts interested in financial technology and machine learning. ",
    releaseDate: "2023-05-07",
    prizemoney: "120000",
    relevanceScore: 25193,
    publisher: "JPMC",
    platform: "ML",
  },
  {
    id: 2,
    title: "Hackathon for Sustainable Development Goals",
    description:
      " This hackathon is focused on developing innovative solutions to address the Sustainable Development Goals (SDGs) set by the United Nations. ",
    releaseDate: "2021-05-01",
    prizemoney: "73500",
    relevanceScore: 13275,
    publisher: "UN India",
    platform: "AI",
  },
  {
    id: 3,
    title: "EA Gaming Hackathon",
    description:
      "A hackathon focused on testing and improving the EAFC 24 game before release.",
    releaseDate: "2021-10-01",
    prizemoney: "180000",
    relevanceScore: 21197,
    publisher: "EA",
    platform: "App-Dev",
  },
  {
    id: 4,
    title: "SmartComm",
    description:
      " Create a platform that enables efficient communication in disaster situations",
    releaseDate: "2023-05-09",
    prizemoney: "20000",
    relevanceScore: 12376,
    publisher: "DisConnect",
    platform: "Web-Dev",
  },
  {
    id: 5,
    title: "MyCarbonScore",
    description:
      "Create a solution that helps individuals measure their carbon footprint",
    releaseDate: "2023-09-11",
    prizemoney: "227000",
    relevanceScore: 9876,
    publisher: "GreenPrints",
    platform: "App-Dev",
  },
  {
    id: 6,
    title: "CultureConnect",
    description:
      "Create a platform for tourists that wish to stay with host families to enhance their experience of the Country's culture",
    releaseDate: "2023-07-22",
    prizemoney: "350000",
    relevanceScore: 109876,
    publisher: "GoIbibo",
    platform: "Data Science",
  },
];

const platforms = ["ALL", "AI", "Web-Dev", "Data Science", "IoT", "App-Dev"];

const SortBy = () => {
  const [sortBy, setSortBy] = useState("relevance");
  const [platformFilter, setPlatformFilter] = useState("ALL");

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePlatformFilterChange = (e) => {
    setPlatformFilter(e.target.value);
  };

  const sortedItems = [...items]
    .sort((a, b) => {
      if (sortBy === "relevance") {
        return b.relevanceScore - a.relevanceScore;
      } else if (sortBy === "release-date") {
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      } else if (sortBy === "prizemoney") {
        return b.prizemoney - a.prizemoney;
      }
    })
    .filter((item) => {
      if (platformFilter === "ALL") {
        return true;
      } else {
        return item.platform === platformFilter;
      }
    });

  return (
    <div>
      <label>Platform:</label>
      <select value={platformFilter} onChange={handlePlatformFilterChange}>
        {platforms.map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>
      <br />
      <label>Sort By:</label>
      <select value={sortBy} onChange={handleSortByChange}>
        <option value="relevance">No of Participants (High to Low)</option>
        <option value="release-date">Contest Date</option>
        <option value="prizemoney">Prize Pool</option>
      </select>

      <ul>
        {sortedItems.map((item) => (
          <li className="events" key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Contest Date: {item.releaseDate}</p>
            <p>Participants: {item.relevanceScore}</p>
            <p>Prize Money:₹{item.prizemoney}</p>
            <p>Hackathon Organiser:{item.publisher}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortBy;