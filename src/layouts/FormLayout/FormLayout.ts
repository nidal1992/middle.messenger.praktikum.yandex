import { Block } from '@/entites/Block';

import type { FormLayoutProps } from './FormLayout.props';
import { template } from './FormLayout.template';

export class FormLayout extends Block<FormLayoutProps> {
  render(): string {
    return template;
  }
}
