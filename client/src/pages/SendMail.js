import './SendMail.css';
import React, { useState } from 'react';

function SendMail() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:4000/send_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ from, to, subject, message })
    });

    if (response.ok) {
      alert('Failed to send email');
    } else {
      alert('Email sent successfully');

    }
  };

  return (
    <div className="Form">
    <form class="form-container" onSubmit={handleSubmit}>
      <label htmlFor="from">From:</label>
      <input type="email" name="from" id="from" value={from} onChange={(e) => setFrom(e.target.value)} /><br />

      <label htmlFor="to">To:</label>
      <input type="email" name="to" id="to" value={to} onChange={(e) => setTo(e.target.value)} /><br />

      <label htmlFor="subject">Subject:</label>
      <input type="text" name="subject" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} /><br />

      <label htmlFor="message">Message: </label>
      <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea><br />

      <button type="submit">Send</button><br />
    </form>
    </div>
  );
}

export default SendMail;
