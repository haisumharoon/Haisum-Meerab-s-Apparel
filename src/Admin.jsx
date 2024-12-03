import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect } from "react";
import TableObjects from "./components/TableObjects/TableObjects";
import "./Admin.css";
const Admin = () => {
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
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
  }, []);
  return (
    <>
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
      <div className="orders-container">
        <button className="orders">View Orders</button>
      </div>
    </>
  );
};

export default Admin;
