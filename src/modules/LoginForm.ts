import { Block } from '@/entites/Block';

import { ValidationHandler } from '@/utils/validation';
import { withPrevent } from '@/utils/withPrevent';

import { schemas as sharedSchemas } from '@/schemas';
import { ROUTES } from '@/routes';

import { Button, Form, Input, Link } from '@/components';

type Inputs = 'login' | 'password';
type LoginFormState = Record<Inputs, { value: string; error?: string }> & { isValid?: boolean };

const schemas: Record<Inputs, ValidationHandler> = {
  login: sharedSchemas.login,
  password: sharedSchemas.password,
};

export class LoginForm extends Block {
  state: LoginFormState;

  constructor() {
    super();

    this.state = this.makePropsProxy<LoginFormState>({
      login: { value: '' },
      password: { value: '' },
    });
  }

  getState() {
    return this.state;
  }

  setState(state: LoginFormState) {
    if (!state) {
      return;
    }

    const oldState = { ...this.state };

    if (JSON.stringify(oldState) === JSON.stringify(state)) {
      return;
    }

    Object.assign(this.state, state);

    this.dispatchChange(oldState, state);
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
      const newState: LoginFormState = { ...this.getState() };

      console.log('submit');

      Object.entries(schemas).forEach(([key, schema]) => {
        const field = newState[<Inputs>key];
        const { isValid, message } = schema(field.value);

        if (!isValid) {
          field.error = message;
          newState.isValid = false;
        }
      });

      if (!newState?.isValid) {
        updateState(newState);
      }
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
          placeholder: 'Your passwword',
          value: this.getState()?.password?.value,
          error: this.getState()?.password?.error,
          onFocusout: handleFocusOut('password'),
        }),
        new Button({
          children: 'Enter',
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
