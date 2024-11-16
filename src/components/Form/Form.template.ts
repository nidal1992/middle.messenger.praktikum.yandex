import './Form.scss';

export const template = `
  <form id="{{ id }}" class="form {{ className }}">
    <div class="form__inputs {{ inputsLayout }}">
      {{{ inputs }}}
    </div>
    {{{ children }}}
  </form>
`;
