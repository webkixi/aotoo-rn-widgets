'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

function dealWithLis(lis, $stys, _sty, clsName, listClassName) {
  var _sty_ul = $stys['ul'] || $stys['itemLi-ul'] || {};
  var _sty_li = $stys['li'] || $stys['itemLi-li'] || {};
  var _sty_text = $stys.itemText || {};

  var myClsName = clsName || listClassName;
  if (myClsName) {
    var _Aotoo;

    var clsNames = myClsName.split(' ');
    var myItemSty = clsNames.map(function (cn) {
      return $stys[cn] || {};
    });
    var $clsName = (_Aotoo = Aotoo).merge.apply(_Aotoo, _toConsumableArray(myItemSty));
    _sty_ul = $clsName['ul'] || $clsName['itemLi-ul'] || _sty_ul;
    _sty_li = $clsName['li'] || $clsName['itemLi-li'] || _sty_li;
    _sty_text = $clsName['itemText'] || _sty_text;

    // const $clsName = $stys[myClsName]
    // _sty_ul = $clsName['ul'] || $clsName['itemLi-ul'] || _sty_ul
    // _sty_li = $clsName['li'] || $clsName['itemLi-li'] || _sty_li
    // _sty_text = $clsName['itemText'] || _sty_text
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
            return dealWithLis(item, $stys, _sty, clsName, listClassName);
          } else {
            if (React.isValidElement(item)) {
              return React.cloneElement(item, { key: $key });
            } else {
              // let itemStyleSheet = $stys['item'] || {}
              // if (item && item['className'] && $stys[item['className']]) {
              //   itemStyleSheet = $stys[item['className']]['item']
              // }

              var itemStyleSheet = _sty_li;
              if (item && (item['style'] || item['itemStyle'])) {
                itemStyleSheet = item['style'] || item['itemStyle'];
              }

              var theClsName = item['className'];

              if (item && theClsName) {
                var _Aotoo2;

                var _clsNames = theClsName.split(' ');
                var _myItemSty = _clsNames.map(function (cn) {
                  return $stys[cn] || {};
                });
                var _$clsName = (_Aotoo2 = Aotoo).merge.apply(_Aotoo2, _toConsumableArray(_myItemSty));
                itemStyleSheet = _$clsName['item'] || itemStyleSheet;
                // itemStyleSheet = $stys[theClsName]['item'] || itemStyleSheet
              }
              var tempItem = myItemHeader(item, $stys, itemStyleSheet, listClassName);
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

function myItemHeader(item, _stys, _sty, listClassName) {
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

    var myClsName = className || listClassName;
    if (myClsName) {
      var _Aotoo3;

      var clsNames = myClsName.split(' ');
      var myItemSty = clsNames.map(function (cn) {
        return $stys[cn] || {};
      });
      var $clsName = (_Aotoo3 = Aotoo).merge.apply(_Aotoo3, _toConsumableArray(myItemSty));
      _sty_a = $clsName['itemA'] || _sty_a;
      _sty_text = $clsName['itemText'] || _sty_text;
      _sty_img = $clsName['itemImg'] || _sty_img;
      _sty_box = $clsName['itemBox'] || _sty_box;

      // const $clsName = $stys[myClsName]
      // _sty_a = $clsName['itemA'] || _sty_a
      // _sty_text = $clsName['itemText'] || _sty_text
      // _sty_img = $clsName['itemImg'] || _sty_img
      // _sty_box = $clsName['itemBox'] || _sty_box
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
          { attr: attr, href: url, style: _sty_a },
          title
        );
        if (typeof img == 'string') {
          if (li) {
            $lis = dealWithLis(li, $stys, _sty, className, listClassName);
            // title url img li
            // $header = <Div style={_sty_box}>{title}<A href={url} style={_sty_a}><Img src={img} style={_sty_img}/></A>{$lis}</Div>
            return React.createElement(
              Div,
              { style: _sty },
              title,
              React.createElement(
                A,
                { attr: attr, href: url, style: _sty_a },
                React.createElement(Img, { src: img, style: _sty_img })
              ),
              $lis
            );
          } else {
            // title url img
            $header = React.createElement(
              A,
              { attr: attr, href: url, style: _sty_a },
              title,
              React.createElement(Img, { src: img, style: _sty_img })
            );
          }
        } else if (li) {
          $lis = dealWithLis(li, $stys, _sty, className, listClassName);
          // title url li
          // $header = <Div style={_sty_box}><A href={url} style={_sty_a}>{title}</A>{$lis}</Div>
          return React.createElement(
            Div,
            { style: _sty },
            React.createElement(
              A,
              { attr: attr, href: url, style: _sty_a },
              title
            ),
            $lis
          );
        }
      } else if (img) {
        // if (typeof img=='string') {
        if (li) {
          $lis = dealWithLis(li, $stys, _sty, className, listClassName);
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
        $lis = dealWithLis(li, $stys, _sty, className, listClassName);

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
            $lis = dealWithLis(li, $stys, _sty, className, listClassName);
            // img url li
            // $header = <Div style={_sty_box}><A href={url} style={_sty_a}><Img src={img} style={_sty_img} /></A>{$lis}</Div>
            return React.createElement(
              Div,
              { style: _sty },
              React.createElement(
                A,
                { attr: attr, href: url, style: _sty_a },
                React.createElement(Img, { src: img, style: _sty_img })
              ),
              $lis
            );
          } else {
            // img url
            $header = React.createElement(
              A,
              { attr: attr, href: url, style: _sty_a },
              React.createElement(Img, { src: img, style: _sty_img })
            );
          }
        } else if (li) {
          $lis = dealWithLis(li, $stys, _sty, className, listClassName);
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
          $lis = dealWithLis(li, $stys, _sty, className, listClassName);
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

    _this.state = {
      $key: $uuid('header_item_' + '_')
    };
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
      return myItemHeader(this.props.item, this.props.styles, this.props.style, this.props.className);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var $key = this.state.$key;
      var fill = this.preRender();
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
  if (React.isValidElement(item)) return item;

  if (typeof item == 'string' || typeof item == 'number') {
    item = { title: item };
  }

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
  }

  var myClsName = item.className || props.className;
  if (myClsName) {
    // itemSty = $$itemStyle[myClsName]['item'] || itemSty

    var clsNames = myClsName.split(' ');
    var myItemSty = clsNames.map(function (cn) {
      return $$itemStyle[cn]['item'] || itemSty;
    });
    itemSty = myItemSty;
  }

  return React.createElement(Fox, { style: itemSty, styles: $$itemStyle, className: props.className, itemMethod: theMethod, item: item });
};
//# sourceMappingURL=maps/item.js.map
