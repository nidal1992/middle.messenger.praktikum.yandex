import { ROUTES } from '@/model/routes';
import { schemas as sharedSchemas } from '@/model/schemas';
import { getAllInputsData } from '@/utils/getAllInputsData.ts';

import { validateAllFields, validateField, ValidationHandler } from '@/utils/validation';
import { parseUserData } from '@/utils/parseUserData';
import { withPrevent } from '@/utils/withPrevent';

import { SettingsPageLayout } from '@/layouts/SettingsPageLayout';
import { Input } from '@/components/Input';
import { Avatar } from '@/components/Avatar';
import { Link } from '@/components/Link';
import { Button } from '@/components/Button';
import { Form } from '@/components/Form';

type Inputs = 'old_password' | 'repeat_password' | 'password';
type ChangePasswordFormSchema = Record<Inputs, ValidationHandler>;

const schema: ChangePasswordFormSchema = {
  password: sharedSchemas.password,
  repeat_password: sharedSchemas.password,
  old_password: sharedSchemas.password,
};

const { avatar } = parseUserData({
  avatar: '/images/empty-img.png',
  first_name: 'John',
  second_name: 'Dow',
  display_name: 'John Dow',
  login: 'john_dow',
  email: 'john_dow@gmail.com',
  phone: '+7 999 999-99-99',
});

const inputs = [
  new Input({
    name: 'old_password',
    label: 'Old password',
    placeholder: 'Your Old password',
    value: '',
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.old_password);
    },
  }),
  new Input({
    name: 'password',
    label: 'New password',
    placeholder: 'Your New password',
    value: '',
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.password);
    },
  }),
  new Input({
    name: 'repeat_password',
    label: 'Repeat new password',
    placeholder: 'Repeat new password',
    value: '',
    error: '',
    onFocusout(e) {
      const { value } = <HTMLInputElement>e.target;
      validateField(this, value, schema.repeat_password);
    },
  }),
];

function handleSubmit() {
  const isFieldsValid = validateAllFields(inputs, schema);

  const isOldPasswordValid = !inputs[0].getProps().error;
  const passwordMatch = inputs[1].getProps().value === inputs[2].getProps().value;

  if (isOldPasswordValid && !passwordMatch) {
    inputs[1].setProps({ error: '*Passwords must match' });
    inputs[2].setProps({ error: '*Passwords must match' });
    return;
  }

  if (isFieldsValid) {
    const data = getAllInputsData(inputs);
    console.log(data);
  }
}

const form = new Form({
  className: 'flex-col gap-10',
  onSubmit: withPrevent(handleSubmit),
  children: [
    ...inputs,
    new Button({
      children: 'SAVE',
      className: 'horizontal-center offset-top-20',
      variant: 'primary',
    }),
  ],
});

export const ChangePasswordPage = new SettingsPageLayout({
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
