import './SettingsPageLayout.scss';

export const template = `
  <main class="settings-layout content-center">
    <div class="wrapper wrapper--60-80 settings-layout__wrapper">
      {{{avatar}}}
      <div class="settings-layout__content">
        {{{children}}}
      </div>
      <div class="settings-layout__link">
        {{{link}}}
      </div>
      {{#if controls}}
        <div class="settings-layout__controls">
          {{{controls}}}
        </div>
      {{/if}}
    </div>
  </main>
`;
