import { FC } from "react"

interface TempLogoSettings {
  className?: string
  onClick?: () => void
}

export const TempLogo: FC<TempLogoSettings> = (props) => {
  return (
    <div 
      className={`${props.className} h-10 lg:w-40 sm:w-10 bg-red-600 cursor-pointer`} 
      onClick={props.onClick}
    >
    </div>
  )
}