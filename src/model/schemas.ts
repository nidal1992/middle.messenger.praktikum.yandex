import { s, validator } from '@/utils/validation';

const MIN_LOGIN_LEN = 3;
const MAX_LOGIN_LEN = 20;
const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 40;

export const schemas = {
  login: validator(
    s()
      .required({ message: '*Required field' })
      .latin({ message: '*Only latin characters are allowed' })
      .minLength({
        message: `*Must be at least ${MIN_LOGIN_LEN} characters`,
        vars: [MIN_LOGIN_LEN],
      })
      .maxLength({
        message: `*Must be more than ${MAX_LOGIN_LEN} characters`,
        vars: [MAX_LOGIN_LEN],
      })
      .notOnlyDigit({ message: '*Cannot consist only of numbers' })
      .spaceFree({ message: '*Must not contain spaces' })
      .notSpecSymbols({
        message: '*Invalid characters',
        vars: ['-', '_'],
      }),
  ),
  password: validator(
    s()
      .required({ message: '*Required field' })
      .latin({ message: '*Only latin characters are allowed' })
      .atLeastOneLatinCapitalLetter({ message: '*There must be at least one capital letter' })
      .atLeastOneDigit({ message: '*There must be at least one digit' })
      .minLength({
        message: `*Must be at least ${MIN_PASSWORD_LEN} characters`,
        vars: [MIN_PASSWORD_LEN],
      })
      .maxLength({
        message: `*Must be more than ${MAX_PASSWORD_LEN} characters`,
        vars: [MAX_PASSWORD_LEN],
      }),
  ),
  email: validator(
    s().required({ message: '*Required field' }).email({ message: '*Invalid email format' }),
  ),
  phone: validator(
    s().required({ message: '*Required field' }).phone({ message: '*Invalid phone format' }),
  ),
  first_name: validator(
    s()
      .required({ message: '*Required field' })
      .onlyLetters({ message: '*Digit not allowed' })
      .spaceFree({ message: '*Must not contain spaces' })
      .firstCapitalLetter({ message: '*The first letter must be capitalized' })
      .notSpecSymbols({
        message: '*Invalid characters',
        vars: ['-'],
      }),
  ),
  second_name: validator(
    s()
      .required({ message: '*Required field' })
      .onlyLetters({ message: '*Digit not allowed' })
      .spaceFree({ message: '*Must not contain spaces' })
      .firstCapitalLetter({ message: '*The first letter must be capitalized' })
      .notSpecSymbols({
        message: '*Invalid characters',
        vars: ['-'],
      }),
  ),
  display_name: validator(
    s()
      .required({ message: '*Required field' })
      .latin({ message: '*Only latin characters are allowed' })
      .spaceFree({ message: '*Must not contain spaces' })
      .notSpecSymbols({
        message: '*Invalid characters',
        vars: ['-', '_'],
      }),
  ),
};

export type Schemas = typeof schemas;
