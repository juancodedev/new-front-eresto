import type React from "react"
import { createContext, useContext } from "react"
import { useAuth } from "../../hooks/use-auth"
import { LoginForm } from "../../components/auth/login-form"

const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null)

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider")
    }
    return context
}

export function AuthProvider({ children }: { readonly children: React.ReactNode }) {
    const auth = useAuth()

    if (!auth.user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoginForm onLogin={auth.login} />
            </div>
        )
    }

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

