import { Block } from '@/entites/Block.ts';

import { template } from './Empty.template';

export class Empty extends Block {
  render(): HTMLElement | string {
    return template;
  }
}
