import { useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ options, showDD, setShowDD }) => {
  //   useEffect(() => {
  //     alert(options.length);
  //   }, []);
  return (
    <div
      className="dropdown"
      style={
        showDD
          ? {
              display: "block",
              animation: "ddOpen 0.5s forwards",
            }
          : {
              display: "block",
              animation: "ddClose 0.5s forwards",
            }
      }
      onMouseEnter={() => {
        setShowDD(true);
      }}
      onMouseLeave={() => {
        setShowDD(false);
      }}
    >
      <div className="dropdown-content">
        {options.map((option, index) => {
          return (
            <button
              key={index}
              onClick={option.clickListener}
              className={
                index == 0
                  ? "dropdown-item first-item"
                  : index == options.length - 1
                  ? "dropdown-item last-item"
                  : "dropdown-item"
              }
            >
              {option.svg}
              {option.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Dropdown;
