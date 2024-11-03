import { getAllInputsData } from '@/utils/getAllInputsData';
import { validateAllFields, validateField, ValidationHandler } from '@/utils/validation';
import { withPrevent } from '@/utils/withPrevent';

import { schemas as sharedSchemas } from '@/model/schemas';
import { ROUTES } from '@/model/routes';

import { AuthLayout } from '@/layouts/AuthLayout';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Link } from '@/components/Link';
import { Form } from '@/components/Form';

type Inputs = 'login' | 'password';
type LoginSchema = Record<Inputs, ValidationHandler>;

const schema: LoginSchema = {
  login: sharedSchemas.login,
  password: sharedSchemas.password,
};

const inputs = [
  new Input({
    name: 'login',
    label: 'Login',
    placeholder: 'Your login',
    value: '',
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.login);
    },
  }),
  new Input({
    name: 'password',
    label: 'Password',
    placeholder: 'Your password',
    value: '',
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.password);
    },
  }),
];

const submit = new Button({
  children: 'ENTER',
  className: 'horizontal-center',
  variant: 'primary',
});

const link = new Link({
  variant: 'underline',
  className: 'horizontal-center',
  label: 'Registration',
  href: ROUTES.REGISTRATION,
});

function handleSubmit() {
  const isFieldsValid = validateAllFields(inputs, schema);

  if (isFieldsValid) {
    const data = getAllInputsData(inputs);

    console.log(data);
  }
}

export const LoginPage = new AuthLayout({
  title: 'Login',
  children: new Form({
    onSubmit: withPrevent(handleSubmit),
    className: 'flex-col gap-10',
    children: [...inputs, submit, link],
  }),
});
