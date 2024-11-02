import { Block } from '@/entites/Block';

import type { NavigationLayoutProps } from './NavigationLayout.props.ts';
import { template } from './NavigationLayout.template.ts';

export class NavigationLayout extends Block<NavigationLayoutProps> {
  render(): string {
    return template;
  }
}
