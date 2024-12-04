import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { IoCodeSlash, IoSend, IoSunny, IoMoon } from "react-icons/io5";
import { BiPlanet } from "react-icons/bi";
import { FaPython } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const messagesEndRef = useRef(null);

  const hitRequest = () => {
    if (message.trim()) {
      generateResponse(message);
    } else {
      alert("You must write something...!");
    }
  };

  const generateResponse = async (msg) => {
    if (!msg) return;

    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyBdJ3xZr3FhW3G7mXtnJaGPf2oUMe-al1E"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(msg);

      const newMessages = [
        ...messages,
        { type: "userMsg", text: msg },
        { type: "responseMsg", text: result.response.text() },
      ];

      setMessages(newMessages);
      setIsResponseScreen(true);
      setMessage("");
    } catch (error) {
      console.error("Error generating response:", error);
      alert("There was an error generating the response.");
    }
  };

  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`container min-h-screen overflow-x-hidden ${
        darkMode ? "bg-dark" : "bg-light"
      } text-${darkMode ? "white" : "black"}`}
    >
      <div className="background-images">
        <img src="" alt="Cartoon 1" className="cartoon cartoon1" />
        <img src="/cartoon2.png" alt="Cartoon 2" className="cartoon cartoon2" />
      </div>

      <div className="header pt-6 flex items-center justify-between px-8">
        <h2 className="text-3xl font-bold">MYGPT</h2>
        <div className="flex items-center gap-4">
          <button
            id="newChatBtn"
            className="bg-buttonBg p-2 rounded-full cursor-pointer text-sm"
            onClick={newChat}
          >
            New Chat
          </button>
          <button onClick={toggleTheme} className="text-2xl focus:outline-none">
            {darkMode ? <IoSunny /> : <IoMoon />}
          </button>
        </div>
      </div>

      {isResponseScreen ? (
        <div className="messages-container px-8 py-4 flex-1 overflow-y-auto">
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.type === "userMsg" ? "user" : "response"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      ) : (
        <div className="middle flex-1 flex items-center justify-center px-8">
          <div className="boxes grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className="card"
              onClick={() => setMessage("What is coding? How can we learn it.")}
            >
              <p>What is coding? How can we learn it.</p>
              <IoCodeSlash className="icon" />
            </div>
            <div
              className="card"
              onClick={() =>
                setMessage("Which is the red planet of the solar system?")
              }
            >
              <p>Which is the red planet of the solar system?</p>
              <BiPlanet className="icon" />
            </div>
            <div
              className="card"
              onClick={() => setMessage("In which year was Python invented?")}
            >
              <p>In which year was Python invented?</p>
              <FaPython className="icon" />
            </div>
            <div
              className="card"
              onClick={() => setMessage("How can we use AI for adoption?")}
            >
              <p>How can we use AI for adoption?</p>
              <TbMessageChatbot className="icon" />
            </div>
          </div>
        </div>
      )}

      <div className="bottom px-8 py-4 flex flex-col items-center">
        <div
          className={`inputBox flex items-center ${
            darkMode ? "bg-inputBgDark" : "bg-inputBgLight"
          } rounded-full px-4 py-2 w-full max-w-2xl`}
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="flex-1 bg-transparent outline-none text-base"
            placeholder="Write your message here..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                hitRequest();
              }
            }}
          />
          {message.trim() && (
            <button onClick={hitRequest} className="text-sendColor text-xl">
              <IoSend />
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          MYGPT is developed by Krish Prajapati. This AI uses the Gemini API to
          generate responses.
        </p>
      </div>
    </div>
  );
};

export default App;
