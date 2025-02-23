import { Button } from "~/components/ui/button"

interface HeaderPageProps {
  title: string
  btnTitle?: string
  btnClick?: () => void
}

export function HeaderPage({ title, btnTitle, btnClick }: HeaderPageProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      {btnTitle && btnClick && (
        <Button onClick={btnClick}>{btnTitle}</Button>
      )}
    </div>
  )
}

