export const inputTemplate = `
  <label class="input {{#if icon }} input--icon{{/if}}{{#if label }} input--label{{/if}} {{ className }}">
    {{#if label }}
      <span class="input__label">
        {{ label }}
      </span>
    {{/if}}
    
    <div class="input__element-wrapper">
      {{#if icon }}
        <span class="input__icon">
          {{{ icon }}}
        </span>
      {{/if}}
  
      <input 
        id="{{ id }}"
        name="{{ name }}"
        type="{{ type }}"
        value="{{ value }}"
        {{#if required}}required{{/if}}
        placeholder="{{ placeholder }}"
        class="input__element"
      >
    </div>
    {{#if error}}
      <p class="input__error">{{error}}</p>
    {{/if}}
  </label>
`;
