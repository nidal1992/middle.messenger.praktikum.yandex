import './ContactRow.scss';

export const template = `
  <div class="chat-row">
    <div class="chat-row__avatar">
      <img class="chat-row__avatar-img" src="{{ src }}" alt="User {{login}} avatar"/>
    </div>
    <div class="chat-row__text-content-wrapper">
      <div class="chat-row__text-content-title">
        <h3 class="typography-paragraph">{{ login }}</h3>
        <span>{{ time }}</span>
      </div>
      <p class="typography-small">{{ message }}</p>
    </div>
  </div>
`;
