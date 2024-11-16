import { Block } from '@/entites/Block';

import { inputTemplate } from './Input.template';
import type { InputProps } from './Input.props';
import './Input.scss';

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({
      error: '',
      value: '',
      ...props,
    });
  }

  validate(value: string) {
    const schema = this.getProps().schema;

    if (!schema) {
      return true;
    }

    const { message } = schema(value);

    const validationResult = {
      value,
      error: message,
    };

    this.setProps(validationResult);

    return !message;
  }

  render(): string {
    return inputTemplate;
  }
}
