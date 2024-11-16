import { Input } from '@/components/Input';
import { Block } from '@/entites/Block';

export type FormProps = {
  id?: string;
  inputs?: Input[];
  children?: Block[];
  onSubmit?: EventListener;
  onChange?: EventListener;
  className?: string;
  inputsLayout?: 'col' | 'col-2' | 'row';
};
