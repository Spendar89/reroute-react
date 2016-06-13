'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rerouteCore = require('reroute-core');

var _rerouteCore2 = _interopRequireDefault(_rerouteCore);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connect(mapStateToProps, mapRouteToProps) {
  return function (WrappedComponent) {
    var routeProps = mapRouteToProps(function (e) {
      return _rerouteCore2.default.route(e);
    });

    return function (_React$Component) {
      _inherits(Provider, _React$Component);

      function Provider() {
        _classCallCheck(this, Provider);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Provider).apply(this, arguments));
      }

      _createClass(Provider, [{
        key: 'handleCommit',
        value: function handleCommit() {
          var state = arguments.length <= 0 || arguments[0] === undefined ? _rerouteCore2.default.state : arguments[0];

          this.setState(mapStateToProps(state, this.props));
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          _rerouteCore2.default.on('commit', this.handleCommit.bind(this));

          this.handleCommit();
        }
      }, {
        key: 'shouldComponentUpdate',


        // TODO: determine if this implementation
        // is more efficient than converting to
        // immutable and merging before check
        value: function shouldComponentUpdate(_, nextState) {
          var currentState = this.state || {};

          // values are immutable, so reference
          // equality check works
          for (var k in nextState) {
            if (nextState[k] !== currentState[k]) {
              return true;
            };
          };

          // account for edge case where keys are removed
          // from state
          return Object.keys(nextState).length !== Object.keys(currentState).length;
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state, routeProps));
        }
      }]);

      return Provider;
    }(_react2.default.Component);
  };
};