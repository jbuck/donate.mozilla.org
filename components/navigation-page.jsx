import React from 'react';

var NavigationPage = React.createClass({
  render: function() {
    var className = "sequence-page";
    var activePage = this.props.activePage;
    var index = this.props.index;
    if (activePage < index) {
      className += " page-hidden-incomplete";
    } else if (activePage > index) {
      className += " page-hidden-complete";
    } else {
      className += " page-active";
    }
    return (
      <fieldset className={className}>
        {this.props.children}
      </fieldset>
    );
  }
});

module.exports = NavigationPage;