import { useContext } from "react";
import UserContext from "../../../../../Context/Context";
import "./CategoryList.css";
const CategoryList = ({ sub_cat }) => {
  const { selectedCategory, setSelectedCategory } = useContext(UserContext);
  return (
    <div className="list-container">
      <div className="cat_name">{sub_cat?.name}</div>
      <ul className="subcats">
        {sub_cat?.sub_categories?.map((subsubsub) => (
          <li
            className="subcat"
            onClick={() => {
              setSelectedCategory(subsubsub.sub_category_id);
            }}
          >
            {subsubsub.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CategoryList;
