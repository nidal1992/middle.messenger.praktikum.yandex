import { Block } from '@/lib/core/Block';

import type { AuthLayoutProps } from './AuthLayout.props';
import { template } from './AuthLayout.template';

export class AuthLayout extends Block<AuthLayoutProps> {
  render(): string {
    return template;
  }
}
