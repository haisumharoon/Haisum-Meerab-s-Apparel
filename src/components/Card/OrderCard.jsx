import { useEffect, useState } from "react";
import "./OrderCard.css";
import axios from "axios";
import { useLocalStorage } from "@uidotdev/usehooks";
const OrderCard = ({ order, admin }) => {
  const [listingDetails, setListingDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/listing/${order.listing_id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        setListingDetails(res.data);
      });
    axios
      .get(`http://localhost:5000/user/${order.user_id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        setUserDetails(res.data[0]);
        console.log(res.data);
      });
  }, [order]);
  return (
    <div className="card-cont">
      <div className="row">
        <img
          src={`http://localhost:5000/uploads/${listingDetails.image_path}`}
          className="listing-image"
        />
        <div className="column">
          <a href={`/details/${listingDetails.listing_id}`} className="title">
            {listingDetails.title}
          </a>
          <div className="amount">Quantity: {order.amount}</div>
          <div className="row">
            <div className="price">
              {order.amount * listingDetails.price} PKR
            </div>
            <div className="price">bought by: {userDetails.name}</div>
          </div>
        </div>
      </div>
      {admin ? (
        <button
          className="finish-order"
          onClick={() => {
            axios
              .delete(`http://localhost:5000/order/${order.order_id}`, {
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                },
              })
              .then((res) => {
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          finish order
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};
export default OrderCard;
