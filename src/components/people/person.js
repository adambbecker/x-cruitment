// =========================================
// PeoplePerson
// ----
// Description
// =========================================
'use strict';

// ---- External Dependencies ----
var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var classNames = require('classnames');

// ---- Internal Dependencies ----
var Badge = require('./badge');

// ---- Styles ----
require('./style.scss');

// ---- React Class ----
var PeoplePerson = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    cameledName: React.PropTypes.string.isRequired,
    location: React.PropTypes.string.isRequired,
    avatar: React.PropTypes.string.isRequired,
    recruited: React.PropTypes.bool.isRequired
  },

  render: function () {
    var personClasses = classNames({
      'person': true,
      'is-recruited': this.props.recruited
    });

    return (
      <li className={ personClasses } style={ this.props.style } onClick={ this.props.onClick } onTouchTap={ this.props.onClick }>
        <figure className="person-avatar">
          <img src={ this.props.avatar } className="person-avatar-img" />
        </figure>
        <div className="person-details">
          <h4 className="person-name ellipsis">{ this.props.name }</h4>
          <p className="person-location ellipsis">{ this.props.location }</p>
        </div>
        <ReactCSSTransitionGroup transitionName="recruitment">
          { this._getRecruitment() }
        </ReactCSSTransitionGroup>
      </li>
    );
  },

  // Getters
  // ------------
  _getRecruitment: function() {
    if (this.props.recruited) {
      return ( <div key={ 'stamp-' + this.props.cameledName } className="person-stamp" onClick={ this._handleBadgeClick }>Recruited</div> );
    } else {
      return ( <Badge key={ 'badge-' + this.props.cameledName } /> );
    }
  }

});

// ==== Module Export ====
module.exports = PeoplePerson;
