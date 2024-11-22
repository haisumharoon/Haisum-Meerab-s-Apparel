import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import { useEffect } from "react";

const Admin = () => {
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  const verifyUser = async () => {
    if (!jwtToken) {
      window.location.href = "/login";
      return;
    }
    console.log(jwtToken);
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
  return <div className="models"></div>;
};

export default Admin;
