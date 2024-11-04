import { Block } from '@/entites/Block';

export type InputProps = {
  icon?: Block;
  label?: string;
  className?: string;
  placeholder?: string;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'phone';
  required?: boolean;
  value?: string;
  error?: string;
  onChange?: EventListener;
  onFocusout?: EventListener;
  onBlur?: EventListener;
  onFocus?: EventListener;
};
