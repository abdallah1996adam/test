import React, { useState } from "react";
//socket
import socket from "../../services/api";
//Chat
import Chat from "../../components/chat/Chat";
//css
import "./home.css";

export const Home = () => {
  const [userName, setUserName] = useState("");
  const [chatId, setChatId] = useState("");
  const [showChat, setShowChat] = useState(false);
  //function that get called when the user join a chat
  const joinChat = () => {
    if (userName !== "" && chatId !== "") {
      socket.emit("join_chat", chatId);
      setShowChat(true);
    }
  };

  return (
    <>
      <main className="Container">
        {!showChat ? (
          <div className="joinChatContainer">
            <h3>Join a Chat</h3>
            <input
              type="text"
              placeholder="Laura..."
              onChange={(event) => setUserName(event.target.value)}
            />
            <input
              type="text"
              placeholder="chat id"
              onChange={(event) => setChatId(event.target.value)}
            />
            <button onClick={joinChat}>Join</button>
          </div>
        ) : (
          <Chat userName={userName} chat={chatId} />
        )}
      </main>
    </>
  );
};

export default Home;
