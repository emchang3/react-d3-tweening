import 'babel-polyfill';

import { createElement } from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';

import { App } from './app';

render(createElement(App), document.getElementById('root'));
