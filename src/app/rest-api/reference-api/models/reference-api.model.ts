
export interface ReferenceResponseModel {
  id: string;
  type: string;
  attributes: Array<ReferenceAttributes>;
}

export interface ReferenceAttributes {
  category: Category;
}

export interface Category {
  name: string;
  refData: Array<RefData>;
}

export interface RefData {
  code: string;
  decode: string;
  description: string;
  category: string;
  children: Array<RefData>;
}
