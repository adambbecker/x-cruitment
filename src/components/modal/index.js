// =========================================
// Modal
// ----
// Description
// =========================================
'use strict';

// ---- External Dependencies ----
var React = require('react/addons');
var _merge = require('lodash/object/merge');
var _filter = require('lodash/collection/filter');
var _findWhere = require('lodash/collection/findWhere');
var _sortyBy = require('lodash/collection/sortBy');
var _camelCase = require('lodash/string/camelCase');
var _cloneDeep = require('lodash/lang/cloneDeep');

// ---- Data ----
var people = require('../../data/people');

// ---- Internal Dependencies ----
var Banner = require('../banner');
var People = require('../people');
var Person = require('../people/person');
var Search = require('../search');

// ---- Styles ----
var bgImageURL = require('./bg_grunge.jpg');
require('./style.scss');

// ---- React Class ----
var Modal = React.createClass({

  getInitialState: function() {
    var sortedPeople = _sortyBy(people, function(person) {
      return person.name;
    });

    var augmentedPepoleData = sortedPeople.map(function(person) {
      return _merge(person, {
        cameledName: _camelCase(person.name)
      });
    });

    return {
      people: augmentedPepoleData,
      searchFocused: false,
      searchValue: ''
    };
  },

  render: function () {
    var modalStyles = { backgroundImage: 'url(' + bgImageURL + ')' };
    var filteredPeople;

    if (this.state.searchValue !== '') {
      filteredPeople = _filter(this.state.people, function(person) {
        var loweredSearch = this.state.searchValue.toLowerCase();

        return person.name.toLowerCase().indexOf(loweredSearch) > -1 || person.character.toLowerCase().indexOf(loweredSearch) > -1;
      }.bind(this));
    } else {
      filteredPeople = this.state.people;
    }

    var peopleElems = filteredPeople.map(function(person, index) {
      return (
        <Person
          key={ person.cameledName }
          name={ person.name }
          cameledName={ person.cameledName }
          location={ person.location }
          avatar={ person.avatar }
          recruited={ person.recruited }
          onClick={ this._handleRecruitClick(person.cameledName) } />
      );
    }, this);

    return (
      <div className="modal" style={ modalStyles }>
        <Banner>X-Cruitment</Banner>
        <Search focused={ this.state.searchFocused }>
          <input
            className="search-input"
            type="text"
            value={ this.state.searchValue }
            placeholder="Find Recruit..."
            onFocus={ this._handleSearchFocus }
            onBlur={ this._handleSearchBlur }
            onChange={ this._handleSearchChange } />
        </Search>
        <People>
          { peopleElems }
        </People>
      </div>
    );
  },

  // Handlers
  // ------------
  _handleSearchFocus: function() {
    this.setState({
      searchFocused: true
    });
  },

  _handleSearchBlur: function() {
    this.setState({
      searchFocused: false
    });
  },

  _handleSearchChange: function(e) {
    this.setState({
      searchValue: e.target.value
    });
  },

  _handleRecruitClick: function(cameledName) {
    return function() {
      var clonedPeople = _cloneDeep(this.state.people);
      _findWhere(clonedPeople, { cameledName: cameledName }).recruited = true;

      this.setState({
        people: clonedPeople
      });
    }.bind(this);
  }

});

// ==== Module Export ====
module.exports = Modal;
