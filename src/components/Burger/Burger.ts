import { Block } from '@/entites/Block';

import { Button } from '@/components/Button';
import { ListIcon } from '@/components/icons/ListIcon';

export class Burger extends Block {
  render(): HTMLElement | string {
    const button = new Button({
      children: new ListIcon(),
      variant: 'icon',
    });
    return button.getContent();
  }
}
