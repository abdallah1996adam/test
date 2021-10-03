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
  //Fonction qui est appelée lorsque l'utilisateur rejoint un chat
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
            <h3>Rejoindre un chat</h3>
            <input
              type="text"
              placeholder="votre nom"
              onChange={(event) => setUserName(event.target.value)}
            />
            <input
              type="text"
              placeholder="chat id"
              onChange={(event) => setChatId(event.target.value)}
            />
            <button onClick={joinChat}>Rejoindre </button>
          </div>
        ) : (
          <Chat userName={userName} chat={chatId} />
        )}
      </main>
    </>
  );
};

export default Home;
