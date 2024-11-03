import { Block } from '@/entites/Block';

import type { SettingsPageLayoutProps } from './SettingsPageLayout.props';
import { template } from './SettingsPageLayout.template';

export class SettingsPageLayout extends Block<SettingsPageLayoutProps> {
  render(): string {
    return template;
  }
}
