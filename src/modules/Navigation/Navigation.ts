import { Link } from '@/components/Link';
import { Block } from '@/entites/Block';
import { ROUTES } from '@/model/routes.ts';

import type { NavigationProps } from './Navigation.props';
import { template } from './Navigation.template';

const links = Object.entries(ROUTES).map(
  ([key, value]) =>
    new Link({
      label: key,
      href: value,
    }),
);

class NavigationLayout extends Block<NavigationProps> {
  render(): string {
    return template;
  }
}

export class Navigation extends Block {
  render(): HTMLElement {
    const navigation = new NavigationLayout({
      children: links,
    });

    return navigation.getContent();
  }
}
