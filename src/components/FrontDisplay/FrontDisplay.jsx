import { useEffect, useState } from "react";
import "./FrontDisplay.css";
const FrontDisplay = () => {
  const frontDisplayImages = [
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_59bd3a02-4617-45ff-84b7-53a62ef8123e.jpg?v=1731059817",
    "https://www.mushq.pk/cdn/shop/files/Desktop_Banner_copy1.jpg?v=1721998556",
    "https://www.mushq.pk/cdn/shop/files/web_banner_d219ab20-a657-4318-bf1b-7f5a56b4f7fc.jpg?v=1732596518",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_d1370767-fc5c-409d-a650-7b37b74aafda.jpg?v=1730878485",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_59bd3a02-4617-45ff-84b7-53a62ef8123e.jpg?v=1731059817",
    "https://www.mushq.pk/cdn/shop/files/Desktop_Banner_copy1.jpg?v=1721998556",
    "https://www.mushq.pk/cdn/shop/files/web_banner_d219ab20-a657-4318-bf1b-7f5a56b4f7fc.jpg?v=1732596518",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_d1370767-fc5c-409d-a650-7b37b74aafda.jpg?v=1730878485",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_59bd3a02-4617-45ff-84b7-53a62ef8123e.jpg?v=1731059817",
    "https://www.mushq.pk/cdn/shop/files/Desktop_Banner_copy1.jpg?v=1721998556",
    "https://www.mushq.pk/cdn/shop/files/web_banner_d219ab20-a657-4318-bf1b-7f5a56b4f7fc.jpg?v=1732596518",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_d1370767-fc5c-409d-a650-7b37b74aafda.jpg?v=1730878485",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_59bd3a02-4617-45ff-84b7-53a62ef8123e.jpg?v=1731059817",
    "https://www.mushq.pk/cdn/shop/files/Desktop_Banner_copy1.jpg?v=1721998556",
    "https://www.mushq.pk/cdn/shop/files/web_banner_d219ab20-a657-4318-bf1b-7f5a56b4f7fc.jpg?v=1732596518",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_d1370767-fc5c-409d-a650-7b37b74aafda.jpg?v=1730878485",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_59bd3a02-4617-45ff-84b7-53a62ef8123e.jpg?v=1731059817",
    "https://www.mushq.pk/cdn/shop/files/Desktop_Banner_copy1.jpg?v=1721998556",
    "https://www.mushq.pk/cdn/shop/files/web_banner_d219ab20-a657-4318-bf1b-7f5a56b4f7fc.jpg?v=1732596518",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_d1370767-fc5c-409d-a650-7b37b74aafda.jpg?v=1730878485",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_59bd3a02-4617-45ff-84b7-53a62ef8123e.jpg?v=1731059817",
    "https://www.mushq.pk/cdn/shop/files/Desktop_Banner_copy1.jpg?v=1721998556",
    "https://www.mushq.pk/cdn/shop/files/web_banner_d219ab20-a657-4318-bf1b-7f5a56b4f7fc.jpg?v=1732596518",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_d1370767-fc5c-409d-a650-7b37b74aafda.jpg?v=1730878485",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_59bd3a02-4617-45ff-84b7-53a62ef8123e.jpg?v=1731059817",
    "https://www.mushq.pk/cdn/shop/files/Desktop_Banner_copy1.jpg?v=1721998556",
    "https://www.mushq.pk/cdn/shop/files/web_banner_d219ab20-a657-4318-bf1b-7f5a56b4f7fc.jpg?v=1732596518",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_d1370767-fc5c-409d-a650-7b37b74aafda.jpg?v=1730878485",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_59bd3a02-4617-45ff-84b7-53a62ef8123e.jpg?v=1731059817",
    "https://www.mushq.pk/cdn/shop/files/Desktop_Banner_copy1.jpg?v=1721998556",
    "https://www.mushq.pk/cdn/shop/files/web_banner_d219ab20-a657-4318-bf1b-7f5a56b4f7fc.jpg?v=1732596518",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_d1370767-fc5c-409d-a650-7b37b74aafda.jpg?v=1730878485",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_59bd3a02-4617-45ff-84b7-53a62ef8123e.jpg?v=1731059817",
    "https://www.mushq.pk/cdn/shop/files/Desktop_Banner_copy1.jpg?v=1721998556",
    "https://www.mushq.pk/cdn/shop/files/web_banner_d219ab20-a657-4318-bf1b-7f5a56b4f7fc.jpg?v=1732596518",
    "https://www.mushq.pk/cdn/shop/files/WEB-BANNER_d1370767-fc5c-409d-a650-7b37b74aafda.jpg?v=1730878485",
  ];
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => prev + 1);
    }, 3000);
  }, []);
  return (
    <div
      className="fdi-container"
      style={{
        transform: `translateX(-${
          (currentImage % frontDisplayImages.length) * 100
        }%)`,
      }}
    >
      {frontDisplayImages.map((image) => (
        <img src={image} alt="" className="fd-image" />
      ))}
    </div>
  );
};
export default FrontDisplay;
