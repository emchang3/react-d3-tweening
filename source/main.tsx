import 'babel-polyfill';

import * as React from 'react'; // eslint-disable-line no-unused-vars
import * as ReactDOM from 'react-dom';

import { App } from './app';

declare global {
    interface Window {
        devToolsExtension: () => any;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
