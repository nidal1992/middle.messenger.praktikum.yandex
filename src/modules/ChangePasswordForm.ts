import { Block } from '@/entites/Block';

import { validateFieldsState, ValidationHandler } from '@/utils/validation';
import { withPrevent } from '@/utils/withPrevent';
import { schemas as sharedSchemas } from '@/model/schemas.ts';

import { Button } from '@/components/Button';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';

type Inputs = 'new_password' | 'repeat_password' | 'password';
type ChangePasswordFormSchema = Record<Inputs, ValidationHandler>;
type RegisterFormState = FormState<Inputs>;

const schemas: ChangePasswordFormSchema = {
  new_password: sharedSchemas.password,
  repeat_password: sharedSchemas.password,
  password: sharedSchemas.password,
};

export class ChangePasswordForm extends Block<{}, RegisterFormState> {
  constructor() {
    super(
      {},
      {
        password: { value: '' },
        repeat_password: { value: '' },
        new_password: { value: '' },
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

        if (!isValid) {
          updateState({
            [input]: {
              value,
              error: message,
            },
          });
        }
      };

    const handleSubmit = () => {
      const { state } = validateFieldsState<Inputs>(schemas, this.getState());
      console.log('before', state);

      if (!state.password.error && state.repeat_password.value !== state.new_password.value) {
        state.new_password.error = '*Passwords must match';
        state.repeat_password.error = '*Passwords must match';
      }

      if (!state?.isValid) {
        updateState(state);
        return;
      }

      console.log('after', state);

      console.log(state);
    };

    const form = new Form({
      onSubmit: withPrevent(handleSubmit),
      className: 'flex-col gap-10',
      children: [
        new Input({
          name: 'password',
          label: 'Password',
          placeholder: 'Your password',
          value: this.getState()?.password?.value,
          error: this.getState()?.password?.error,
          onFocusout: handleFocusOut('password'),
        }),
        new Input({
          name: 'new_password',
          label: 'New Password',
          placeholder: 'Enter New Password',
          value: this.getState()?.new_password?.value,
          error: this.getState()?.new_password?.error,
          onFocusout: handleFocusOut('new_password'),
        }),
        new Input({
          name: 'repeat_password',
          label: 'Repeat password',
          placeholder: 'Repeat new password',
          value: this.getState()?.repeat_password?.value,
          error: this.getState()?.repeat_password?.error,
          onFocusout: handleFocusOut('repeat_password'),
        }),
        new Button({
          children: 'Register',
          className: 'horizontal-center',
          variant: 'primary',
        }),
      ],
    });

    return form.getContent();
  }
}
