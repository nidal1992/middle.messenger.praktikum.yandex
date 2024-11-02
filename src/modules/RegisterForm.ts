import { Block } from '@/entites/Block';

import { validateFieldsState, ValidationHandler } from '@/utils/validation';
import { withPrevent } from '@/utils/withPrevent';
import { schemas as sharedSchemas } from '@/schemas';
import { ROUTES } from '@/routes';

import { RegisterFormLayout } from '@/layouts/RegisterFormLayout';
import { Button } from '@/components/Button';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { Link } from '@/components/Link';

type Inputs = 'first_name' | 'second_name' | 'email' | 'phone' | 'login' | 'password';
type RegisterSchema = Record<Inputs, ValidationHandler>;
type RegisterFormState = FormState<Inputs>;

const schemas: RegisterSchema = {
  login: sharedSchemas.login,
  password: sharedSchemas.password,
  first_name: sharedSchemas.first_name,
  second_name: sharedSchemas.second_name,
  email: sharedSchemas.email,
  phone: sharedSchemas.phone,
};

export class RegisterForm extends Block<{}, RegisterFormState> {
  constructor() {
    super(
      {},
      {
        login: { value: '' },
        password: { value: '' },
        first_name: { value: '' },
        second_name: { value: '' },
        email: { value: '' },
        phone: { value: '' },
      },
    );
  }

  render(): HTMLElement {
    const updateState = (newState: Partial<RegisterFormState>) => {
      this.setState({ ...this.getState(), ...newState });
    };

    const handleFocusOut = (input: Inputs) =>
      function handler(e: Event) {
        const { value } = <HTMLInputElement>e.target;
        const { isValid, message } = schemas[input](value);

        updateState({
          [input]: {
            value,
            error: !isValid ? message : '',
          },
        });
      };

    const handleSubmit = () => {
      const { state } = validateFieldsState<Inputs>(schemas, this.getState());

      if (!state?.isValid) {
        updateState(state);
        return;
      }

      console.log(state);
    };

    const form = new Form({
      onSubmit: withPrevent(handleSubmit),
      className: 'flex-col',
      children: [
        new RegisterFormLayout({
          children: [
            new Input({
              name: 'first_name',
              label: 'First name',
              placeholder: 'Your First name',
              value: this.getState()?.first_name?.value,
              error: this.getState()?.first_name?.error,
              onFocusout: handleFocusOut('first_name'),
            }),
            new Input({
              name: 'second_name',
              label: 'Second name',
              placeholder: 'Your Second name',
              value: this.getState()?.second_name?.value,
              error: this.getState()?.second_name?.error,
              onFocusout: handleFocusOut('second_name'),
            }),
            new Input({
              name: 'email',
              label: 'Email',
              placeholder: 'Your Email',
              value: this.getState()?.email?.value,
              error: this.getState()?.email?.error,
              onFocusout: handleFocusOut('email'),
            }),
            new Input({
              name: 'phone',
              label: 'Phone',
              placeholder: 'Your Phone',
              value: this.getState()?.phone?.value,
              error: this.getState()?.phone?.error,
              onFocusout: handleFocusOut('phone'),
            }),
            new Input({
              name: 'login',
              label: 'Login',
              placeholder: 'Your login',
              value: this.getState()?.login?.value,
              error: this.getState()?.login?.error,
              onFocusout: handleFocusOut('login'),
            }),
            new Input({
              name: 'password',
              label: 'Password',
              placeholder: 'Your passwword',
              value: this.getState()?.password?.value,
              error: this.getState()?.password?.error,
              onFocusout: handleFocusOut('password'),
            }),
          ],
        }),
        new Button({
          children: 'Register',
          className: 'horizontal-center',
          variant: 'primary',
        }),
        new Link({
          className: 'horizontal-center',
          label: 'LOGIN',
          href: ROUTES.LOGIN,
          info: 'Do you have a profile?',
        }),
      ],
    });

    return form.getContent();
  }
}
