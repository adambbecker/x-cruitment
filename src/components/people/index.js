// =========================================
// People
// ----
// Description
// =========================================
'use strict';

// ---- External Dependencies ----
var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// ---- Internal Dependencies ----
// none

// ---- Styles ----
require('./style.scss');

// ---- React Class ----
var People = React.createClass({

  propTypes: {
    children: React.PropTypes.array.isRequired
  },

  render: function () {
    return (
      <ReactCSSTransitionGroup transitionName="person-trans" component="ul" className="people">
        { this.props.children }
      </ReactCSSTransitionGroup>
    );
  },

  // Heading
  // ------------

});

// ==== Module Export ====
module.exports = People;
