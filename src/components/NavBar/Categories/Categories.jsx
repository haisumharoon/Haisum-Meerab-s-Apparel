import { useState } from "react";
import "./Categories.css";
import Subcategories from "./Subcategories/Subcategories";

const Categories = () => {
  const [currentCategory, setCurrentCategory] = useState({});
  const categories = [
    {
      name: "men",
      sub_categories: [
        {
          name: "Fragrances",
          sub_categories: ["Eau de Toilette", "Eau de Parfum", "Cologne"],
        },
        {
          name: "Unstiched",
          sub_categories: ["Kurta", "Shalvar Kameez", "formal", "casual"],
        },
      ],
    },
    {
      name: "women",
      sub_categories: [
        {
          name: "Shirts",
          sub_categories: ["winter", "summer", "formal", "casual"],
        },
        {
          name: "Women Wear",
          sub_categories: ["velvet", "glam", "formal", "casual"],
        },
      ],
    },
    {
      name: "girls",
      sub_categories: [
        {
          name: "Frocks",
          sub_categories: ["winter", "summer", "formal", "casual"],
        },
        {
          name: "Tops",
          sub_categories: ["winter", "summer", "formal", "casual"],
        },
      ],
    },
    {
      name: "boys",
      sub_categories: [
        {
          name: "Shirts",
          sub_categories: ["winter", "summer", "formal", "casual"],
        },
        {
          name: "Trousers",
          sub_categories: ["winter", "summer", "formal", "casual"],
        },
      ],
    },
  ];
  return (
    <>
      <div className="categories">
        {categories.map((category) => (
          <div
            className="item"
            onMouseEnter={() => {
              setCurrentCategory(category);
            }}
            onMouseLeave={() => {
              setCurrentCategory({});
            }}
          >
            {category.name}
          </div>
        ))}
      </div>
      {currentCategory && <Subcategories category={currentCategory} />}
    </>
  );
};
export default Categories;
