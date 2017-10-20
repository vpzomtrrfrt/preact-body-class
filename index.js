'use strict';

var React = require('react');
var withSideEffect = require('react-side-effect');
var PropTypes = require('prop-types');

function splitClassName(className) {
  return className.split(/\s+/);
}

function clean(classNames) {
  return splitClassName(classNames)
    .map(function(str) {
      return str.trim();
    })
    .filter(Boolean);
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
  var untracked = clean(document.body.className).filter(function(className) {
    return BodyClassName.addedClassNames.indexOf(className) === -1;
  });

  var ours = clean(stringClassNames);
  BodyClassName.addedClassNames = ours;

  // Add "untracked" classNames with our classNames
  var newClassNames = untracked.concat(ours).join(' ');

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
