const transTree = require('./tree')
const _item = require('./item')
const _list = require('./list')

function $item(opts={}, stys={}) {
  const item = opts.data||{}
  const props = opts.props||{}
  return _item(item, stys, props)
}

function $list(props, stys) {
  return _list(props, stys)
}

function $tree(props, stys){
  if ( Array.isArray(props.data) ) {
    props.data = transTree(props.data)
    return $list(props, stys)
  }
}

Aotoo.plugins('item', $item)
Aotoo.plugins('list', $list)
Aotoo.plugins('tree', $tree)
Aotoo.plugins('transTree', transTree)

module.exports = {}