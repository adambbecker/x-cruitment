'use strict';

var React = require('react');
var App = require('./components/app');

React.initializeTouchEvents(true);
React.render( <App />, document.getElementById('main') );
