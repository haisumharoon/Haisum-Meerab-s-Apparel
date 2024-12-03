import { useContext, useRef } from "react";
import "./Searchbar.css";
import UserContext from "../../../Context/Context";

const Searchbar = () => {
  const searchRef = useRef();
  const hell = useContext(UserContext);
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        console.log(hell);
        hell.setQuery(searchRef.current.value);
      }}
    >
      <input
        class="input"
        ref={searchRef}
        name="text"
        placeholder="Search..."
        type="search"
      ></input>
    </form>
  );
};
export default Searchbar;
