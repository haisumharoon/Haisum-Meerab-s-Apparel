import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Admin from "./Admin.jsx";
import Details from "./Details.jsx";
import WishList from "./WishList.jsx";
import Orders from "./Orders.jsx";
import VideoCall from "./VideoCall.jsx";
import { SocketProvider } from "./Context/Socket.jsx";
import { PeerProvider } from "./Context/Peer.jsx";
import ChatBotPage from "./ChatBotPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SocketProvider>
      <PeerProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/chatbot" element={<ChatBotPage />} />
          <Route path="/meet" element={<VideoCall />} />
        </Routes>
      </PeerProvider>
    </SocketProvider>
  </BrowserRouter>
);
