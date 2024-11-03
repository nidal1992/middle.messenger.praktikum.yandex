import { Block } from '@/entites/Block';

import type { ContactRowProps } from './ContactRow.props';
import { template } from './ContactRow.template.ts';

export class ContactRow extends Block<ContactRowProps> {
  render(): string {
    return template;
  }
}
