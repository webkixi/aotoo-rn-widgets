'use strict';

var transTree = require('./tree');
var _item = require('./item');
var _list = require('./list');

function $item() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var stys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var item = opts.data || {};
  var props = opts.props || {};
  return _item(item, stys, props);
}

function $list(props, stys) {
  return _list(props, stys);
}

function $tree(props, stys) {
  if (Array.isArray(props.data)) {
    props.data = transTree(props.data);
    return $list(props, stys);
  }
}

Aotoo.plugins('item', $item);
Aotoo.plugins('list', $list);
Aotoo.plugins('tree', $tree);
Aotoo.plugins('transTree', transTree);

module.exports = {};
//# sourceMappingURL=maps/index.js.map
