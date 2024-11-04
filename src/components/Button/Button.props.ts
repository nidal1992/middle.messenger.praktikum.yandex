import { Block } from '@/entites/Block';

export type ButtonProps = {
  children?: Block | string;
  onClick?: EventListener;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  form?: string;
  id?: string;
  variant?: 'failure' | 'primary' | 'icon';
};
