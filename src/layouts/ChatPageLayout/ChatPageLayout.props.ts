import { Block } from '@/entites/Block';

export type ChatPageLayoutProps = {
  contacts?: Block[];
  messages?: Block[];
  controls?: Block[];
  input: Block;
};
