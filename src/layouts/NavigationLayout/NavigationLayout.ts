import { Block } from '@/entites/Block';

import type { NavigationLayoutProps } from './NavigationLayout.props';
import { template } from './NavigationLayout.template';

export class NavigationLayout extends Block<NavigationLayoutProps> {
  render(): string {
    return template;
  }
}
