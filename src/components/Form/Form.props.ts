import { Block } from '@/entites/Block';

export type FormProps = {
  id?: string;
  onSubmit?: EventListener;
  onChange?: EventListener;
  children?: Array<Block>;
  className?: string;
};
