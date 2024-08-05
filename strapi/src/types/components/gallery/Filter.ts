// Interface automatically generated by schemas-to-ts

export enum Type {
  Date = 'date',
  Text = 'text',
  ShutterSpeed = 'shutter_speed',
  Collection = 'collection',}

export interface Filter {
  name: string;
  key?: any;
  filters?: any;
  type?: Type;
}
export interface Filter_Plain {
  name: string;
  key?: any;
  filters?: any;
  type?: Type;
}

export interface Filter_NoRelations {
  name: string;
  key?: any;
  filters?: any;
  type?: Type;
}

