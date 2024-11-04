import { Input } from '@/components/Input';

export const getAllInputsData = (inputs: Input[]) =>
  inputs.reduce(
    (result, input) => {
      const { value, name } = input.getProps();
      Object.defineProperty(result, name!, { value });
      return result;
    },
    <Record<string, string>>{},
  );
