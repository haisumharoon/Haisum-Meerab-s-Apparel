import axios from "axios";
import "./TableObjects.css";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import Modal from "./Modal/Modal";
import Select from "./CustomInputs/Select";
import CheckBox from "./CustomInputs/CheckBox";

const TableObjects = ({
  url,
  id_name,
  defining_property,
  table_title,
  attributes,
  description_property,
}) => {
  const [objects, setObjects] = useState([]);
  const [error, setError] = useState("");
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const getObjects = () => {
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
  };
  useEffect(() => {
    getObjects();
  }, []);
  return (
    <>
      <div className="table-cont">
        <div
          className="table-object"
          style={{
            justifyContent: "center",
            backgroundColor: "rgb(31, 156, 214)",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          <div className="table-title">
            {table_title}{" "}
            <svg
              onClick={() => {
                var obj = {};
                attributes?.map((attr) => {
                  obj[attr.name] = "";
                });
                setInputs(obj);
                setIsModalOpen(true);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-database-add"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0" />
              <path d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4" />
            </svg>
          </div>
        </div>
        <div className="table-object">
          <div className="table-object-row">
            <div className="table-object-key">{"id"}</div>
          </div>
          <div className="table-object-row">
            <div className="table-object-key">{defining_property}</div>
          </div>
        </div>
        <div className="list-scroll">
          {objects?.map((object) => {
            return (
              <div
                className="table-object object"
                onClick={() => {
                  attributes?.map((attr) => {
                    setInputs((values) => ({
                      ...values,
                      [attr.name]: object[attr.name],
                    }));
                  });
                  setInputs((values) => ({
                    ...values,
                    [id_name]: object[id_name],
                  }));
                  setIsSelectModalOpen(true);
                }}
              >
                <div className="table-object-row">
                  <div className="table-object-value">{object[id_name]}</div>
                </div>
                <div className="table-object-row ">
                  <div className="table-object-value">
                    {object[defining_property]}
                  </div>
                  {description_property ? (
                    <div className="table-object-desc">
                      {object[description_property]}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            var formData = new FormData();
            for (var key in inputs) {
              formData.append(key, inputs[key]);
            }
            axios
              .post(url, formData, {
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                  Accept: "form-data",
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                location.reload();
              })
              .catch((err) => {
                console.log(err);
                setError(err.response.data.message);
              });
          }}
        >
          {Array.isArray(attributes) &&
            attributes.map((attr) => {
              return (
                <div className="field">
                  <label className="label">{attr.name}</label>
                  <div className="control">
                    {attr.type == "select" ? (
                      <Select
                        name={attr.name}
                        setValueInObject={setInputs}
                        valueInObject={inputs}
                        url={attr.url}
                        descriptive_prop={attr.descriptive_prop}
                        defining_prop={attr.defining_prop}
                      />
                    ) : attr.type == "checkbox" ? (
                      <CheckBox
                        valueInObject={inputs}
                        setValueInObject={setInputs}
                        name={attr.name}
                      />
                    ) : attr.type == "textarea" ? (
                      <textarea
                        className="forminput"
                        name={attr.name}
                        rows={5}
                        value={inputs[attr.name]}
                        onChange={handleChange}
                      />
                    ) : attr.type == "file" ? (
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => {
                          setInputs((values) => ({
                            ...values,
                            file: e.target.files[0],
                          }));
                        }}
                      />
                    ) : (
                      <input
                        className="forminput"
                        type={attr.type}
                        name={attr.name}
                        value={inputs[attr.name]}
                        onChange={handleChange}
                        required
                      />
                    )}
                  </div>
                </div>
              );
            })}
          <div className="error">{error}</div>
          <button className="formButton" type="submit">
            Add Item
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={isSelectModalOpen}
        onClose={() => {
          setIsSelectModalOpen(false);
        }}
      >
        {attributes?.map((attr, index) => {
          return (
            <div className="field">
              <label className="label">{attr.name}</label>
              <div className="control">
                {attr.type == "select" ? (
                  <Select
                    name={attr.name}
                    setValueInObject={setInputs}
                    descriptive_prop={attr.descriptive_prop}
                    valueInObject={inputs}
                    url={attr.url}
                    defining_prop={attr.defining_prop}
                  />
                ) : attr.type == "checkbox" ? (
                  <CheckBox
                    valueInObject={inputs}
                    setValueInObject={setInputs}
                    name={attr.name}
                  />
                ) : attr.type == "textarea" ? (
                  <textarea
                    // className="forminput"
                    name={attr.name}
                    value={inputs[attr.name]}
                    onChange={handleChange}
                  ></textarea>
                ) : attr.type == "file" ? (
                  <input
                    type="file"
                    onChange={(e) => {
                      setInputs((values) => ({
                        ...values,
                        file: e.target.files[0],
                      }));
                    }}
                  />
                ) : (
                  <input
                    className="forminput"
                    type={attr.type}
                    name={attr.name}
                    value={inputs[attr.name]}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            </div>
          );
        })}
        <div className="error">{error}</div>
        <div className="action-buttons">
          <button
            style={{ backgroundColor: "#c78c20" }}
            className="formButton"
            onClick={() => {
              var formData = new FormData();
              for (var key in inputs) {
                formData.append(key, inputs[key]);
              }
              axios
                .put(`${url}/${inputs[id_name]}`, formData, {
                  headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    "Content-Type": "multipart/form-data",
                    Accept: "form-data",
                  },
                })
                .then((res) => {
                  location.reload();
                })
                .catch((err) => {
                  console.log(err);
                  setError(err.response.data.message);
                });
            }}
          >
            Edit
          </button>
          <button
            className="formButton"
            style={{ backgroundColor: "red" }}
            onClick={() => {
              axios
                .delete(`${url}/${inputs[id_name]}`, {
                  headers: {
                    Authorization: `Bearer ${jwtToken}`,
                  },
                })
                .then((res) => {
                  location.reload();
                })
                .catch((err) => {
                  setError(err.response.data.message);
                });
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TableObjects;
