import './DeveloperPage.css'
import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";

export default function DeveloperPage() {

  const [developerInfo,setDeveloperInfo] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/developers/${id}`)
      .then(response => {
        response.json().then(developerInfo => {
          setDeveloperInfo(developerInfo);
        });
      });
  }, [id]);

  if (!developerInfo) return '';

  return (
    <div className="developer-page">
      <img className="developer-image" src="https://res.cloudinary.com/practicaldev/image/fetch/s--_HBZhuhF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/nweeqf97l2md3tlqkjyt.jpg" alt=""/>
      <h1 className="username">{developerInfo.username}</h1>
      <div className="details">
      <h2>About</h2>
      <p>{developerInfo.about}</p>
      <div className="email">
        <h3>Contact Details</h3>
        <p className="attribute">Email: </p>
        <p>{developerInfo.email}</p>
        <br />
        <p className="attribute">Contact Number: </p>
        <p>{developerInfo.contact}</p>
        <br/>
        <a href={developerInfo.github} target="_blank">GitHub</a>
        <br/>
        <a href={developerInfo.linkedin} target="_blank">LinkedIn</a>
      </div>
      </div>
    </div>
  );
};