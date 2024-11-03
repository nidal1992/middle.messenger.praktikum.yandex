import { Block } from '@/entites/Block';

import type { LinkProps } from './Link.props';
import { template } from './Link.template';

export class Link extends Block<LinkProps> {
  render(): string {
    return template;
  }
}
