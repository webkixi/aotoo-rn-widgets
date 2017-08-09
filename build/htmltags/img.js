'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('react-native'),
    View = _require.View,
    Text = _require.Text,
    Image = _require.Image;

var Img = function (_React$Component) {
  _inherits(Img, _React$Component);

  function Img() {
    _classCallCheck(this, Img);

    return _possibleConstructorReturn(this, (Img.__proto__ || Object.getPrototypeOf(Img)).apply(this, arguments));
  }

  _createClass(Img, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (typeof this.props.src == 'string') {
        var imgIns = function imgIns() {
          var src = _this2.props.src;
          if (src.indexOf('http:') == 0) {
            return React.createElement(Image, { style: _this2.props.style || {}, source: { uri: src } });
          } else {
            return React.createElement(Image, { style: _this2.props.style || {}, source: require(src) });
          }
        };
        return imgIns();
      } else {
        return React.createElement(
          View,
          null,
          React.createElement(
            Text,
            null,
            '?'
          )
        );
      }
    }
  }]);

  return Img;
}(React.Component);

module.exports = Img;
//# sourceMappingURL=../maps/htmltags/img.js.map
