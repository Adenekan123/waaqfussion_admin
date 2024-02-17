import { IconType } from "react-icons";

export interface IBasicNav{
    title:string;
    url?:string
    icon:IconType;
}
export interface INavigation extends IBasicNav{
    sublist?:IBasicNav[]
}