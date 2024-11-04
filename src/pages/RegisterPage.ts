import { FormLayout } from '@/layouts/FormLayout';
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

type Inputs = 'first_name' | 'second_name' | 'email' | 'phone' | 'login' | 'password';
type RegisterSchema = Record<Inputs, ValidationHandler>;

const schema: RegisterSchema = {
  login: sharedSchemas.login,
  password: sharedSchemas.password,
  first_name: sharedSchemas.first_name,
  second_name: sharedSchemas.second_name,
  email: sharedSchemas.email,
  phone: sharedSchemas.phone,
};

const inputs = [
  new Input({
    name: 'first_name',
    label: 'First name',
    placeholder: 'Your First name',
    value: '',
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.first_name);
    },
  }),
  new Input({
    name: 'second_name',
    label: 'Second name',
    placeholder: 'Your Second name',
    value: '',
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.second_name);
    },
  }),
  new Input({
    name: 'email',
    label: 'Email',
    placeholder: 'Your Email',
    value: '',
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.email);
    },
  }),
  new Input({
    name: 'phone',
    label: 'Phone',
    placeholder: 'Your Phone',
    value: '',
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.phone);
    },
  }),
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
    placeholder: 'Your passwword',
    value: '',
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.password);
    },
  }),
];

const submit = new Button({
  children: 'REGISTER',
  className: 'horizontal-center',
  variant: 'primary',
});

const link = new Link({
  variant: 'ordinary',
  className: 'horizontal-center',
  label: 'Login',
  href: ROUTES.LOGIN,
  info: 'Do you have a profile?',
});

function handleSubmit() {
  const isFieldsValid = validateAllFields(inputs, schema);

  if (isFieldsValid) {
    const data = getAllInputsData(inputs);

    console.log(data);
  }
}

export const RegisterPage = new AuthLayout({
  title: 'Registration',
  children: new Form({
    onSubmit: withPrevent(handleSubmit),
    className: 'flex-col gap-10',
    children: [new FormLayout({ children: inputs }), submit, link],
  }),
});
