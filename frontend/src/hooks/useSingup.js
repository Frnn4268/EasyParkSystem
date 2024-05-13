import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { message } from "antd";
import { notification } from "antd";

const useSignup = () => {
    const { login } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const openNotificationError = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };

    const registerUser = async (values) => {
        if (values.password !== values.passwordConfirm) {
            return setError("La contraseña no es la misma")
        }

        try {
            setError(null)
            setLoading(true)

            const userData = { ...values, active: true } 

            const res = await fetch(import.meta.env.VITE_APP_API_URL_SIGNUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            const data = await res.json()

            if (res.status === 201) {
                message.success(data.message);
                login(data.token, data.user);

            } else if (res.status === 400) {
                setError(data.message);

            } else if (res.status === 403) {
                setError(data.message);
                openNotificationError('warning', 'Error al registrar: ', data.message);
            } else {
                message.error('Error al registrar');

            }
        } catch(error) {
            message.error('Error al registrar')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, registerUser }
}

export default useSignup