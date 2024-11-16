import './ChatPageLayout.scss';

export const template = `
  <div class="chat-page-layout">
    <aside class="chat-page-layout__aside position-relative">
      <div class="chat-page-layout__controls wrapper wrapper--10_10">
         {{{ controls }}}
      </div>
      <div class="wrapper">
        {{{ contacts }}}  
      </div>
    </aside>
    <main class="message-list-main">
      <div class="message-list-header wrapper wrapper--10_10">
        <div class="message-list-header__container">
        <div class="message-list-header__user-row">
         <div class="avatar">
            <img class="avatar__img" src="{{ avatar }}" alt="User avatar"/>
          </div>
          <p class="typography-paragraph">username</p>
        </div>
        {{{ menu }}}
        </div>
      </div>
      <div class="wrapper message-list wrapper--10_10">
        <div class="message-list__fill"></div>
        {{{ messages }}}
      </div>
      <div class="wrapper wrapper--10_10">
        {{{ input }}}
      </div>
    </main>
  </div>
`;
