import 'babel-polyfill';

import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars

import { App } from './app';
import { reducer } from './reducer';

import islf from './data/income_share_lowest_fifth';
import issf from './data/income_share_second_fifth';
import istf from './data/income_share_third_fifth';
import isff from './data/income_share_fourth_fifth';
import ishf from './data/income_share_highest_fifth';
import ist5p from './data/income_share_top_5p';

const initialState = {
    data: {
        chart1data: [ 4, 8, 12, 16, 20 ],
        is_lfdata: islf,
        is_sfdata: issf,
        is_tfdata: istf,
        is_ffdata: isff,
        is_hfdata: ishf,
        is_t5pdata: ist5p
    }
}

export const store = createStore(reducer, initialState, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
}

render();
