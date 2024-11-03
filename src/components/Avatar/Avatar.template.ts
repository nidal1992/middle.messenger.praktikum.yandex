import './Avatar.scss';

export const template = `
  <div class="avatar {{#if big}} avatar--big{{/if}}">
    <img class="avatar__img" src="{{ src }}" alt="User avatar"/>
  </div>
`;
