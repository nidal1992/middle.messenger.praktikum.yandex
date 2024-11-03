import { s, validator } from '@/utils/validation.ts';

const MIN_LOGIN_LEN = 3;
const MAX_LOGIN_LEN = 20;
const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 40;

export const schemas = {
  login: validator(
    s()
      .required({ message: '*Required field' })
      .minLength({
        message: `Must be at least ${MIN_LOGIN_LEN} characters`,
        vars: [MIN_LOGIN_LEN],
      })
      .maxLength({
        message: `Must be more than ${MAX_LOGIN_LEN} characters`,
        vars: [MAX_LOGIN_LEN],
      })
      .notAllDigit({ message: 'Cannot consist only of numbers' })
      .spaceFree({ message: 'Must not contain spaces' })
      .notSpecSymbols({
        message: '*Invalid characters',
        vars: ['-', '_'],
      }),
  ),
  password: validator(
    s()
      .required({ message: '*Required field' })
      .minLength({
        message: `Must be at least ${MIN_PASSWORD_LEN} characters`,
        vars: [MIN_PASSWORD_LEN],
      })
      .maxLength({
        message: `Must be more than ${MAX_PASSWORD_LEN} characters`,
        vars: [MAX_PASSWORD_LEN],
      }),
  ),
  email(): { isValid: boolean; message?: string } {
    return { isValid: false };
  },
  first_name(): { isValid: boolean; message?: string } {
    return { isValid: false };
  },
  phone(): { isValid: boolean; message?: string } {
    return { isValid: false };
  },
  second_name(): { isValid: boolean; message?: string } {
    return { isValid: false };
  },
  display_name(): { isValid: boolean; message?: string } {
    return { isValid: false };
  },
};

export type Schemas = typeof schemas;
