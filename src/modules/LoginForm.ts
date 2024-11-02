import { Block } from '@/entites/Block';

import { validateFieldsState, ValidationHandler } from '@/utils/validation';
import { withPrevent } from '@/utils/withPrevent';

import { schemas as sharedSchemas } from '@/schemas';
import { ROUTES } from '@/routes';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Link } from '@/components/Link';
import { Form } from '@/components/Form';

type Inputs = 'login' | 'password';
type LoginSchema = Record<Inputs, ValidationHandler>;
type LoginFormState = FormState<Inputs>;

const schemas: LoginSchema = {
  login: sharedSchemas.login,
  password: sharedSchemas.password,
};

export class LoginForm extends Block<{}, LoginFormState> {
  constructor() {
    super(
      {},
      {
        login: { value: '' },
        password: { value: '' },
      },
    );
  }

  render(): HTMLElement {
    const updateState = (newState: Partial<LoginFormState>) => {
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
      const { state } = validateFieldsState(schemas, this.getState());
      console.log(state);
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
          placeholder: 'Your password',
          value: this.getState()?.password?.value,
          error: this.getState()?.password?.error,
          onFocusout: handleFocusOut('password'),
        }),
        new Button({
          children: 'ENTER',
          className: 'horizontal-center',
          variant: 'primary',
        }),
        new Link({
          variant: 'underline',
          className: 'horizontal-center',
          label: 'Registration',
          href: ROUTES.REGISTRATION,
        }),
      ],
    });

    return form.getContent();
  }
}
