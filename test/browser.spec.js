/*jshint newcap: false */
/*global global, describe, it, afterEach, before, after */
'use strict';
var expect = require('expect.js'),
  enzyme = require('enzyme'),
  React = require('react'),
  ReactDOM = require('react-dom'),
  BodyClassName = require('../'),
  jsdom = require('jsdom').jsdom;

describe('BodyClassName (in a browser)', function() {
  global.beforeEach(function() {
    BodyClassName.canUseDOM = true;
  });

  it('changes the document body class name on mount', function() {
    var className = 'hello world';
    var Component = enzyme.mount(
      React.createElement(BodyClassName, { className: className })
    );
    expect(global.document.body.className).to.equal(className);
    Component.unmount();
  });

  it('does not erase existing body class names', function() {
    global.document.body.className = 'testing';
    var className = 'hello world';
    var Component = enzyme.mount(
      React.createElement(BodyClassName, { className: className })
    );
    expect(global.document.body.className).to.equal('testing hello world');
    Component.unmount();
  });

  it('changes the document body class name on unmount', function() {
    global.document.body.className = 'leavemehere';
    var className = 'yoohoo';
    var Component = enzyme.mount(
      React.createElement(BodyClassName, { className: className })
    );
    expect(global.document.body.className).to.equal('leavemehere yoohoo');
    Component.unmount();
    expect(global.document.body.className).to.equal('leavemehere');
  });

  it('keeps its own internal state', function() {
    global.document.body.className = 'alreadyhere';
    var Component = enzyme.mount(
      React.createElement(BodyClassName, { className: 'test1' })
    );
    expect(global.document.body.className).to.equal('alreadyhere test1');
    Component.unmount();
  });

  it('and its own internal state works as expected', function() {
    global.document.body.className = 'alreadyhere';
    var Component = enzyme.mount(
      React.createElement(BodyClassName, { className: 'test1' })
    );
    expect(global.document.body.className).to.equal('alreadyhere test1');
    var Component2 = enzyme.mount(
      React.createElement(BodyClassName, { className: 'test2' })
    );
    expect(global.document.body.className).to.equal('alreadyhere test1 test2');
    Component.unmount();
    Component2.unmount();
  });

  it('supports nesting, gathering all classNames used', function(done) {
    global.document.body.className = '';
    var called = false;
    var firstName = 'foo';
    var secondName = 'bar';
    var thirdName = 'baz';
    class Third extends React.Component {
      componentDidMount() {
        setTimeout(function() {
          expect(called).to.be(true);
          expect(global.document.body.className).to.equal(
            [thirdName, secondName, firstName].join(' ')
          );
          done();
        });
      }
      render() {
        return React.createElement(BodyClassName, { className: firstName });
      }
    }
    class Second extends React.Component {
      render() {
        return React.createElement(
          BodyClassName,
          { className: secondName },
          React.DOM.div(null, React.createElement(Third))
        );
      }
    }
    class First extends React.Component {
      componentDidMount() {
        called = true;
      }
      render() {
        return React.createElement(
          BodyClassName,
          { className: thirdName },
          React.DOM.div(null, React.createElement(Second))
        );
      }
    }
    enzyme.mount(React.createElement(First), global.document.body);
  });
});
