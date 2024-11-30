import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useState } from "react";

const Select = ({
  name,
  setValueInObject,
  valueInObject,
  url,
  defining_prop,
  descriptive_prop,
}) => {
  const [objects, setObjects] = useState([]);
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        setObjects(res.data);

        setValueInObject((values) => ({
          ...values,
          [name]: "",
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <select
      style={{ padding: "10px", minWidth: "325px" }}
      value={valueInObject[name]}
      required
      onChange={(e) => {
        setValueInObject((values) => ({ ...values, [name]: e.target.value }));
      }}
    >
      <option value={""}></option>
      {objects?.map((obj) => (
        <option value={obj[name]}>
          {obj[defining_prop]}{" "}
          {descriptive_prop ? "(" + obj[descriptive_prop] + ")" : ""}
        </option>
      ))}
    </select>
  );
};
export default Select;
