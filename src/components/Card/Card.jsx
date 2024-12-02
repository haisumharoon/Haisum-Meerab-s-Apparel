import { useState } from "react";
import "./Card.css";
const Card = ({ image, name, price, ...props }) => {
  return (
    <>
      <div className="cardCont" {...props}>
        <img src={image} className="image" />
        <div className="name">{name} </div>
        <div className="price">{price} PKR</div>
      </div>
    </>
  );
};
export default Card;
