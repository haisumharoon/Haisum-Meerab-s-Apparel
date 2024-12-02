import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "./Context/Context";
import "./Details.css";
import Navbar from "./components/NavBar/Navbar";
import Modal from "./components/TableObjects/Modal/Modal";
const Details = () => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [buyDetails, setBuyDetails] = useState({});
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  const [details, setDetails] = useState({});
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setamount] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setBuyDetails({
          ...buyDetails,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
          )
          .then((response) => {
            setLocation(response.data.display_name);
          });
      });
    } else {
      alert("not sip");
    }
  };
  const orderNow = (e) => {
    e.preventDefault();
    if (!buyDetails.latitude || !buyDetails.longitude) {
      setError("please provide current location");
      return;
    }

    axios
      .post(
        `http://localhost:5000/order/${id}`,
        { amount: amount, ...buyDetails },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )

      .then((res) => {
        setModalShow(false);
        getDetails();
        setMessage("Order placed successfully");
      });
  };
  const addToWishlist = () => {
    if (details.wish) {
      axios
        .delete(`http://localhost:5000/wishlist/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setDetails({ ...details, wish: false });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          `http://localhost:5000/wishlist/${id}`,
          { amount: amount },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setDetails({ ...details, wish: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getDetails = () => {
    axios
      .get(`http://localhost:5000/listing/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDetails();
  }, []);
  return (
    <>
      <UserContext.Provider value={{}}>
        <Navbar />
      </UserContext.Provider>
      <div className="complete_container">
        <div className="image-container">
          <img
            id="product-image"
            src={`http://localhost:5000/uploads/${details.image_path}`}
            alt="Product Image"
          />
        </div>
        <div className="item-info">
          <h1 id="product-title">{details.title}</h1>
          <div className="stock">{details.stock} items left in stock</div>
          <div className="categories-list">
            {details?.categories?.map((category) => (
              <a
                href={`/?selected_category=${category.sub_category_id}`}
                className="category"
              >
                {category.name}{" "}
                <div className="cat_desc">{category.parent_description}</div>
              </a>
            ))}
          </div>
          <div
            className="buttons"
            style={{ gap: "0px", marginTop: "130px", marginBottom: "15px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              onClick={() => {
                if (amount > 1) setamount(amount - 1);
              }}
              fill="rgb(31, 156, 214)"
              class="bi bi-caret-left-fill"
              viewBox="0 0 16 16"
            >
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
            <input
              type="number"
              className="number-input"
              value={amount}
              required
              max={details.stock}
              onChange={(e) => {
                setamount(e.target.value);
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              onClick={() => {
                if (amount < details.stock) setamount(amount + 1);
              }}
              fill="rgb(31, 156, 214)"
              class="bi bi-caret-right-fill"
              viewBox="0 0 16 16"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          </div>
          <div className="buttons">
            <button className="btn add-to-cart" onClick={addToWishlist}>
              {details.wish ? "Remove from wishlist" : "Add to wishlist"}
            </button>
            <button
              className="btn buy-now"
              onClick={() => {
                setModalShow(true);
              }}
            >
              Buy Now
            </button>
          </div>
          <div className="message">{message}</div>
        </div>
      </div>
      <Modal
        onClose={() => {
          setModalShow(false);
        }}
        isOpen={modalShow}
      >
        <form action="" className="buy-form" onSubmit={orderNow}>
          <input
            placeholder="Enter full address"
            value={buyDetails.location}
            onChange={(e) => {
              setBuyDetails({ ...buyDetails, location: e.target.value });
            }}
          />
          <button
            type="button"
            className="location-button"
            onClick={getLocation}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </svg>
            Get my current location
          </button>
          <div className="gotten-location">
            {location == "" ? (
              <></>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-check"
                viewBox="0 0 16 16"
              >
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
              </svg>
            )}{" "}
            {location}
          </div>
          <div className="buttons" style={{ gap: "0px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              onClick={() => {
                if (amount > 1) setamount(amount - 1);
              }}
              fill="rgb(31, 156, 214)"
              class="bi bi-caret-left-fill"
              viewBox="0 0 16 16"
            >
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
            <input
              type="number"
              className="number-input"
              value={amount}
              max={details.stock}
              onChange={(e) => {
                setamount(e.target.value);
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              onClick={() => {
                if (amount < details.stock) setamount(amount + 1);
              }}
              fill="rgb(31, 156, 214)"
              class="bi bi-caret-right-fill"
              viewBox="0 0 16 16"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          </div>
          <button type="submit" className="order_now">
            {" "}
            Order now{" "}
          </button>
          <div className="error">{error}</div>
        </form>
      </Modal>
    </>
  );
};

export default Details;
