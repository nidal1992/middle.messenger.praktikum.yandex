import { Block } from '@/entites/Block';

import { template } from './PaperClipIcon.template';

export class PaperClipIcon extends Block {
  render(): HTMLElement | string {
    return template;
  }
}
