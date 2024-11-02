import { Block } from '@/entites/Block.ts';
import { ROUTES } from '@/routes';

import { Link } from '@/components/Link';
import { NavigationLayout } from '@/layouts/NavigationLayout';

const links = Object.entries(ROUTES).map(
  ([key, value]) =>
    new Link({
      label: key,
      href: value,
    }),
);

export class Navigation extends Block {
  render(): HTMLElement {
    const navigation = new NavigationLayout({
      children: links,
    });

    return navigation.getContent();
  }
}
