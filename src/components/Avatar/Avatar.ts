import { Block } from '@/entites/Block';

import type { AvatarProps } from './Avatat.props';
import { template } from './Avatar.template';

export class Avatar extends Block<AvatarProps> {
  render(): string {
    return template;
  }
}
