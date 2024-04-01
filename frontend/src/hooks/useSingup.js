import { useState } from "react"
import { useAuth } from "../contexts/AuthContext.jsx"
import { message } from "antd"

const useSignup = () => {
    const { login } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const registerUser = async (values) => {
        if (values.password !== values.passwordConfirm) {
            return setError("La contraseña no es la misma")
        }

        try {
            setError(null)
            setLoading(true)

            const res = await fetch(import.meta.env.VITE_APP_API_URL_SIGNUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            const data = await res.json()

            if (res.status === 201) {
                message.success(data.message)
                login(data.toke, data.user)

            } else if (res.status === 400) {
                setError(data.message)

            } else {
                message.error('Error al registrar')

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