import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
//socket
import socket from "../../services/api";
//css
import "./chat.css";

const Chat = ({ chat, userName }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  //Fonction qui est appelée lorsque l'utilisateur envoie un message
  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        chatId: chat,
        user: userName,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  };
  //UseEffect qui est appelé chaque fois que le socket a changé
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);

    });
  }, [socket]);

  return (
    <main className="chat-window">
      <div className="chat-header">
        <p>Discussion en ligne</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={userName === messageContent.user ? "you" : "other"}
              >
                <section>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.user}</p>
                  </div>
                </section>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          placeholder="message..."
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </main>
  );
};

export default Chat;
