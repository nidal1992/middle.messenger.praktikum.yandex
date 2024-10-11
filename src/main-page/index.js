import Handlebars from 'handlebars/runtime';

import ChatPage from '../pages/chat.hbs';

import * as Layouts from '../layouts';
import * as Components from '../components';
import * as Modules from '../modules';

import '../styles/global.scss';

[Layouts, Modules, Components].forEach((item) => {
  Object.entries(item).forEach(([name, entity]) =>
    Handlebars.registerPartial(name, entity),
  );
});

const root = document.querySelector('#app');

root.innerHTML = ChatPage();
