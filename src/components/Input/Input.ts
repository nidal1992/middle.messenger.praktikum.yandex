import { Block } from '@/entites/Block';

import { inputTemplate } from './Input.template';
import type { InputProps } from './Input.props';
import './Input.scss';

export class Input extends Block<InputProps> {
  render(): string {
    return inputTemplate;
  }
}
