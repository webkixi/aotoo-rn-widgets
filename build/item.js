'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var uniqueId = Aotoo.uniqueId;
var merge = Aotoo.merge;

var _require = require('react-native'),
    FlatList = _require.FlatList,
    View = _require.View,
    Text = _require.Text,
    Linking = _require.Linking,
    TouchableHighlight = _require.TouchableHighlight,
    Image = _require.Image;

var _require2 = require('./htmltags'),
    Ul = _require2.Ul,
    Li = _require2.Li,
    A = _require2.A,
    Img = _require2.Img,
    Div = _require2.Div;

var $uuid = function $uuid() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'native_';

  var _time = new Date().getTime().toString().substring(1);
  return prefix + _time;
};

function dealWithLis(lis, $stys, _sty, clsName) {
  var _sty_ul = $stys['ul'] || $stys['itemLi-ul'] || {};
  var _sty_li = $stys['li'] || $stys['itemLi-li'] || {};
  var _sty_text = $stys.itemText || {};

  if (clsName && $stys[clsName]) {
    var $clsName = $stys[clsName];
    _sty_ul = $clsName['ul'] || $clsName['itemLi-ul'] || _sty_ul;
    _sty_li = $clsName['li'] || $clsName['itemLi-li'] || _sty_li;
    _sty_text = $clsName['itemText'] || _sty_text;
  }

  var $lis = [];
  if (lis && Array.isArray(lis)) {
    $lis = lis.map(function (item, ii) {
      var $key = $uuid('lis_' + ii + '_');
      var _typeof = typeof item === 'undefined' ? 'undefined' : _typeof2(item);
      switch (_typeof) {
        case 'string':
          item = React.createElement(
            Text,
            { style: _sty_text },
            item
          );
          return React.createElement(
            Li,
            { key: $key, style: _sty_li },
            item
          );
          break;
        case 'number':
          item = React.createElement(
            Text,
            { style: _sty_text },
            item
          );
          return React.createElement(
            Li,
            { key: $key, style: _sty_li },
            item
          );
          break;
        case 'object':
          if (Array.isArray(item)) {
            return dealWithLis(item, $stys, _sty, clsName);
          } else {
            if (React.isValidElement(item)) {
              return React.cloneElement(item, { key: $key });
            } else {
              var itemStyleSheet = $stys['item'] || {};
              if (item && item['className'] && $stys[item['className']]) {
                itemStyleSheet = $stys[item['className']]['item'];
              }
              var tempItem = myItemHeader(item, $stys, itemStyleSheet);
              return React.cloneElement(tempItem, { key: $key });
            }
          }
          break;
      }
    });
  }

  return React.createElement(
    Ul,
    { style: _sty_ul },
    $lis
  );
}

function myItemHeader(item, _stys, _sty) {
  var $header = void 0;
  var $lis = void 0;
  var $stys = JSON.parse(JSON.stringify(_stys));

  if (React.isValidElement(item)) {
    $header = item;
  } else if (typeof item == 'string' || typeof item == 'number') {
    var $sty = $stys && $stys.itemText || {};
    $header = React.createElement(
      Text,
      { style: $sty },
      item
    );
  } else {
    var title = item.title,
        url = item.url,
        img = item.img,
        id = item.id,
        li = item.li,
        itemStyle = item.itemStyle,
        attr = item.attr,
        className = item.className;

    $stys = merge($stys, itemStyle);
    var _sty_a = $stys.itemA || {};
    var _sty_text = $stys.itemText || {};
    var _sty_img = $stys.itemImg || {};
    var _sty_box = $stys.itemBox || {};

    if (className && $stys[className]) {
      var $clsName = $stys[className];
      _sty_a = $clsName['itemA'] || _sty_a;
      _sty_text = $clsName['itemText'] || _sty_text;
      _sty_img = $clsName['itemImg'] || _sty_img;
      _sty_box = $clsName['itemBox'] || _sty_box;
    }

    if (title) {
      if (typeof title == 'number' || typeof title == 'string') {
        title = React.createElement(
          Text,
          { style: _sty_text },
          title
        );
      }
      // if (url&&typeof url == 'string') {
      if (url) {
        // title url
        $header = React.createElement(
          A,
          { href: url, style: _sty_a },
          title
        );
        if (typeof img == 'string') {
          if (li) {
            $lis = dealWithLis(li, $stys, _sty, className);
            // title url img li
            // $header = <Div style={_sty_box}>{title}<A href={url} style={_sty_a}><Img src={img} style={_sty_img}/></A>{$lis}</Div>
            return React.createElement(
              Div,
              { style: _sty },
              title,
              React.createElement(
                A,
                { href: url, style: _sty_a },
                React.createElement(Img, { src: img, style: _sty_img })
              ),
              $lis
            );
          } else {
            // title url img
            $header = React.createElement(
              A,
              { href: url, style: _sty_a },
              title,
              React.createElement(Img, { src: img, style: _sty_img })
            );
          }
        } else if (li) {
          $lis = dealWithLis(li, $stys, _sty, className);
          // title url li
          // $header = <Div style={_sty_box}><A href={url} style={_sty_a}>{title}</A>{$lis}</Div>
          return React.createElement(
            Div,
            { style: _sty },
            React.createElement(
              A,
              { href: url, style: _sty_a },
              title
            ),
            $lis
          );
        }
      } else if (img) {
        // if (typeof img=='string') {
        if (li) {
          $lis = dealWithLis(li, $stys, _sty, className);
          // title img li 
          // $header = <Div style={_sty_box}>{title}<Img src={img} style={_sty_img} />{$lis}</Div>
          return React.createElement(
            Div,
            { style: _sty },
            title,
            React.createElement(Img, { src: img, style: _sty_img }),
            $lis
          );
        } else {
          // title img
          // $header = <Div style={_sty_box}>{title}<Img src={img} style={_sty_img}/></Div>
          return React.createElement(
            Div,
            { style: _sty },
            title,
            React.createElement(Img, { src: img, style: _sty_img })
          );
        }
      } else if (li) {
        $lis = dealWithLis(li, $stys, _sty, className);

        // title li
        // $header = <Div style={_sty_box}>{title}{$lis}</Div>
        return React.createElement(
          Div,
          { style: _sty },
          title,
          $lis
        );
      } else {
        // title
        // $header = <Div>{title}</Div>
        $header = title;
      }
    }

    //  ===== 

    else if (typeof img == 'string') {
        if (url && typeof url == 'string') {
          if (li) {
            $lis = dealWithLis(li, $stys, _sty, className);
            // img url li
            // $header = <Div style={_sty_box}><A href={url} style={_sty_a}><Img src={img} style={_sty_img} /></A>{$lis}</Div>
            return React.createElement(
              Div,
              { style: _sty },
              React.createElement(
                A,
                { href: url, style: _sty_a },
                React.createElement(Img, { src: img, style: _sty_img })
              ),
              $lis
            );
          } else {
            // img url
            $header = React.createElement(
              A,
              { href: url, style: _sty_a },
              React.createElement(Img, { src: img, style: _sty_img })
            );
          }
        } else if (li) {
          $lis = dealWithLis(li, $stys, _sty, className);
          // img li
          // $header = <Div style={_sty_box}><Img src={img} style={_sty_img} />{$lis}</Div>
          return React.createElement(
            Div,
            { style: _sty },
            React.createElement(Img, { src: img, style: _sty_img }),
            $lis
          );
        } else {
          // img
          $header = React.createElement(Img, { src: img, style: _sty_img });
        }
      }

      // ======

      else if (li) {
          $lis = dealWithLis(li, $stys, _sty, className);
          // li
          $header = $lis;
        }

        // ======

        else {
            $header = title;
          }
  }

  return React.createElement(
    Div,
    { style: _sty },
    $header
  );
}

