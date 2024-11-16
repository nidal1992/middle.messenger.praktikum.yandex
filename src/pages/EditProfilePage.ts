import { schemas } from '@/model/schemas';
import { ROUTES } from '@/model/routes';

import { SettingsPageLayout } from '@/layouts/SettingsPageLayout';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Link } from '@/components/Link';
import { Form } from '@/components/Form';

const user = {
  avatar: '/images/Empty-img.png',
  first_name: 'John',
  second_name: 'Dow',
  display_name: 'John_Dow',
  login: 'john_dow',
  email: 'john_dow@gmail.com',
  phone: '+79999999999',
};

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

export const EditProfilePage = new SettingsPageLayout({
  avatar: new Avatar({
    src: user.avatar,
    big: true,
  }),
  link: new Link({
    href: ROUTES.PROFILE,
    label: 'Back to Profile',
    variant: 'arrow',
  }),
  children: [
    new Form({
      inputsLayout: 'col-2',
      onSubmit: handleSubmit,

      inputs: [
        new Input({
          name: 'first_name',
          label: 'First name',
          placeholder: 'Your First name',
          value: user.first_name,
          schema: schemas.first_name,
          onFocusout: handleFocusOut,
        }),
        new Input({
          name: 'second_name',
          label: 'Second name',
          placeholder: 'Your Second name',
          value: user.second_name,
          schema: schemas.second_name,
          onFocusout: handleFocusOut,
        }),
        new Input({
          name: 'display_name',
          label: 'Display Name',
          placeholder: 'Your Display Name',
          value: user.display_name,
          schema: schemas.display_name,
          onFocusout: handleFocusOut,
        }),
        new Input({
          name: 'login',
          label: 'Login',
          placeholder: 'Your login',
          value: user.login,
          schema: schemas.login,
          onFocusout: handleFocusOut,
        }),
        new Input({
          name: 'email',
          label: 'Email',
          placeholder: 'Your Email',
          value: user.email,
          schema: schemas.email,
          onFocusout: handleFocusOut,
        }),
        new Input({
          name: 'phone',
          label: 'Phone',
          placeholder: 'Your Phone',
          value: user.phone,
          schema: schemas.phone,
          onFocusout: handleFocusOut,
        }),
      ],

      children: [
        new Button({
          children: 'SAVE',
          variant: 'primary',
          className: 'horizontal-center offset-top-20',
        }),
      ],
    }),
  ],
});
