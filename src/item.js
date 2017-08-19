const uniqueId = Aotoo.uniqueId
const merge = Aotoo.merge

const {
  FlatList,
  View,
  Text,
  Linking,
  TouchableHighlight,
  Image
} = require('react-native')

const {
  Ul, 
  Li, 
  A, 
  Img, 
  Div
} = require('./htmltags')

const $uuid = function(prefix='native_') {
  const _time = new Date().getTime().toString().substring(1)
  return prefix + _time
}

function dealWithLis(lis, $stys, _sty, clsName){
  let _sty_ul = $stys['ul']||$stys['itemLi-ul']||{}
  let _sty_li = $stys['li']||$stys['itemLi-li']||{}
  let _sty_text = $stys.itemText ||{}

  if (clsName && $stys[clsName]) {
    const $clsName = $stys[clsName]
    _sty_ul = $clsName['ul'] || $clsName['itemLi-ul'] || _sty_ul
    _sty_li = $clsName['li'] || $clsName['itemLi-li'] || _sty_li
    _sty_text = $clsName['itemText'] || _sty_text
  }

  var $lis = []
  if (lis && Array.isArray(lis)) {
    $lis = lis.map( (item, ii) => {
      const $key = $uuid('lis_'+ii+'_')
      const _typeof = typeof item
      switch (_typeof) {
        case 'string':
          item = <Text style={_sty_text}>{item}</Text>
          return <Li key={$key} style={_sty_li}>{item}</Li>
          break;
        case 'number':
          item = <Text style={_sty_text}>{item}</Text>
          return <Li key={$key} style={_sty_li}>{item}</Li>
          break;
        case 'object':
          if (Array.isArray(item)) {
            return dealWithLis(item, $stys, _sty, clsName)
          } else {
            if (React.isValidElement(item)) {
              return React.cloneElement(item, {key: $key})
            } else {
              let itemStyleSheet = $stys['item'] || {}
              if (item && item['className'] && $stys[item['className']]) {
                itemStyleSheet = $stys[item['className']]['item']
              }
              const tempItem = myItemHeader(item, $stys, itemStyleSheet)
              return React.cloneElement(tempItem, {key: $key})
            }
          }
          break;
      }
    })
  }
  
  return <Ul style={_sty_ul}>{$lis}</Ul>
}

