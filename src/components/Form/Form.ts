import { Block } from '@/entites/Block';

import { template } from './Form.template';
import type { FormProps } from './Form.props';

export class Form extends Block<FormProps> {
  allValues() {
    const form = this.getContent().querySelector('form');

    if (!form) {
      return {};
    }

    const formData = new FormData(form);

    const res = <Record<string, FormDataEntryValue>>{};

    formData.forEach((value, key) => {
      res[key] = value;
    });

    return res;
  }

  render(): string {
    return template;
  }
}
