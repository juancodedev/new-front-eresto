import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog"

interface ModalBasicProps {
    show: boolean
    onClose: () => void
    title: string | null
    children: React.ReactNode
}

export function ModalBasic({ show, onClose, title, children }: Readonly<ModalBasicProps>) {
    return (
        <Dialog open={show} onOpenChange={onClose} aria-labelledby="dialog-title">
            <DialogContent aria-describedby="dialog-description">
                <DialogHeader>
                    <DialogTitle id="dialog-title">{title}</DialogTitle>
                </DialogHeader>
                <div id="dialog-description">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}

