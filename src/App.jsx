import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import Card from "./components/Card/Card";

function App() {
  const [count, setCount] = useState(0);
  const items = [
    {
      images: [
        "https://www.nameerabyfarooq.com/cdn/shop/files/RoyalPakistaniBridalDressinDeepRedSareeStyle_620x.jpg?v=1689541628",
        "https://dyot.pk/image/cache/catalog/Saree/IMG_3436-2000x2000.jpg",
        "https://www.nameerabyfarooq.com/cdn/shop/files/RoyalPakistaniBridalDressinDeepRedSareeStyle_620x.jpg?v=1689541628",
        "https://dyot.pk/image/cache/catalog/Saree/IMG_3436-2000x2000.jpg",
      ],
      title: "red saree",
      description: "red saree",
      price: "10000",
      rating: 4.32,
    },
    {
      images: [
        "https://faashwear.com/wp-content/uploads/2022/02/7b4335ba-7a3f-4e6a-8eb5-c3165faaed47.jpg",

        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoP2PaWSPzLu1aDw6OvsGNRX1NG9fgMK0lBg&s",
      ],
      title: "green saree",
      description: "asdioasdjas asd asd ",
      price: "1000",
      rating: 3.92,
    },
    {
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzvFwmrgRbStLRQjisJeirHMo2nbCbIzO7Dw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnA8J2k_B2tzInUHzjCdxYpmpsls4wIQ9p4g&s",
      ],
      title: "blue saree",
      description: "this is a serious description",
      price: "60000",
      rating: 4.99,
    },
    {
      images: [
        "https://www.nameerabyfarooq.com/cdn/shop/files/RoyalPakistaniBridalDressinDeepRedSareeStyle_620x.jpg?v=1689541628",
        "https://dyot.pk/image/cache/catalog/Saree/IMG_3436-2000x2000.jpg",
        "https://www.nameerabyfarooq.com/cdn/shop/files/RoyalPakistaniBridalDressinDeepRedSareeStyle_620x.jpg?v=1689541628",
        "https://dyot.pk/image/cache/catalog/Saree/IMG_3436-2000x2000.jpg",
      ],
      title: "red saree",
      description: "red saree",
      price: "10000",
      rating: 4.32,
    },
    {
      images: [
        "https://faashwear.com/wp-content/uploads/2022/02/7b4335ba-7a3f-4e6a-8eb5-c3165faaed47.jpg",

        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoP2PaWSPzLu1aDw6OvsGNRX1NG9fgMK0lBg&s",
      ],
      title: "green saree",
      description: "asdioasdjas asd asd ",
      price: "1000",
      rating: 3.92,
    },
    {
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzvFwmrgRbStLRQjisJeirHMo2nbCbIzO7Dw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnA8J2k_B2tzInUHzjCdxYpmpsls4wIQ9p4g&s",
      ],
      title: "blue saree",
      description: "this is a serious description",
      price: "60000",
      rating: 4.99,
    },
    {
      images: [
        "https://www.nameerabyfarooq.com/cdn/shop/files/RoyalPakistaniBridalDressinDeepRedSareeStyle_620x.jpg?v=1689541628",
        "https://dyot.pk/image/cache/catalog/Saree/IMG_3436-2000x2000.jpg",
        "https://www.nameerabyfarooq.com/cdn/shop/files/RoyalPakistaniBridalDressinDeepRedSareeStyle_620x.jpg?v=1689541628",
        "https://dyot.pk/image/cache/catalog/Saree/IMG_3436-2000x2000.jpg",
      ],
      title: "red saree",
      description: "red saree",
      price: "10000",
      rating: 4.32,
    },
    {
      images: [
        "https://faashwear.com/wp-content/uploads/2022/02/7b4335ba-7a3f-4e6a-8eb5-c3165faaed47.jpg",

        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoP2PaWSPzLu1aDw6OvsGNRX1NG9fgMK0lBg&s",
      ],
      title: "green saree",
      description: "asdioasdjas asd asd ",
      price: "1000",
      rating: 3.92,
    },
    {
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzvFwmrgRbStLRQjisJeirHMo2nbCbIzO7Dw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnA8J2k_B2tzInUHzjCdxYpmpsls4wIQ9p4g&s",
      ],
      title: "blue saree",
      description: "this is a serious description",
      price: "60000",
      rating: 4.99,
    },
    {
      images: [
        "https://www.nameerabyfarooq.com/cdn/shop/files/RoyalPakistaniBridalDressinDeepRedSareeStyle_620x.jpg?v=1689541628",
        "https://dyot.pk/image/cache/catalog/Saree/IMG_3436-2000x2000.jpg",
        "https://www.nameerabyfarooq.com/cdn/shop/files/RoyalPakistaniBridalDressinDeepRedSareeStyle_620x.jpg?v=1689541628",
        "https://dyot.pk/image/cache/catalog/Saree/IMG_3436-2000x2000.jpg",
      ],
      title: "red saree",
      description: "red saree",
      price: "10000",
      rating: 4.32,
    },
    {
      images: [
        "https://faashwear.com/wp-content/uploads/2022/02/7b4335ba-7a3f-4e6a-8eb5-c3165faaed47.jpg",

        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoP2PaWSPzLu1aDw6OvsGNRX1NG9fgMK0lBg&s",
      ],
      title: "green saree",
      description: "asdioasdjas asd asd ",
      price: "1000",
      rating: 3.92,
    },
    {
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzvFwmrgRbStLRQjisJeirHMo2nbCbIzO7Dw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnA8J2k_B2tzInUHzjCdxYpmpsls4wIQ9p4g&s",
      ],
      title: "blue saree",
      description: "this is a serious description",
      price: "60000",
      rating: 4.99,
    },
    {
      images: [
        "https://www.nameerabyfarooq.com/cdn/shop/files/RoyalPakistaniBridalDressinDeepRedSareeStyle_620x.jpg?v=1689541628",
        "https://dyot.pk/image/cache/catalog/Saree/IMG_3436-2000x2000.jpg",
        "https://www.nameerabyfarooq.com/cdn/shop/files/RoyalPakistaniBridalDressinDeepRedSareeStyle_620x.jpg?v=1689541628",
        "https://dyot.pk/image/cache/catalog/Saree/IMG_3436-2000x2000.jpg",
      ],
      title: "red saree",
      description: "red saree",
      price: "10000",
      rating: 4.32,
    },
    {
      images: [
        "https://faashwear.com/wp-content/uploads/2022/02/7b4335ba-7a3f-4e6a-8eb5-c3165faaed47.jpg",

        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoP2PaWSPzLu1aDw6OvsGNRX1NG9fgMK0lBg&s",
      ],
      title: "green saree",
      description: "asdioasdjas asd asd ",
      price: "1000",
      rating: 3.92,
    },
    {
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzvFwmrgRbStLRQjisJeirHMo2nbCbIzO7Dw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnA8J2k_B2tzInUHzjCdxYpmpsls4wIQ9p4g&s",
      ],
      title: "blue saree",
      description: "this is a serious description",
      price: "60000",
      rating: 4.99,
    },
  ];
  return (
    <>
      <Navbar />

      <img src="HAISUM.jpg" className="brand" />
      <div className="listings">
        {items.map((item) => (
          <Card
            name={item.title}
            images={item.images}
            desc={item.description}
            rating={item.rating}
            price={item.price}
          />
        ))}
      </div>
    </>
  );
}

export default App;
