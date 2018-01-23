'use strict';

var preact = require('preact');
var withSideEffect = require('preact-side-effect');
var PropTypes = require('proptypes');

function reducePropsToState(propsList) {
	return propsList.map(function(props) {
		return props.class;
	}).filter(function (value, index, self) {
		return self.indexOf(value) === index;
	}).join(' ');
}

function handleStateChangeOnClient(stringClassNames) {
	document.body.className = stringClassNames || '';
}

function BodyClass(props){
	if (props.children) {
		if(props.children.length !== 1) throw new Error("Expected only one child of BodyClass");
		return props.children;
	} else {
		return null;
	}
}

BodyClass.displayName = 'BodyClass';
BodyClass.propTypes = {
	class: PropTypes.string.isRequired
};

module.exports = withSideEffect(
	reducePropsToState,
	handleStateChangeOnClient
)(BodyClass);
