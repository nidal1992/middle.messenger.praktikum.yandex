import { Block } from '@/entites/Block';

import type { ButtonProps } from './Button.props';
import { template } from './Button.template';

export class Button extends Block<ButtonProps> {
  render() {
    return template;
  }
}
