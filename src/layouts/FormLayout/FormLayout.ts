import { Block } from '@/entites/Block';

import type { FormLayoutProps } from './FormLayout.props.ts';
import { template } from './FormLayout.template.ts';

export class FormLayout extends Block<FormLayoutProps> {
  render(): string {
    return template;
  }
}
