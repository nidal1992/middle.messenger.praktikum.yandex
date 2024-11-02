declare type SimpleMap = Record<string | symbol, unknown>;
declare type FormState<Keys extends string> = Record<Keys, { value: string; error?: string }> & {
  isValid?: boolean;
};
