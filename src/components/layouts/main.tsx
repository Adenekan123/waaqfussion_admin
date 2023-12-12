import { ReactNode } from "react"
import { Header } from "./header"

export const Main = ({children}:{children:ReactNode}) => {
    return (
      <div className="h-full basis-10/12">
        <Header/>
        <div className="h-full w-full border overflow-hidden overflow-y-hidden">{children}</div>
      </div>
    )
  }
  
  