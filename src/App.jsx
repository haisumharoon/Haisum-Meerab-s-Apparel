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

function App() {
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    var selected_cat = searchParams.get("selected_category");
    if (selected_cat) {
      setSelectedCategory(selected_cat);
    }
  }, []);
  useEffect(() => {
    var url = "http://localhost:5000/listing";
    if (selectedCategory) {
      url = `http://localhost:5000/listing/category/${selectedCategory}`;
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
  }, [selectedCategory]);
  return (
    <>
      <UserContext.Provider value={{ selectedCategory, setSelectedCategory }}>
        <Navbar />

        <img src="HAISUM.jpg" className="brand" />
        <div className="listings">
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
