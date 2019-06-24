import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlace } from '../../redux/actions/place';
import { TouchableHighlight, Image, View, FlatList, SectionList, Text } from 'react-native'
import styles from '../../styles/main-style'
import { ListItem, Header, Button, Badge } from 'react-native-elements'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import apiController from '../../controllers/api-controller';
import ItemDetail from './item-detail';
import moment from "moment";
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import ItemProduction from './item-production';
import ItemPausa from './item-pausa';
import firebase from 'react-native-firebase'




class MainPage extends Component {



  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isFetching: false,
    }

    this.getData();

    firebase.messaging().subscribeToTopic('ecuador')
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () { this.getData() });
  }


  renderEmplyItem = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>No tienes tareas en esta sección</Text>
      </View>
    )
  }


  getData = () => {
    apiController.get('asignacion/vistalist?usuario=' + this.props.user.user.persona.id)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          data: responseJson,
          isFetching: false
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





  renderItem = (item, index) => {

    return (
      <ListItem
        key={index}

        bottomDivider={true}
        title={item.producto}
        titleProps={{ numberOfLines: 1 }}
        subtitle={moment(Date(item.hora_inicio)).fromNow()}

        chevron={true}
        onPress={() => this.goToPage(item.estado, item)}
      />
    )
  }

  goToPage(estado, item) {
    switch (estado) {
      case 1:
        this.props.navigation.navigate('Details', { ...item })
        break;
      case 2:
        this.props.navigation.navigate('Production', { ...item })
        break;

      case 3:
        this.props.navigation.navigate('Pausa', { ...item })
        break;
      default:
        break;
    }
  }


  renderSection = (title) => {

    return (
      <View style={{ backgroundColor: '#FF4858' }}>
        <Text style={{ fontWeight: 'bold', fontFamily: 'Roboto', textAlign: 'center', color: 'white', fontSize: 20 }}>{title}</Text>
      </View>

    )
  }

  renderNoContent = (section) => {
    if (section.data.length == 0) {
      return (
        <View style={{ alignItems: 'center', paddingVertical: heightPercentageToDP('2') }}>
          <Text>No hay tareas en esta sección</Text>
        </View>
      )
    }
    return null
  }



  render() {
    return (
      <View>

        <View style={styles.listContainer}>

          <SectionList
            extraData={this.state}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            renderItem={({ item, index, section }) => this.renderItem(item, index)}
            renderSectionFooter={({ section }) => this.renderNoContent(section)}
            renderSectionHeader={({ section: { title } }) => this.renderSection(title)}
            sections={[
              { title: 'En espera de producción', data: data = this.state.data.filter(item => item.estado == 1) },
              { title: 'En producción', data: this.state.data.filter(item => item.estado == 2) },
              { title: 'En pausa', data: this.state.data.filter(item => item.estado == 3) },
            ]}
            keyExtractor={(item, index) => item + index}
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
  Production: connect(mapStateToProps, mapDispatchToProps)(ItemProduction),
  Pausa: connect(mapStateToProps, mapDispatchToProps)(ItemPausa),
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