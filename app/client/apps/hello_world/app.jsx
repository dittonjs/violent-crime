import 'babel-polyfill';
import es6Promise from 'es6-promise';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import DevTools from 'atomic-fuel/libs/dev/dev_tools';
import { getInitialSettings } from 'atomic-fuel/libs/reducers/settings';
import jwt from 'atomic-fuel/libs/loaders/jwt';
import configureStore from './store/configure_store';
import Index from './components/layout/index';
import appHistory from './history';

import './styles/styles';
import './libs/d3_parcoords';

// Polyfill es6 promises for IE
es6Promise.polyfill();

class Root extends React.Component {
  render() {
    return (
      <Index />
    )
  }
}


hot(module)(Root);

ReactDOM.render(
  <Root />,
  document.getElementById('main-app'),
);
