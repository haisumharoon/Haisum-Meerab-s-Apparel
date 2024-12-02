import React, { useRef, useState } from "react";
import "./Navbar.css"; // We'll create this CSS file for styling
import Searchbar from "./Searchbar/Searchbar";
import Categories from "./Categories/Categories";
import Dropdown from "./Dropdown/Dropdown";

const Navbar = ({ isLoggedIn }) => {
  const [showDD, setShowDD] = useState(false);
  const navbar_ref = useRef();
  let prevScrollPos = window.pageYOffset; // Store the initial scroll position

  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset; // Get the current scroll position
    let navbar = navbar_ref.current; // Get the navbar element

    if (prevScrollPos > currentScrollPos) {
      // Scrolling up, show navbar
      navbar.style.top = "0";
    } else {
      // Scrolling down, hide navbar
      navbar.style.top = "-80px";
    }

    prevScrollPos = currentScrollPos; // Update the previous scroll position
  };
  return (
    <nav className="navbar" ref={navbar_ref}>
      <div className="navbar-top">
        <div className="logo">
          <Searchbar />
        </div>
        <ul className="nav-links">
          <li>
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                class="bi bi-house-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="/wishlist">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                class="bi bi-bag-heart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
              </svg>
            </a>
          </li>
          <li>
            <a href={isLoggedIn ? "#" : "./login"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="#fff"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;