/**
 * type  ?
 * title
 * id
 * img
 * url
 * value
 * content
 *
 *
 * body: []
 * footer: []
 * dot:: []
 */

var Fox = function (_React$Component) {
  _inherits(Fox, _React$Component);

  function Fox(props) {
    _classCallCheck(this, Fox);

    var _this = _possibleConstructorReturn(this, (Fox.__proto__ || Object.getPrototypeOf(Fox)).call(this, props));

    _this.sty = _this.props.style;
    _this.stys = _this.props.styles;
    return _this;
  }

  _createClass(Fox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var element = this.element;
      var props = this.props;
      var item = props;

      if (item.item.attr) {
        element.attr = item.item.attr;
      }
      if (this.props.itemMethod) {
        this.props.itemMethod.call(element);
      }
    }
  }, {
    key: 'preRender',
    value: function preRender() {
      return myItemHeader(this.props.item, this.stys, this.sty);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var $key = $uuid('header_item_' + '_');
      var fill = this.preRender();
      // return (
      //   <View style={this.sty} ref={ e=>this.element=e } key={$key}>{fill}</View>
      // )
      return React.cloneElement(fill, { key: $key, ref: function ref(e) {
          return _this2.element = e;
        } });
    }
  }]);

  return Fox;
}(React.Component);

var $itemStyle = {
  item: { // view
    opacity: 1
  },
  itemText: {
    color: '#3c73b9'
  },
  itemA: {
    backgroundColor: '#15ee6c',
    underlayColor: '#e3e3e3',
    activeOpacity: 0.5
  }, // view
  itemImg: {
    width: 40,
    height: 40
  },
  'itemLi-ul': {
    marginLeft: 15
  },
  'itemLi-li': {}
};

module.exports = function (item, stys, props) {
  var theMethod = item.itemMethod || props && props.itemMethod;
  delete item.itemMethod;

  var $$itemStyle = merge({}, $itemStyle, stys);
  var itemSty = $$itemStyle.item;
  delete $$itemStyle.item;
  if (props && props.itemStyle) {
    var _itemSty = props.itemStyle.item || {};
    itemSty = [itemSty, _itemSty];
    delete props.itemStyle.item;
    if (item.itemStyle) {
      var __itemSty = item.itemStyle.item;
      itemSty.push(__itemSty);
      delete item.itemStyle.item;
    }
  }

  if (item.itemStyle) {
    var _itemSty2 = item.itemStyle.item;
    itemSty = [itemSty, _itemSty2];
    // delete item.itemStyle.item
  }

  if (item.className && $$itemStyle[item.className]) {
    itemSty = $$itemStyle[item.className]['item'] || itemSty;
  }

  return React.createElement(Fox, { style: itemSty, styles: $$itemStyle, itemMethod: theMethod, item: item });
};
//# sourceMappingURL=maps/item.js.map
