import { useEffect, useState, createContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import Card from "./components/Card/Card";
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import UserContext from "./Context/Context";
import { useParams, useSearchParams } from "react-router-dom";
import FrontDisplay from "./components/FrontDisplay/FrontDisplay";
import ChatBot from "./components/ChatBot/ChatBot";

function App() {
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    document.getElementById("nbt").style.backgroundColor = "#00000000";
    document.getElementById("categories").style.display = "none";
    var selected_cat = searchParams.get("selected_category");
    // alert(selected_cat);
    if (selected_cat) {
      setSelectedCategory(selected_cat);

      setTimeout(() => {
        document
          .getElementById("listing")
          .scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, []);
  useEffect(() => {
    var url = "http://localhost:5000/listing";
    if (selectedCategory) {
      url = `http://localhost:5000/listing/category/${selectedCategory}`;
    }
    if (query) {
      url = `http://localhost:5000/listing/search/${query}?selected_category=${selectedCategory}`;
    }
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCategory, query]);
  return (
    <>
      <UserContext.Provider
        value={{ selectedCategory, setSelectedCategory, setQuery }}
      >
        <Navbar />

        <div className="brand">
          <FrontDisplay />
        </div>
        <div className="listings" style={{ marginTop: "30px" }} id="listing">
          {items?.map((item) =>
            item.stock == 0 ? (
              <></>
            ) : (
              <a href={`/details/${item.listing_id}`}>
                <Card
                  name={item.title}
                  image={`http://localhost:5000/uploads/${item.image_path}`}
                  price={item.price}
                />
              </a>
            )
          )}
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
