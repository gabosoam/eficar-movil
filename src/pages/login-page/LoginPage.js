import React from 'react'
import { Image, View, TouchableOpacity, Text, TextInput, Alert } from 'react-native'
import styles from '../../styles/style';
import apiController from '../../controllers/api-controller';
import { connect } from 'react-redux';
import { addPlace, addUser } from '../../redux/actions/user';
import { addResult } from '@jest/test-result';
import firebase from 'react-native-firebase'

class LoginPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: { email: 'gasalazaror@gmail.com', password: '12345' }
        }

        props.user.token ? this.props.navigation.navigate('Main') : console.log('');


    }

    onLogin = () => {
        apiController.post('login', this.state.user)
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.user ? this.saveSession(responseJson) : Alert.alert('Error', 'Contraseña incorrecta')
            })
            .catch((error) => {
                console.log(error)
                Alert.alert('Error', 'El usuario no existe')

            });
    }

    saveSession = (responseJson) => {
        firebase.messaging().getToken().then(token => {
            console.log(token)
            apiController.patch('usuario/' + responseJson.user.id, { fcm: token }, responseJson.token)
            .then((response) => response.json())
            .then((responseJson) => {
               console.log(responseJson)
            })
            .catch((error) => {
                console.log(error)
          

            });
        });

        console.log(responseJson)
        this.props.add(responseJson);
        this.props.navigation.navigate('Main')
    }


    render() {
        return (
            <View>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/images/logo.png')}
                    />
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>INGRESA TUS DATOS:</Text>
                    <TextInput
                        value={this.state.user.email}
                        onChangeText={(value) => this.setState({ user: { email: value, password: this.state.user.password } })}
                        style={styles.input}
                        placeholder='Correo electrónico'
                        textContentType='emailAddress'
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        value={this.state.user.password}
                        onChangeText={(value) => this.setState({ user: { password: value, email: this.state.user.email } })}
                        style={styles.input}
                        textContentType='password'
                        secureTextEntry={true}
                        ref={(input) => { this.secondTextInput = input; }}
                        placeholder='Contraseña'
                        onSubmitEditing={() => { this.onLogin() }}
                    />
                    <Text style={styles.password}>¿OLVIDASTE TU CONTRASEÑA?</Text>
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onLogin()}>
                    <Text style={styles.textButton}>{'Continuar'}</Text>
                </TouchableOpacity>
            </View>


        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (user) => {
            dispatch(addUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)