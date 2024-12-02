import { useContext, useEffect, useState } from "react";
import "./Categories.css";
import Subcategories from "./Subcategories/Subcategories";
import axios from "axios";
import UserContext from "../../../Context/Context";

const Categories = () => {
  const [subVisible, setSubVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const { selectedCategory, setSelectedCategory } = useContext(UserContext);
  useEffect(() => {
    axios.get("http://localhost:5000/all_categories").then((res) => {
      setCategories(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <div className="categories">
        {categories?.map((category) => (
          <div
            className="item"
            onMouseEnter={() => {
              setCurrentCategory(category);
              setSubVisible(true);
            }}
            onMouseLeave={() => {
              setSubVisible(false);
            }}
          >
            {category.name}
          </div>
        ))}
        <div
          className="item"
          onClick={() => {
            setSelectedCategory("");
          }}
        >
          All
        </div>
      </div>
      <div id="subcategories" style={subVisible ? { display: "block" } : {}}>
        <Subcategories category={currentCategory} />
      </div>
    </>
  );
};
export default Categories;
