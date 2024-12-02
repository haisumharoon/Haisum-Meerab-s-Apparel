import MultipleSelect from "./MultipleSelect";
import "./Multiple.css";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
const Multiple = ({
  name,
  setId,
  inputs,
  url,
  defining_prop,
  descriptive_prop,
  id_prop,
}) => {
  const [names, setNames] = useState([]);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (inputs.hasOwnProperty(name) && Array.isArray(inputs[name])) {
      console.log(inputs[name]);
      setNames(
        inputs[name]?.map((id) => {
          return `${
            objects.find((obj) => obj[id_prop] == id)[defining_prop]
          } (${objects.find((obj) => obj[id_prop] == id)[descriptive_prop]})`;
        })
      );
    } else {
      setNames([]);
    }
  }, [inputs]);
  return (
    <div className="selected">
      <div className="items">
        Selected Items:
        {names.map((naam) => (
          <div
            className="selected-item"
            onClick={() => {
              setNames(names.filter((n) => n !== naam));
              console.log(objects);
              console.log(naam);
              objects.map((obj) => {
                if (
                  `${obj[defining_prop]} (${obj[descriptive_prop]})` == naam
                ) {
                  var inputArr = inputs[name];
                  inputArr = inputArr.filter((i) => i != obj[id_prop]);
                  setId((objs) => ({
                    ...objs,
                    [name]: inputArr,
                  }));
                }
              });
            }}
          >
            {naam}
          </div>
        ))}
      </div>
      <MultipleSelect
        name={name}
        id_prop={id_prop}
        objects={objects}
        setName={(naam) => {
          if (naam === "") {
            return;
          }
          if (names.includes(naam)) {
            return;
          }
          setNames([...names, naam]);
        }}
        setId={(id) => {
          var objName = objects.find((obj) => obj[id_prop] == id)[
            defining_prop
          ];
          if (
            names.includes(
              `${objName} (${
                objects.find((obj) => obj[id_prop] == id)[descriptive_prop]
              })`
            )
          ) {
            return;
          }
          setId((obj) => ({ ...obj, [name]: [...obj[name], id] }));
        }}
        url={url}
        defining_prop={defining_prop}
        descriptive_prop={descriptive_prop}
      />
    </div>
  );
};
export default Multiple;
