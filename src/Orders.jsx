import { useEffect, useState } from "react";
import UserContext from "./Context/Context";
import "./Admin.css";
import Navbar from "./components/NavBar/Navbar";
import axios from "axios";
import { useLocalStorage } from "@uidotdev/usehooks";
import OrderCard from "./components/Card/OrderCard";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/orders", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectedCategory = {};
  const setSelectedCategory = (category) => {
    window.location.href = "/?selected_category=" + category;
  };
  return (
    <>
      <UserContext.Provider value={{ selectedCategory, setSelectedCategory }}>
        <Navbar />
      </UserContext.Provider>
      <h1
        style={{
          marginTop: "150px",
          width: "100%",
          textAlign: "start",
          marginLeft: "20px",
          textTransform: "uppercase",
        }}
      >
        Orders
      </h1>
      <div className="orders">
        {orders.map((order) => (
          <OrderCard order={order} admin={false} />
        ))}
      </div>
    </>
  );
};

export default Orders;
