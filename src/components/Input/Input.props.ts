import { Block } from '@/entites/Block';
import { ValidationHandler } from '@/utils/validation';

export type InputProps = {
  icon?: Block;
  label?: string;
  className?: string;
  placeholder?: string;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'phone' | 'file';
  required?: boolean;
  value?: string;
  error?: string;
  onChange?: EventListener;
  onFocusout?: EventListener;
  onBlur?: EventListener;
  onFocus?: EventListener;
  schema?: ValidationHandler;
  autocomplete?: boolean;
};
