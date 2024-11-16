import { Block } from '@/entites/Block';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

import { SendIcon } from '@/components/icons/SendIcon/SendIcon';
import { PaperClipIcon } from '@/components/icons/PaperClipIcon';

export class MessageInput extends Block {
  render(): HTMLElement {
    const input = new Input({
      name: 'message',
      placeholder: 'MESSAGE',
    });

    const submit = new Button({
      variant: 'icon',
      children: new SendIcon(),
    });
    const attach = new Button({
      variant: 'icon',
      children: new PaperClipIcon(),
    });

    const form = new Form({
      className: 'flex-row gap-10',
      inputsLayout: 'row',
      inputs: [input],
      children: [submit, attach],
      onSubmit(e) {
        e.preventDefault();

        const formEl = <HTMLFormElement>e.target;
        console.log(formEl.message.value);
      },
    });

    return form.getContent();
  }
}
