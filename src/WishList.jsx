import { useEffect, useState } from "react";
import UserContext from "./Context/Context";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import axios from "axios";
import { useLocalStorage } from "@uidotdev/usehooks";
import Card from "./components/Card/Card";

const WishList = () => {
  const [listings, setListings] = useState([]);
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/wishlist", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        setListings(res.data);
        console.log(res.data);
      });
  }, []);
  return (
    <>
      <UserContext.Provider value={{}}>
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
        Wish List
      </h1>
      <div className="listings">
        {listings?.map((item) => (
          <a href={`/details/${item.listing_id}`}>
            <Card
              name={item.title}
              image={`http://localhost:5000/uploads/${item.image_path}`}
              price={item.price}
            />
          </a>
        ))}
      </div>
    </>
  );
};

export default WishList;
