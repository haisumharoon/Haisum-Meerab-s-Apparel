import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";
import axios from "axios";
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestMessages, setRequestMessages] = useState([
    {
      role: "system",
      content:
        "You are a friendly assistant who helps with fashion suggestions. recommend the user clothes from give only categories",
    },
  ]);
  const messageRef = useRef();
  const API_KEY = import.meta.env.VITE_AIMLAPIKEY;
  const GetResponse = () => {
    setLoading(true);
    axios
      .post(
        "https://api.aimlapi.com/chat/completions",
        {
          model: "chatgpt-4o-latest",
          messages: requestMessages,
          max_tokens: 500,
          stream: false,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setMessages([
          ...messages,
          {
            role: res.data.choices[0].message.role,
            content: res.data.choices[0].message.content,
          },
        ]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setRequestMessages([requestMessages[requestMessages.length - 1]]);
          GetResponse();
          return;
        }
        if (err.response.status === 429) {
          setMessages([
            ...messages,
            {
              role: "bot",
              content:
                "I am sorry, the hourly limit has been reached because we are poor ;(",
            },
          ]);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    if (messages.length > 0) {
      if (messages[messages.length - 1].role === "user") {
        console.log(messages);
        GetResponse();
      }
    }
    setTimeout(() => {
      document.querySelector(".chat-body").scrollTo(0, 100000);
    }, 100);
  }, [messages]);
  return (
    <>
      <div className="chat-card">
        <div className="chat-header">
          <div className="h2">
            Clothing Assistant{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-robot"
              viewBox="0 0 16 16"
            >
              <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135" />
              <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5" />
            </svg>
            {loading ? (
              <div className="dots">
                <div className="dot1">.</div>
                <div className="dot2">.</div>
                <div className="dot3">.</div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="close-icon"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
        <div className="chat-body">
          <div className="message incoming">
            <p>Hello, how can I assist you today?</p>
          </div>
          {messages.map((message) =>
            message.role == "system" ? (
              <></>
            ) : (
              <div
                className={`message ${
                  message.role === "user" ? "outgoing" : "incoming"
                }`}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: message.content
                      .replace(/\*\*(.*?)\*\*/g, (match, p1) => `<b>${p1}</b>`)
                      .replace(/\n/g, "<br>"),
                  }}
                ></p>
              </div>
            )
          )}
        </div>

        <form
          action=""
          className="chat-footer"
          onSubmit={(e) => {
            e.preventDefault();

            setMessages([
              ...messages,
              { role: "user", content: e.target[0].value },
            ]);
            setRequestMessages([
              ...requestMessages,
              { role: "user", content: e.target[0].value },
            ]);

            messageRef.current.value = "";
          }}
        >
          <input
            placeholder="Type your message"
            type="text"
            className="chat-input"
            ref={messageRef}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};
export default ChatBot;
