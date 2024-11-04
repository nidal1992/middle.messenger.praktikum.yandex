import './AuthLayout.scss';

export const template = `
  <main class="auth-layout content-center">
    <div class="auth-layout__form-wrapper wrapper wrapper--60-80">
      <h2 class="typography-title auth-layout__title">
        {{title}}
      </h2>
      {{{children}}}
    </div>
  </main>
`;
