export interface IProduct {
  _id: string;
  categoryid: string;
  skillid: string;
  name: string;
  description: string[];
  tag: string;
  agerange: string;
  images: string[];
  price: { curr: string; prev: string; discount: string };
  ratings: { rating: string; totalreviews: string };
}

export interface IProductForm {
  _id?:string;
  name: string;
  tag: string;
  agerange: string;
  categoryid: string;
  skillid: string;
  description: string[];
  images: File[];
  price: { curr: string; prev: string; discount: string };
  ratings: { rating: string; totalreviews: string };
}
export interface IProductUpdate {
  name: string;
  tag: string;
  agerange: string;
  categoryid: string;
  skillid: string;
  description: string[];
  images?: File[];
  price: { curr: string; prev: string; discount: string };
  ratings: { rating: string; totalreviews: string };
}

export interface ICategory {
  _id?: string;
  name: string;
}
export interface IModal {
  key: string;
  data: string[] | string;
}

export interface IOpenModal {
  key: string;
  data: { images?: string[], description?:string[],_id?:string,userid?:string };
}
