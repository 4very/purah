// Interface automatically generated by schemas-to-ts

export interface Post {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    title: string;
    slug: string;
    body?: string;
    body2?: any;
    body3?: any;
  };
}
export interface Post_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  slug: string;
  body?: string;
  body2?: any;
  body3?: any;
}

export interface Post_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  slug: string;
  body?: string;
  body2?: any;
  body3?: any;
}

export interface Post_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title: string;
  slug: string;
  body?: string;
  body2?: any;
  body3?: any;
}
