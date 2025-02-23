import { Loader2 } from 'lucide-react'

interface LoaderProps {
    children?: React.ReactNode
}

export function Loader({ children }: LoaderProps) {
    return (
        <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            {children && <p>{children}</p>}
        </div>
    )
}