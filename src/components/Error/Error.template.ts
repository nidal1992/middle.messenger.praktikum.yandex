import './Error.scss';

export const template = `
  <main class='error content-center'>
    <h2 class="error__code">{{ code }}</h2>
    <p class="error__message">{{ message }}</p>
    {{{ children }}}
  </main>
`;
