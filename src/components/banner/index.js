// =========================================
// Banner
// ----
// Description
// =========================================
'use strict';

// ---- External Dependencies ----
var React = require('react/addons');

// ---- Styles ----
var bgImageURL = require('../modal/bg_grunge.jpg');
require('./style.scss');

// ---- React Class ----
var Banner = React.createClass({

  propTypes: {
    children: React.PropTypes.string.isRequired
  },

  render: function () {
    var bannerStyles = {
      backgroundImage: 'url(' + bgImageURL + ')'
    };

    return (
      <div className="banner" style={ bannerStyles }>
        <h1 className="banner-text">
          { this.props.children }
        </h1>
      </div>
    );
  },

  // Heading
  // ------------

});

// ==== Module Export ====
module.exports = Banner;
