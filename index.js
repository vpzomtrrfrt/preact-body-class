'use strict';

var React = require('react');
var withSideEffect = require('react-side-effect');
var PropTypes = require('prop-types');

function splitClassName(className) {
  return className.split(/\s+/);
}

function reducePropsToState(propsList) {
  return propsList
    .map(function(props) {
      return props.className;
    })
    .filter(function(value, index, self) {
      return self.indexOf(value) === index;
    })
    .join(' ');
}

function handleStateChangeOnClient(stringClassNames) {
  // Find the classNames on the body that we haven't added
  var currentClassNames = splitClassName(
    document.body.className
  ).filter(function(className) {
    return BodyClassName.addedClassNames.indexOf(className) === -1;
  });

  // Add "untracked" classNames with our classNames
  var newClassNames = currentClassNames
    .concat(splitClassName(stringClassNames))
    .map(function(str) {
      return str.trim();
    })
    .filter(Boolean)
    .join(' ');

  BodyClassName.addedClassNames = newClassNames;
  document.body.className = newClassNames;
}

function BodyClassName(props) {
  if (props.children) {
    return React.Children.only(props.children);
  } else {
    return null;
  }
}

BodyClassName.addedClassNames = [];
BodyClassName.displayName = 'BodyClassName';
BodyClassName.propTypes = {
  className: PropTypes.string.isRequired,
};

module.exports = withSideEffect(reducePropsToState, handleStateChangeOnClient)(
  BodyClassName
);
