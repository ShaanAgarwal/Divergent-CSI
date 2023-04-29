import React, { useState, useEffect } from 'react';
import Chat from '../Chat';

function ChatRoom() {

    const [chat, setChat] = useState("");
    const [secret, setSecret] = useState([]);
    const [redirect, setRedirect] = useState(false);

    async function createNewChat(ev) {
        const data = new FormData();
        data.set("chat", chat);
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/chatroom", {
          method: "POST",
          body: JSON.stringify({chat}),
          headers: {'Content-Type':'application/json'},
        });
        if (response.status === 200) {
            setRedirect(true);
          } else {
            alert('Chat not sent');
          }
      };

    useEffect(() => {
        fetch('http://localhost:4000/chatroom').then(response => {
         response.json().then(secret => {
            setSecret(secret);
        });
        });
    }, []);

    useEffect(() => {
        if (redirect) {
            window.location.reload();
        }
    }, [redirect]);

    return (
        <>
        <h1>Chat Room</h1>
        {secret.length > 0 && secret.map(secrets => (
            <Chat {...secrets} />
        ))}
        <form onSubmit={createNewChat}>
        <input
            type="text"
            placeholder={"Enter your Chat"}
            value={chat}
            onChange={(ev) => setChat(ev.target.value)}
          />
        <button>Submit your Chat</button>
        </form>
        </>
      )
};

export default ChatRoom;
