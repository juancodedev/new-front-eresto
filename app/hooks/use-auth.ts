import { useState, useEffect } from "react"
import { loginApi } from '../api/user'

interface User {
    username: string
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)

    const login = async (username: string, password: string) => {
        // En un escenario real, aquí se haría una llamada a la API
        try {
            const response = await loginApi(username, password)
            console.log(response);
            
        } catch (error) {
            console.log('Error en el login')
            console.log(error)
            
        }

        if (username === "xagustin93@gmail.com" && password === "123456") {
            const user = { username }
            setUser(user)
            localStorage.setItem("user", JSON.stringify(user))
            return true
        }
        return false
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    return { user, login, logout }
}

