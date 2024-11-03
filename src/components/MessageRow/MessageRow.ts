import { Block } from '@/entites/Block';

import type { MessageRowProps } from './MessageRow.props';
import { template } from './MessageRow.template';

export class MessageRow extends Block<MessageRowProps> {
  render(): string {
    return template;
  }
}
