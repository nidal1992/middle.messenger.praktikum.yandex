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
        id="{{ name }}"
        name="{{ name }}"
        type="{{ type }}"
        value="{{ value }}"
        class="input__element"
        {{#if required}}required{{/if}}
        {{#if autocomplete}}autocomplete{{/if}}
        placeholder="{{ placeholder }}"
      >
    </div>
    {{#if error}}
      <p class="input__error">{{error}}</p>
    {{/if}}
  </label>
`;
