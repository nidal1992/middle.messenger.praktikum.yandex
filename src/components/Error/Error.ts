import { Block } from '@/entites/Block';

import type { ErrorProps } from './Error.props';
import { template } from './Error.template';

export class Error extends Block<ErrorProps> {
  render(): string {
    return template;
  }
}
