'use strict';

var React = require('react'),
  withSideEffect = require('react-side-effect');

function reducePropsToState(propsList) {
  return propsList.map(function(props) {
    return props.className;
  }).filter(function (value, index, self) {
    return self.indexOf(value) === index;
  }).join(' ');
}

function handleStateChangeOnClient(stringClassNames) {
  document.body.className = stringClassNames || '';
}

var DocumentTitle = React.createClass({
  propTypes: {
    className: React.PropTypes.string.isRequired
  },

  render: function render() {
    if (this.props.children) {
      return React.Children.only(this.props.children);
    } else {
      return null;
    }
  }
});

module.exports = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(DocumentTitle);
