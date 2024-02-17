import { IProduct } from "./product";
import { IPartner, IVisitor } from "./user";

export interface IOrderItem{
    productid:IProduct;
    quantity:number;
    _id:string;
}
export interface IOrders{
   orders:IOrderItem[];
   totalamount:number;
   _id:string;
}

export interface IVisitorOrders extends IVisitor {
    items:IOrders[]
}

export interface IPartnerOders{
    user:IPartner;
    items:IOrders[]
}