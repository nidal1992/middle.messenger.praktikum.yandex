import { Block } from '@/entites/Block';

export type ErrorProps = {
  code: string;
  message: string;
  children: Block;
};
