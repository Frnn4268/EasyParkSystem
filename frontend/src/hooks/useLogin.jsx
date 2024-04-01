import { useState } from "react"
import { useAuth } from "../contexts/AuthContext.jsx"
import { message } from "antd"

const useLogin = () => {
    const { login } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const loginUser = async (values) => {
        try {
            setError(null)
            setLoading(true)

            const res = await fetch(import.meta.env.VITE_APP_API_URL_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            const data = await res.json()

            if (res.status === 200) {
                message.success(data.message)
                login(data.toke, data.user)

            } else if (res.status === 404) {
                setError(data.message)

            } else {
                message.error('Error al iniciar sesión')

            }
        } catch(error) {
            message.error('Error al iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, loginUser }
}

export default useLogin