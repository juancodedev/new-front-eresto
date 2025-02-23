import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
interface HeaderProps {
    userName: string
    userImage?: string
    onLogout: () => void
}

export function Header({ userName, userImage, onLogout }: HeaderProps) {
    // Get initials from user name
    const initials = userName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()

    return (
        <header className="h-16 px-6 border-b bg-white flex items-center justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100">
                        <span className="text-sm font-medium">Hola, {userName}</span>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={userImage} alt={userName} />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={onLogout} className="text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}