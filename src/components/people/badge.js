// =========================================
// PeopleBadge
// ----
// Description
// =========================================
'use strict';

// ---- External Dependencies ----
var React = require('react/addons');

// ---- Styles ----
require('./style.scss');

// ---- React Class ----
var PeopleBadge = React.createClass({

  render: function () {
    return (
      <div className="person-badge">
        <div className="badge-circles">
          <div className="badge-circle badge-accent-circle"></div>
          <div className="badge-circle badge-accent-circle"></div>
          <div className="badge-circle badge-accent-star"></div>
          <div className="badge-circle badge-accent-star"></div>
          <div className="badge-circle badge-inner-circle"></div>
        </div>
        <h5 className="badge-banner">Recruit</h5>
      </div>
    );
  },

  // Heading
  // ------------

});

// ==== Module Export ====
module.exports = PeopleBadge;
