import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlace } from '../../redux/actions/place';
import { TouchableHighlight, Image, View, FlatList, Text } from 'react-native'
import styles from '../../styles/main-style'
import { ListItem, Header, Button, Badge } from 'react-native-elements'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import apiController from '../../controllers/api-controller';
import ItemDetail from './item-detail';



class MainPage extends Component {

  static navigationOptions = {
    title: 'Lista de tareas',

  };

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }

    this.getData();
  }


  getData = () => {
    apiController.get('asignacion/vistalist?usuario=' + this.props.user.user.persona.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        })
      })
      .catch((error) => {
        console.log(error)


      });

    console.log(this.state.data)
  }


  state = {
    placeName: '',
    places: []
  }

  getState = (state) => {
    switch (state) {
        case 1:
            return 'En espera'
            break;
        case 2:
            return 'En Producción'
            break;
        case 3:
            return 'En Pausa'
            break;
        case 4:
            return 'Finalizado'
            break;
        default:
            break;
    }
}

getColor = (state) => {
  switch (state) {
      case 1:
          return 'error'
          break;
      case 2:
          return 'primary'
          break;
      case 3:
          return 'warning'
          break;
      case 4:
          return 'success'
          break;
      default:
          break;
  }
}


  renderItem = ({ item, index }) => {
    return (
      <ListItem
      containerStyle={styles.itemContainer}
        key={index}
        title={item.producto}
        titleProps={{ numberOfLines: 1 }}
        titleStyle={styles.title}
        subtitleStyle={styles.subTitle}
       
        badge={{status: this.getColor(item.estado), value: this.getState(item.estado), textStyle: {fontSize: 12}}}
        rightTitleStyle={styles.subTitle}
        subtitle={item.producto}
        chevron={true}
        onPress={() => this.props.navigation.navigate('Details', { ...item })}
      />
    )
  }



  render() {
    return (
      <View>




        <View style={styles.listContainer}>

          <FlatList
            renderItem={(item, index) => this.renderItem(item, index)}
            data={this.state.data.filter(item=> item.estado==1 || item.estado==2)}
          />

        </View>


      </View>

    );
  }
}



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

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: connect(mapStateToProps, mapDispatchToProps)(MainPage),
  Details: connect(mapStateToProps, mapDispatchToProps)(ItemDetail),
});

const TabNavigator = createBottomTabNavigator({
  Tareas: HomeStack,
  'Mi perfil': SettingsScreen,

},

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Tareas') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons. 

        } else if (routeName === 'Mi perfil') {
          iconName = `ios-options`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#ffffff',
      inactiveTintColor: '#224E6A',
      activeBackgroundColor: '#224E6A'

    }
  }
);


export default createAppContainer(TabNavigator);