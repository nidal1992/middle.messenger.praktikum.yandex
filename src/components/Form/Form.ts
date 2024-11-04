import { Block } from '@/entites/Block';

import { template } from './Form.template';
import type { FormProps } from './Form.props';

export class Form extends Block<FormProps> {
  render(): string {
    return template;
  }
}
