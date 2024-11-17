import CategoryList from "./CategoryList/CategoryList";

const Subcategories = ({ category }) => {
  return (
    <div className="categorylist">
      {category?.sub_categories?.map((sub) => (
        <CategoryList sub_cat={sub} />
      ))}
    </div>
  );
};
export default Subcategories;
