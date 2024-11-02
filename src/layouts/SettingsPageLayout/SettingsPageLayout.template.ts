import './SettingsPageLayout.scss';

export const template = `
  <main class="settings-layout content-center">
    <div class="wrapper wrapper--60-80 settings-layout__wrapper">
      {{{avatar}}}
      <div class="settings-layout__content full">
        {{{children}}}
      </div>
      <div class="settings-layout__link">
        {{{link}}}
      </div>
      <div class="settings-layout__controls">
        {{{controls}}}
      </div>
    </div>
  </main>
`;
