import { validateFieldsState, ValidationHandler } from '@/utils/validation';
import { withPrevent } from '@/utils/withPrevent';
import { schemas as sharedSchemas } from '@/model/schemas';
import { IUser } from '@/model/interfaces';

import { FormLayout } from '@/layouts/FormLayout';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Block } from '@/entites/Block';

type Inputs = 'first_name' | 'second_name' | 'email' | 'phone' | 'login' | 'display_name';
type EditProfileSchema = Record<Inputs, ValidationHandler>;
type EditProfileFormState = FormState<Inputs>;

const schemas: EditProfileSchema = {
  login: sharedSchemas.login,
  display_name: sharedSchemas.display_name,
  first_name: sharedSchemas.first_name,
  second_name: sharedSchemas.second_name,
  email: sharedSchemas.email,
  phone: sharedSchemas.phone,
};

export class EditProfileForm extends Block<{}, EditProfileFormState> {
  constructor(props: IUser) {
    super(
      {},
      {
        login: { value: '' },
        display_name: { value: props.display_name },
        first_name: { value: props.first_name },
        second_name: { value: props.second_name },
        email: { value: props.email },
        phone: { value: props.phone },
      },
    );
  }

  render(): HTMLElement {
    const updateState = (newState: Partial<EditProfileFormState>) => {
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
      className: 'flex-col gap-10',
      children: [
        new FormLayout({
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
              name: 'display_name',
              label: 'Display Name',
              placeholder: 'Your Display Name',
              value: this.getState()?.display_name?.value,
              error: this.getState()?.display_name?.error,
              onFocusout: handleFocusOut('display_name'),
            }),
            new Button({
              className: 'horizontal-center offset-top-20',
              children: 'Save',
              variant: 'primary',
            }),
          ],
        }),
      ],
    });

    return form.getContent();
  }
}
