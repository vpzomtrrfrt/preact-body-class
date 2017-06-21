'use strict';

var React = require('react');
var withSideEffect = require('react-side-effect');
var PropTypes = require('prop-types');

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

function BodyClassName(props){
  if (props.children) {
    return React.Children.only(props.children);
  } else {
    return null;
  }
}

BodyClassName.displayName = 'BodyClassName';
BodyClassName.propTypes = {
  className: PropTypes.string.isRequired
};

module.exports = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(BodyClassName);
