import { Block } from '@/entites/Block.ts';

import { Navigation } from '@/modules/Navigation';

export function render(selector: string, block: Block): Element {
  const root = document.querySelector(selector);

  if (!root) {
    throw new Error(`Could not render element with selector ${selector}`);
  }

  root.append(block.getContent());

  // временный роутинг
  document.body.append(new Navigation().getContent());
  return root;
}
