import { Block } from '@/entites/Block';

import type { ChatPageLayoutProps } from './ChatPageLayout.props';
import { template } from './ChatPageLayout.template';

export class ChatPageLayout extends Block<ChatPageLayoutProps> {
  render(): string {
    return template;
  }
}
