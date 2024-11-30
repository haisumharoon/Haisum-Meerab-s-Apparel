import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useState } from "react";

const CheckBox = ({ name, setValueInObject, valueInObject }) => {
  return (
    <input
      type="checkbox"
      checked={valueInObject[name]}
      onChange={(e) => {
        if (e.target.checked) {
          setValueInObject((values) => ({ ...values, [name]: 1 }));
        } else {
          setValueInObject((values) => ({ ...values, [name]: 0 }));
        }
      }}
      required
    />
  );
};
export default CheckBox;
