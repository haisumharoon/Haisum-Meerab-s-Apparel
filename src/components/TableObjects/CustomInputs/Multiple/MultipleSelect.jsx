import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect, useState } from "react";

const MultipleSelect = ({
  name,
  setName,
  setId,
  objects,
  defining_prop,
  id_prop,
  descriptive_prop,
}) => {
  return (
    <select
      style={{ padding: "10px", minWidth: "325px" }}
      onChange={(e) => {
        setName(
          objects.find((obj) => obj[id_prop] == e.target.value)[defining_prop] +
            " (" +
            objects.find((obj) => obj[id_prop] == e.target.value)[
              descriptive_prop
            ] +
            ")"
        );
        setId(e.target.value);
      }}
    >
      <option value={""}></option>
      {objects?.map((obj) => (
        <option value={obj[id_prop]}>
          {obj[defining_prop]}{" "}
          {descriptive_prop ? "(" + obj[descriptive_prop] + ")" : ""}
        </option>
      ))}
    </select>
  );
};
export default MultipleSelect;
