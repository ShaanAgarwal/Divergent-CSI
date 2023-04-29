import React from 'react';
import {useEffect, useState} from "react";
import Developer from '../Developer';

export default function Developers() {
    
    const [developers,setDevelopers] = useState([]);
  
      useEffect(() => {
        fetch('http://localhost:4000/developers').then(response => {
         response.json().then(developers => {
            setDevelopers(developers);
        });
        });
    }, []);

  return (
    <>
    <h1>Developers</h1>
    {developers.length > 0 && developers.map(developer => (
      <Developer {...developer} />
    ))}
  </>
  )
};