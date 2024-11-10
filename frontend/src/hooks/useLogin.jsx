import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import "../css/Auth.css";

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      placement: "top",
    });
  };

  const openNotificationError = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        openNotification("success", "Bienvenido a EasyPark", data.message);
        login(data.toke, data.user);
      } else if (res.status === 403) {
        setError(data.message);
        openNotificationError(
          "warning",
          "Error al iniciar sesión: ",
          data.message
        );
      } else if (res.status === 404) {
        setError(data.message);
        openNotificationError(
          "warning",
          "Error al iniciar sesión: ",
          data.message
        );
      } else {
        openNotificationError(
          "error",
          "Error al iniciar sesión: ",
          "Ocurrió un error al intentar iniciar sesión."
        );
      }
    } catch (error) {
      openNotificationError(
        "error",
        "Error al iniciar sesión: ",
        "Ocurrió un error al intentar iniciar sesión."
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;
