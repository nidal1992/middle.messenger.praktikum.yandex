import { Block } from '@/lib/core/Block';

import type { ButtonProps } from './Button.props';
import { template } from './Button.template';

export class Button extends Block<ButtonProps> {
  render() {
    return template;
  }
}