function myItemHeader(item, _stys, _sty){
  let $header
  let $lis
  let $stys = JSON.parse(JSON.stringify(_stys))

  if(React.isValidElement(item)){
    $header = item
  } 
  else
  if (typeof item == 'string' || typeof item == 'number') {
    const $sty = $stys&&$stys.itemText || {}
    $header = <Text style={$sty}>{item}</Text>
  }
  else {
    let { title, url, img, id, li, itemStyle, attr, className } = item
    $stys = merge($stys, itemStyle)
    let _sty_a = $stys.itemA || {}
    let _sty_text = $stys.itemText ||{}
    let _sty_img = $stys.itemImg ||{}
    let _sty_box = $stys.itemBox ||{}

    if (className && $stys[className]) {
      const $clsName = $stys[className]
      _sty_a = $clsName['itemA'] || _sty_a
      _sty_text = $clsName['itemText'] || _sty_text
      _sty_img = $clsName['itemImg'] || _sty_img
      _sty_box = $clsName['itemBox'] || _sty_box
    }
    

    if (title) {
      if (typeof title == 'number' || typeof title == 'string') {
        title = <Text style={_sty_text}>{title}</Text>
      }
      // if (url&&typeof url == 'string') {
      if (url) {
        // title url
        $header = <A href={url} style={_sty_a}>{title}</A>
        if (typeof img=='string') {
          if (li) {
            $lis = dealWithLis(li, $stys, _sty, className)
            // title url img li
            // $header = <Div style={_sty_box}>{title}<A href={url} style={_sty_a}><Img src={img} style={_sty_img}/></A>{$lis}</Div>
            return <Div style={_sty}>{title}<A href={url} style={_sty_a}><Img src={img} style={_sty_img}/></A>{$lis}</Div>
          } else {
            // title url img
            $header = <A href={url} style={_sty_a}>{title}<Img src={img} style={_sty_img}/></A>
          }
        }
        else
        if (li) {
          $lis = dealWithLis(li, $stys, _sty, className)
          // title url li
          // $header = <Div style={_sty_box}><A href={url} style={_sty_a}>{title}</A>{$lis}</Div>
          return <Div style={_sty}><A href={url} style={_sty_a}>{title}</A>{$lis}</Div>
        }
      }
      else
      if (img) {
        // if (typeof img=='string') {
        if (li) {
          $lis = dealWithLis(li, $stys, _sty, className)
          // title img li 
          // $header = <Div style={_sty_box}>{title}<Img src={img} style={_sty_img} />{$lis}</Div>
          return <Div style={_sty}>{title}<Img src={img} style={_sty_img} />{$lis}</Div>
        } else {
          // title img
          // $header = <Div style={_sty_box}>{title}<Img src={img} style={_sty_img}/></Div>
          return <Div style={_sty}>{title}<Img src={img} style={_sty_img}/></Div>
        }
      }
      else
      if (li) {
        $lis = dealWithLis(li, $stys, _sty, className)
        
        // title li
        // $header = <Div style={_sty_box}>{title}{$lis}</Div>
        return <Div style={_sty}>{title}{$lis}</Div>
      } else {
        // title
        // $header = <Div>{title}</Div>
        $header = title
      }
    }

    //  ===== 

    else
    if (typeof img=='string') {
      if (url&&typeof url == 'string') {
        if (li) {
          $lis = dealWithLis(li, $stys, _sty, className)
          // img url li
          // $header = <Div style={_sty_box}><A href={url} style={_sty_a}><Img src={img} style={_sty_img} /></A>{$lis}</Div>
          return <Div style={_sty}><A href={url} style={_sty_a}><Img src={img} style={_sty_img} /></A>{$lis}</Div>
        } else {
          // img url
          $header = <A href={url} style={_sty_a}><Img src={img} style={_sty_img} /></A>
        }
      }
      else
      if (li) {
        $lis = dealWithLis(li, $stys, _sty, className)
        // img li
        // $header = <Div style={_sty_box}><Img src={img} style={_sty_img} />{$lis}</Div>
        return <Div style={_sty}><Img src={img} style={_sty_img} />{$lis}</Div>
      } else {
        // img
        $header = <Img src={img} style={_sty_img} />
      }
    }

    // ======

    else
    if (li) {
      $lis = dealWithLis(li, $stys, _sty, className)
      // li
      $header = $lis
    }

    // ======

    else {
      $header = title
    }
  }
  
  return <Div style={_sty}>{$header}</Div>
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
class Fox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      $key: $uuid('header_item_'+'_')
    }
  }

  componentDidMount() {
    const element = this.element
    const props = this.props
    const item = props

    if (item.item.attr) {
      element.attr = item.item.attr
    }
    if (this.props.itemMethod) {
      this.props.itemMethod.call(element)
    }
  }

  preRender(){
    return myItemHeader(this.props.item, this.props.styles, this.props.style)
  }

  render(){
    const $key = this.state.$key
    const fill = this.preRender()
    return React.cloneElement(fill, {key: $key, ref: e=>this.element=e })
  }
}

var $itemStyle = {
  item: {   // view
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
  'itemLi-li': {
    
  }
}

module.exports = function(item, stys, props){
  const theMethod = item.itemMethod || props&&props.itemMethod
  delete item.itemMethod

  var $$itemStyle = merge({}, $itemStyle, stys)
  var itemSty = $$itemStyle.item
  delete $$itemStyle.item
  if (props&&props.itemStyle) {
    const _itemSty = props.itemStyle.item||{}
    itemSty = [itemSty, _itemSty]
    delete props.itemStyle.item
    if (item.itemStyle) {
      const __itemSty = item.itemStyle.item
      itemSty.push(__itemSty)
      delete item.itemStyle.item
    }
  } 

  if (item.itemStyle) {
    const __itemSty = item.itemStyle.item
    itemSty = [itemSty, __itemSty]
    // delete item.itemStyle.item
  }

  if (item.className && $$itemStyle[item.className]) {
    itemSty = $$itemStyle[item.className]['item'] || itemSty
  }

  return <Fox style={itemSty} styles={$$itemStyle} itemMethod={theMethod} item={item} />
}
