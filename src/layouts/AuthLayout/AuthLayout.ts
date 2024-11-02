import { Block } from '@/entites/Block';

import type { AuthLayoutProps } from './AuthLayout.props';
import { template } from './AuthLayout.template';

export class AuthLayout extends Block<AuthLayoutProps> {
  render(): string {
    return template;
  }
}
