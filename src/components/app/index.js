// =========================================
// App
// ----
// Base component included with by main.js
// =========================================
'use strict';

// ---- External Dependencies ----
var React = require('react/addons');

// ---- Internal Dependencies ----
var Modal = require('../modal');
var Banner = require('../banner');

// ---- Styles / Images ----
var imageURLs = {
  appBg: require('../modal/bg_grunge.jpg'),
  app: {
    halfTone: require('./bg_halftone.svg'),
    grunge: require('./bg_grunge.jpg')
  }
};
require('abb-reset-css');
require('./style.scss');

// ---- React Class ----
var App = React.createClass({

  render: function () {
    var appBgStyles = {
      backgroundImage: 'url(' + imageURLs.appBg + ')'
    };
    var appStyles = {
      backgroundImage: 'url(' + imageURLs.app.halfTone + '), url(' + imageURLs.app.grunge + ')',
      backgroundRepeat: 'no-repeat, repeat',
      backgroundSize: 'cover, auto'
    };

    return (
      <div className="app-bg" style={ appBgStyles }>
        <div className="app" style={ appStyles }>
          <Modal />
        </div>
      </div>
    );
  },

  // Heading
  // ------------

});

// ==== Module Export ====
module.exports = App;
