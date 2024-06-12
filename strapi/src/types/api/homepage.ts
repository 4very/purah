// Interface automatically generated by schemas-to-ts

export interface Homepage {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    title: string;
    dynamic?: any;
  };
}
export interface Homepage_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  dynamic?: any;
}

export interface Homepage_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  dynamic?: any;
}

export interface Homepage_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  dynamic?: any;
}
