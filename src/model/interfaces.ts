import { Block } from '@/entites/Block';

export interface IUser extends SimpleMap {
  avatar?: string;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface BlockConstructor {
  new (props: SimpleMap): Block;
}

export type PlainObject<T = unknown> = {
  [k in string]: T;
};
