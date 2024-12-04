import "./ChatBotPage.css";
import ChatBot from "./components/ChatBot/ChatBot";
import Navbar from "./components/NavBar/Navbar";
import UserContext from "./Context/Context";
const ChatBotPage = () => {
  const selectedCategory = {};
  const setSelectedCategory = (category) => {
    window.location.href = "/?selected_category=" + category;
  };
  return (
    <UserContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      <Navbar />
      <ChatBot />
    </UserContext.Provider>
  );
};

export default ChatBotPage;
