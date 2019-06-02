import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ListItem from '../../components/ListItem';
import { connect } from 'react-redux';
import { addPlace } from '../../redux/actions/place';

class MainPage extends Component {

  constructor(props){
    super(props)
    console.log(props)
  }

  state = {
    placeName: '',
    places: []
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.user)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
 
});

const mapStateToProps = state => {
  return {
    places: state.places.places,
    user: state.user.user

  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: (name) => {
      dispatch(addPlace(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)