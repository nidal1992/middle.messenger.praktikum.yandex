import './Button.scss';

export const template = `
  <button class="button button--{{ variant }} {{ className }}"
    {{#if disabled }}disabled{{/if}}
    {{#if type }}type="{{ type }}"{{/if}}
    {{#if form }}form="{{ form }}"{{/if}}
    {{#if id }}id="{{ id }}"{{/if}}
  >
    {{{ children }}}
  </button>
`;
