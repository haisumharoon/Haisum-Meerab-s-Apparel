import "./CategoryList.css";
const CategoryList = ({ sub_cat }) => {
  return (
    <div className="list-container">
      <div className="cat_name">{sub_cat?.name}</div>
      <ul className="subcats">
        {sub_cat?.sub_categories?.map((subsubsub) => (
          <li>{subsubsub}</li>
        ))}
      </ul>
    </div>
  );
};
export default CategoryList;
