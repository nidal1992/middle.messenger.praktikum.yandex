import { Form } from '@/components/Form';
import { schemas as sharedSchemas } from '@/model/schemas';
import { ROUTES } from '@/model/routes';
import { getAllInputsData } from '@/utils/getAllInputsData.ts';
import { validateAllFields, validateField, ValidationHandler } from '@/utils/validation';

import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Link } from '@/components/Link';
import { FormLayout } from '@/layouts/FormLayout';
import { SettingsPageLayout } from '@/layouts/SettingsPageLayout';
import { withPrevent } from '@/utils/withPrevent.ts';

type Inputs = 'first_name' | 'second_name' | 'email' | 'phone' | 'login' | 'display_name';
type EditProfileSchema = Record<Inputs, ValidationHandler>;

const schema: EditProfileSchema = {
  login: sharedSchemas.login,
  display_name: sharedSchemas.display_name,
  first_name: sharedSchemas.first_name,
  second_name: sharedSchemas.second_name,
  email: sharedSchemas.email,
  phone: sharedSchemas.phone,
};

const { avatar, ...user } = {
  avatar: '/images/empty-img.png',
  first_name: 'John',
  second_name: 'Dow',
  display_name: 'John Dow',
  login: 'john_dow',
  email: 'john_dow@gmail.com',
  phone: '+7 999 999-99-99',
};

const inputs = [
  new Input({
    name: 'first_name',
    label: 'First name',
    placeholder: 'Your First name',
    value: user.first_name,
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
    value: user.second_name,
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.second_name);
    },
  }),
  new Input({
    name: 'display_name',
    label: 'Display Name',
    placeholder: 'Your Display Name',
    value: user.display_name,
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.display_name);
    },
  }),
  new Input({
    name: 'login',
    label: 'Login',
    placeholder: 'Your login',
    value: user.login,
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.login);
    },
  }),
  new Input({
    name: 'email',
    label: 'Email',
    placeholder: 'Your Email',
    value: user.email,
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
    value: user.phone,
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.phone);
    },
  }),
];

function handleSubmit() {
  const isFieldsValid = validateAllFields(inputs, schema);

  if (isFieldsValid) {
    const data = getAllInputsData(inputs);

    console.log(data);
  }
}

const form = new Form({
  onSubmit: withPrevent(handleSubmit),
  children: [
    new FormLayout({
      children: [
        ...inputs,
        new Button({
          children: 'SAVE',
          variant: 'primary',
          className: 'horizontal-center offset-top-20',
        }),
      ],
    }),
  ],
});

export const EditProfilePage = new SettingsPageLayout({
  avatar: new Avatar({
    src: avatar,
    big: true,
  }),
  link: new Link({
    href: ROUTES.PROFILE,
    label: 'Back to Profile',
    variant: 'arrow',
  }),
  children: [form],
});
