import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useState } from "react";
import TableObjects from "./components/TableObjects/TableObjects";
import "./Admin.css";
import OrderCard from "./components/Card/OrderCard";
const Admin = () => {
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  const [orders, setOrders] = useState([]);
  const verifyUser = async () => {
    if (!jwtToken) {
      window.location.href = "/login";
      return;
    }
    axios
      .get("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          if (res.data.user.isAdmin != 1) {
            window.location.href = "/";
            return;
          }
        }
      })
      .catch((err) => {
        window.location.href = "/";
      });
  };
  useEffect(() => {
    verifyUser();
    axios
      .get("http://localhost:5000/all_orders", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="section-head">
        Orders{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-list-check"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"
          />
        </svg>
      </div>
      <div className="orders">
        {orders.map((order) => (
          <OrderCard order={order} admin={true} />
        ))}
      </div>
      <div className="section-head">
        Tables{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-database"
          viewBox="0 0 16 16"
        >
          <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313M13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A5 5 0 0 0 13 5.698M14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A5 5 0 0 0 13 8.698m0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525" />
        </svg>
      </div>
      <div className="models">
        <TableObjects
          table_title={"Customer Categories"}
          url={"http://localhost:5000/customer-categories"}
          attributes={[{ name: "name", type: "text" }]}
          defining_property={"name"}
          id_name={"cc_id"}
        />
        <TableObjects
          table_title={"Categories"}
          url={"http://localhost:5000/categories"}
          attributes={[
            { name: "name", type: "text" },
            {
              name: "cc_id",
              type: "select",
              url: "http://localhost:5000/customer-categories",
              defining_prop: "name",
            },
          ]}
          defining_property={"name"}
          id_name={"category_id"}
          description_property={"parent_description"}
        />
        <TableObjects
          table_title={"Sub categories"}
          url={"http://localhost:5000/sub-categories"}
          description_property={"parent_description"}
          attributes={[
            { name: "name", type: "text" },
            {
              name: "category_id",
              type: "select",
              url: "http://localhost:5000/categories",
              defining_prop: "name",
              descriptive_prop: "parent_description",
            },
          ]}
          defining_property={"name"}
          id_name={"sub_category_id"}
        />
        <TableObjects
          table_title={"Users"}
          description_property={"username"}
          url={"http://localhost:5000/users"}
          attributes={[
            { name: "name", type: "text" },
            { name: "email", type: "email" },
            { name: "password", type: "text" },
            { name: "username", type: "text" },
            { name: "isAdmin", type: "checkbox" },
          ]}
          defining_property={"name"}
          id_name={"credential_id"}
        />
        <TableObjects
          table_title={"Listings"}
          // description_property={""}
          url={"http://localhost:5000/admin/listing"}
          attributes={[
            { name: "title", type: "text" },
            { name: "stock", type: "number" },
            { name: "price", type: "text" },
            { name: "file", type: "file" },
            {
              name: "sub_categories",
              type: "multiple",
              url: "http://localhost:5000/sub-categories",
              defining_prop: "name",
              id_prop: "sub_category_id",
              descriptive_prop: "parent_description",
            },
          ]}
          defining_property={"title"}
          id_name={"listing_id"}
        />
      </div>
    </>
  );
};

export default Admin;
