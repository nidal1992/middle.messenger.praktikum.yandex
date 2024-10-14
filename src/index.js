import Handlebars from 'handlebars/runtime';
import './styles/global.scss';

import LoginPage from './pages/login.hbs';

import * as Layouts from './layouts';
import * as Components from './components';
import * as Modules from './modules';

[Layouts, Modules, Components].forEach((item) => {
  Object.entries(item).forEach(([name, entity]) =>
    Handlebars.registerPartial(name, entity),
  );
});

const root = document.querySelector('#app');

root.innerHTML = LoginPage();
