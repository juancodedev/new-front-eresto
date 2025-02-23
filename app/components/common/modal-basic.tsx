import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog"

interface ModalBasicProps {
    show: boolean
    onClose: () => void
    title: string | null
    children: React.ReactNode
}

export function ModalBasic({ show, onClose, title, children }: ModalBasicProps) {
    return (
        <Dialog open={show} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}

