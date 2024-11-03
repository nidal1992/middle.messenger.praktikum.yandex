import { Block } from '@/entites/Block';

import type { KeyValueProps } from './KeyValue.props';
import { template } from './KeyValue.template';

export class KeyValue extends Block<KeyValueProps> {
  render(): string {
    return template;
  }
}
