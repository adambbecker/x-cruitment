// =========================================
// Search
// ----
// Description
// =========================================
'use strict';

// ---- External Dependencies ----
var React = require('react/addons');
var classNames = require('classnames');

// ---- Styles ----
require('./style.scss');

// ---- React Class ----
var Search = React.createClass({

  propTypes: {
    focused: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      focused: false
    };
  },

  render: function () {
    var searchConClasses = classNames({
      'search-con': true,
      'is-focused': this.props.focused
    });

    return (
      <div className="search">
        <div className={ searchConClasses }>
          <div className="search-border search-border-top"></div>
          <div className="search-border search-border-bottom"></div>
          <div className="search-border search-border-left"></div>
          <div className="search-border search-border-right"></div>
          <div className="search-icon">
            <div className="search-icon-accent search-icon-accent-top"></div>
            <div className="search-icon-accent search-icon-accent-bottom"></div>
            <div className="search-icon-accent search-icon-accent-left"></div>
            <div className="search-icon-accent search-icon-accent-right"></div>
          </div>
          { this.props.children }
        </div>
      </div>
    );
  },

  // Handlers
  // ------------

});

// ==== Module Export ====
module.exports = Search;
