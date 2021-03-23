import React from 'react';
import Router from './router';
import { Provider } from 'react-redux';
import store from './store';
declare var global: { HermesInternal: null | {} };

export default function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}
