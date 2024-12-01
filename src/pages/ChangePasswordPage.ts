import { Block } from '@/entites/Block';
import { Router } from '@/entites/Router';
import { ROOT_SELECTOR } from '@/model/const';
import { ROUTES } from '@/model/routes';
import { schemas } from '@/model/schemas';

import { parseUserData } from '@/utils/parseUserData';

import { SettingsPageLayout } from '@/layouts/SettingsPageLayout';
import { Input } from '@/components/Input';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Form } from '@/components/Form';

const { avatar } = parseUserData({
  avatar: '/images/Empty-img.png',
  first_name: 'John',
  second_name: 'Dow',
  display_name: 'John Dow',
  login: 'john_dow',
  email: 'john_dow@gmail.com',
  phone: '+7 999 999-99-99',
});

const router = new Router(ROOT_SELECTOR);

function handleFocusOut(e: Event): void {
  const { value } = <HTMLInputElement>e.target;
  this.validate(value);
}

function handleSubmit(e: Event) {
  e.preventDefault();

  const inputs = this.getLists().inputs as Input[];

  const isFieldsValid = inputs
    .map((input) => Boolean(input.validate(input.getProps().value!)))
    .every(Boolean);

  const isOldPasswordValid = !inputs[0].getProps().error;
  const passwordMatch = inputs[1].getProps().value === inputs[2].getProps().value;

  if (isOldPasswordValid && !passwordMatch) {
    inputs[1].setProps({ error: '*Passwords must match' });
    inputs[2].setProps({ error: '*Passwords must match' });
    return;
  }

  if (isFieldsValid) {
    console.log(this.allValues());
  }
}

export const changePasswordPage = new SettingsPageLayout({
  avatar: new Avatar({
    src: avatar,
    big: true,
  }),
  link: new Button({
    onClick: () => router.go(ROUTES.PROFILE),
    children: 'Back to Profile',
    variant: 'link',
  }),

  children: [
    new Form({
      className: 'flex-col gap-10',
      inputsLayout: 'col',
      onSubmit: handleSubmit,

      inputs: [
        new Input({
          name: 'old_password',
          label: 'Old password',
          type: 'password',
          placeholder: 'Your Old password',
          schema: schemas.password,
          onFocusout: handleFocusOut,
        }),
        new Input({
          name: 'password',
          label: 'New password',
          type: 'password',
          placeholder: 'Your New password',
          schema: schemas.password,
          onFocusout: handleFocusOut,
        }),
        new Input({
          name: 'repeat_password',
          label: 'Repeat new password',
          type: 'password',
          placeholder: 'Repeat new password',
          schema: schemas.password,
          onFocusout: handleFocusOut,
        }),
      ],

      children: [
        new Button({
          children: 'SAVE',
          className: 'horizontal-center offset-top-20',
          variant: 'primary',
        }),
      ],
    }),
  ],
});

export class ChangePasswordPage extends Block {
  render(): HTMLElement | string {
    return changePasswordPage.getContent();
  }
}
