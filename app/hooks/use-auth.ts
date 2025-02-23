import { useState, useEffect } from "react"
import { loginApi } from '../api/user'

interface User {
    username: string
    accessToken: string
    refreshToken: string
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)

    const login = async (username: string, password: string) => {
        // En un escenario real, aquí se haría una llamada a la API
        const response = await loginApi(username, password)

        if (response) {
            const user = { 
                username, 
                accessToken: response.access, 
                refreshToken: response.refresh 
            }
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

