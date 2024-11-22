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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="#fff"
              class="bi bi-cart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
          </li>
          <li></li>
          <li>
            <a
              href={isLoggedIn ? "#" : "./login"}
              onMouseEnter={() => {
                setShowDD(true);
              }}
              onMouseLeave={() => {
                setShowDD(false);
              }}
            >
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

            <Dropdown
              options={[
                {
                  title: "Log out",
                  svg: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                      />
                    </svg>
                  ),
                  clickListener: () => {
                    localStorage.removeItem("jwtToken");
                    window.location.href = "/login";
                  },
                },
              ]}
              showDD={showDD}
              setShowDD={setShowDD}
            />
          </li>
        </ul>
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;
