'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('react-native'),
    View = _require.View,
    Text = _require.Text,
    Linking = _require.Linking,
    TouchableHighlight = _require.TouchableHighlight;

var A = function (_React$PureComponent) {
  _inherits(A, _React$PureComponent);

  function A() {
    _classCallCheck(this, A);

    return _possibleConstructorReturn(this, (A.__proto__ || Object.getPrototypeOf(A)).apply(this, arguments));
  }

  _createClass(A, [{
    key: 'render',
    value: function render() {
      var _props = {};
      var style = this.props.style || {};
      if (style.underlayColor) {
        _props.underlayColor = style.underlayColor;
        delete style.underlayColor;
      }

      if (style.activeOpacity) {
        _props.activeOpacity = style.activeOpacity;
        delete style.activeOpacity;
      }

      var url = this.props.href;
      var attr = this.props.attr || {};
      var actions = function actions(params) {};
      if (typeof url == 'string') {
        actions = function actions() {
          return Linking.canOpenURL(url).then(function (supported) {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log('无法打开该URI: ' + url);
            }
          });
        };
      }

      if (typeof url == 'function') {
        actions = url;
      }

      var children = function (child) {
        if (typeof child == 'string' || typeof child == 'number') {
          return React.createElement(
            Text,
            { style: style.itemText || {} },
            child
          );
        } else {
          return child;
        }
      }(this.props.children);

      return React.createElement(
        TouchableHighlight,
        _extends({
          attr: attr,
          style: style,
          onPress: actions
        }, _props),
        children
      );
    }
  }]);

  return A;
}(React.PureComponent);

module.exports = A;
//# sourceMappingURL=../maps/htmltags/a.js.map
