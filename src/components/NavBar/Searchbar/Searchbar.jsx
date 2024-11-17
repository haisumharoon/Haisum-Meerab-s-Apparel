import { useRef } from "react";
import "./Searchbar.css";

const Searchbar = () => {
  const searchRef = useRef();
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
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
