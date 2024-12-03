import { Block } from '@/lib/core/Block';

import { Input } from '@/components/Input';
import { SearchIcon } from '@/components/icons/SearchIcon';

export class SearchInput extends Block {
  render(): HTMLElement {
    const input = new Input({
      icon: new SearchIcon(),
      placeholder: 'Search...',
    });

    return input.getContent();
  }
}
