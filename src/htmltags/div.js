const {
  View,
  Text
} = require('react-native')

class Div extends React.PureComponent {
  render() {
    return (
      <View style={this.props.style}>
        {this.props.children}
      </View>
    )
  }
}

module.exports = Div
