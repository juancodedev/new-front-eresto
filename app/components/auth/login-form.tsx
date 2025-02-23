import type React from "react"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

interface LoginFormProps {
    onLogin: (username: string, password: string) => boolean
}

export function LoginForm({ onLogin }: Readonly<LoginFormProps>) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const success = onLogin(username, password)
        if (!success) {
            setError("Usuario o contraseña incorrectos")
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Iniciar Sesión</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" className="w-full">
                        Iniciar Sesión
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

