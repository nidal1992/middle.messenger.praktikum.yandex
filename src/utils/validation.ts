export type ValidationHandler = (value: string) => { isValid: boolean; message?: string };
type SchemeFunction = ReturnType<typeof s>;
type HandlerData<T = string> = {
  message?: string;
  vars?: T[];
};

export function s() {
  const validationHandlers = new Set<ValidationHandler>();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  function __addHandler(predicate: (value: string) => boolean, message?: string) {
    validationHandlers.add((value) => {
      const result = {
        message,
        isValid: false,
      };

      const isValid = predicate(value);

      if (isValid) {
        result.message = '';
        result.isValid = true;
      }

      return result;
    });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  function __validate(value: string) {
    for (const cb of validationHandlers.values()) {
      const result = cb(value);

      if (!result.isValid) {
        return result;
      }
    }
    return { isValid: true };
  }

  function required({ message }: HandlerData): SchemeFunction {
    __addHandler((val) => Boolean(val.length), message);
    return this;
  }

  function latin({ message }: HandlerData): SchemeFunction {
    __addHandler((val) => !val.replaceAll(/[^а-я]/gi, '').length, message);
    return this;
  }

  function notOnlyDigit({ message }: HandlerData): SchemeFunction {
    __addHandler((val) => {
      const digits = val.replaceAll(/\D/g, '');
      return digits.length !== val.length && Boolean(val.length);
    }, message);

    return this;
  }

  function spaceFree({ message }: HandlerData): SchemeFunction {
    __addHandler((value) => !/\s/gi.test(value), message);
    return this;
  }

  function notSpecSymbols({ message, vars = [] }: HandlerData): SchemeFunction {
    __addHandler((val) => {
      const regExp = new RegExp(`[^a-zа-я0-9${vars.join('')}]`, 'gi');
      return !regExp.test(val);
    }, message);

    return this;
  }

  function minLength({ message, vars: [minLen = 1] = [] }: HandlerData<number>): SchemeFunction {
    __addHandler((val) => val.length >= minLen, message);
    return this;
  }

  function maxLength({
    message,
    vars: [maxLen = Infinity] = [],
  }: HandlerData<number>): SchemeFunction {
    __addHandler((val) => val.length <= maxLen, message);
    return this;
  }

  return {
    latin,
    required,
    minLength,
    spaceFree,
    maxLength,
    notAllDigit: notOnlyDigit,
    notSpecSymbols,
    __validate,
  };
}

export function validator(schema: ReturnType<typeof s>) {
  return (value: string) => schema.__validate(value);
}
