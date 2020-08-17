import React, {Component} from 'react';
import { ActivityIndicator, Modal, View, StyleSheet} from 'react-native';

class Spinner extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={ this.props.size ? this.props.size : "large"} color={this.props.color ? this.props.color : "black"} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    color: "white"
  }
})

export default Spinner