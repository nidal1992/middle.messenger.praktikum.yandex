import { schemas } from '@/model/schemas';
import { ROUTES } from '@/model/routes';

import { AuthLayout } from '@/layouts/AuthLayout';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Link } from '@/components/Link';
import { Form } from '@/components/Form';

function handleFocusOut(e: Event) {
  const { value } = <HTMLInputElement>e.target;
  this.validate(value);
}

function handleSubmit(e: Event) {
  e.preventDefault();

  const inputs = this.getLists().inputs as Input[];

  const isFieldsValid = inputs
    .map((input) => Boolean(input.validate(input.getProps().value!)))
    .every(Boolean);

  if (isFieldsValid) {
    console.log(this.allValues());
  }
}

export const RegisterPage = new AuthLayout({
  title: 'Registration',
  children: new Form({
    inputsLayout: 'col-2',
    className: 'flex-col gap-10',
    onSubmit: handleSubmit,

    inputs: [
      new Input({
        name: 'first_name',
        label: 'First name',
        placeholder: 'Your First name',
        schema: schemas.first_name,
        onFocusout: handleFocusOut,
      }),
      new Input({
        name: 'second_name',
        label: 'Second name',
        schema: schemas.second_name,
        placeholder: 'Your Second name',
        onFocusout: handleFocusOut,
      }),
      new Input({
        name: 'email',
        label: 'Email',
        schema: schemas.email,
        placeholder: 'Your Email',
        onFocusout: handleFocusOut,
      }),
      new Input({
        name: 'phone',
        label: 'Phone',
        schema: schemas.phone,
        placeholder: 'Your Phone',
        onFocusout: handleFocusOut,
      }),
      new Input({
        name: 'login',
        label: 'Login',
        schema: schemas.login,
        placeholder: 'Your login',
        onFocusout: handleFocusOut,
      }),
      new Input({
        name: 'password',
        label: 'Password',
        type: 'password',
        schema: schemas.password,
        placeholder: 'Your password',
        onFocusout: handleFocusOut,
      }),
    ],

    children: [
      new Button({
        children: 'REGISTER',
        className: 'horizontal-center',
        variant: 'primary',
      }),
      new Link({
        variant: 'ordinary',
        className: 'horizontal-center fit-content block',
        label: 'Login',
        href: ROUTES.LOGIN,
        info: 'Do you have a profile?',
      }),
    ],
  }),
});
