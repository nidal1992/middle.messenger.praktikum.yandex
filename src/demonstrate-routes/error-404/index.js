import Handlebars from 'handlebars/runtime';

import ErrorNotFoundPage from '../../pages/error-404.hbs';

import * as Layouts from '../../layouts/index.js';
import * as Components from '../../components/index.js';
import * as Modules from '../../modules/index.js';

import '../../styles/global.scss';

[Layouts, Modules, Components].forEach((item) => {
  Object.entries(item).forEach(([name, entity]) =>
    Handlebars.registerPartial(name, entity),
  );
});

const root = document.querySelector('#app');

root.innerHTML = ErrorNotFoundPage();
