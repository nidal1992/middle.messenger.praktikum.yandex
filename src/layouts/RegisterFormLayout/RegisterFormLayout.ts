import { Block } from '@/entites/Block';

import type { RegisterFormLayoutProps } from './RegisterFormLayout.props';
import { template } from './RegisterFormLayout.template';

export class RegisterFormLayout extends Block<RegisterFormLayoutProps> {
  render(): string {
    return template;
  }
}
