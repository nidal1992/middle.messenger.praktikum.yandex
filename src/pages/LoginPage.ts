import { Block } from '@/entites/Block';
import { Router } from '@/entites/Router';
import { ROOT_SELECTOR } from '@/model/const';
import { schemas } from '@/model/schemas';
import { ROUTES } from '@/model/routes';

import { AuthLayout } from '@/layouts/AuthLayout';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Form } from '@/components/Form';

const router = new Router(ROOT_SELECTOR);

function handleFocusOut(e: Event): void {
  const { value } = <HTMLInputElement>e.target;
  this.validate(value);
}

function handleSubmit(e: Event): void {
  e.preventDefault();

  const inputs = this.getLists().inputs as Input[];

  const isFieldsValid = inputs
    .map((input) => Boolean(input.validate(input.getProps().value!)))
    .every(Boolean);

  if (isFieldsValid) {
    console.log(this.allValues());
  }
}

export const loginPage = new AuthLayout({
  title: 'Login',
  children: new Form({
    inputsLayout: 'col',
    className: 'flex-col gap-10',
    onSubmit: handleSubmit,
    inputs: [
      new Input({
        name: 'login',
        label: 'Login',
        placeholder: 'Your login',
        schema: schemas.login,
        onFocusout: handleFocusOut,
      }),
      new Input({
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Your password',
        autocomplete: true,
        schema: schemas.password,
        onFocusout: handleFocusOut,
      }),
    ],
    children: [
      new Button({
        children: 'ENTER',
        className: 'horizontal-center',
        variant: 'primary',
      }),
      new Button({
        type: 'button',
        variant: 'link',
        className: 'horizontal-center fit-content block',
        children: 'Registration',
        onClick: () => router.go(ROUTES.REGISTRATION),
      }),
    ],
  }),
});

export class LoginPage extends Block {
  render(): HTMLElement | string {
    return loginPage.getContent();
  }
}
