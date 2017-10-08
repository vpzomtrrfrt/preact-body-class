'use strict';

var React = require('react');
var withSideEffect = require('react-side-effect');
var PropTypes = require('prop-types');

let classNameCache = []

function splitClassName(className) {
  return className.split(/\s+/)
}

function reducePropsToState(propsList) {
  return propsList.map(function(props) {
    return props.className;
  }).filter(function (value, index, self) {
    return self.indexOf(value) === index;
  }).join(' ');
}

function handleStateChangeOnClient(stringClassNames) {
  // get current body class as array
  let currentClassNames = splitClassName(document.body.className)
  
  // remove all past class names
  for (let i = 0; i < classNameCache.length; i++) {
    const idx = currentClassNames.indexOf(classNameCache[i]);
    if (idx !== -1) {
      currentClassNames.splice(idx, 1);
    }
  }
  
  // append all new ones
  const newClassNames = splitClassName(stringClassNames);
  currentClassNames = currentClassNames.concat(newClassNames);

  // set body class name
  document.body.className = currentClassNames.join(' ').trim();

  // track which class names we added
  classNameCache = newClassNames;
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
