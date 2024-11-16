import { schemas } from '@/model/schemas';
import { ROUTES } from '@/model/routes';

import { AuthLayout } from '@/layouts/AuthLayout';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Link } from '@/components/Link';
import { Form } from '@/components/Form';

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

export const LoginPage = new AuthLayout({
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
      new Link({
        variant: 'underline',
        className: 'horizontal-center fit-content block',
        label: 'Registration',
        href: ROUTES.REGISTRATION,
      }),
    ],
  }),
});
