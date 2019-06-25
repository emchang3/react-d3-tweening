import 'babel-polyfill';

import { createElement } from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';

import { App } from './app';

declare global {
    interface Window {
        devToolsExtension: () => any;
    }
}

render(createElement(App), document.getElementById('root'));
