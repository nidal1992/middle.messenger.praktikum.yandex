import { Block } from '@/entites/Block.ts';

export function render(selector: string, block: Block<HTMLElement, any>): Element {
  const root = document.querySelector(selector);

  if (!root) {
    throw new Error(`Could not render element with selector ${selector}`);
  }

  root.append(block.getContent());

  return root;
}
