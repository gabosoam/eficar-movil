import React from 'react'
import { View, Text, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import styles from '../../styles/main-style'
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../controllers/api-controller'
import moment from 'moment'

export default class ItemProduction extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: props.navigation.state.params.producto
        }

        console.log(this.props)
    }
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.producto}`,
    })

    getState = (state) => {
        switch (state) {
            case 1:
                return 'En espera de producción'
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
    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.itemSubtitle}>Marca:</Text>
                <Text style={styles.itemSubtitleSecondary}>Chevrolet</Text>

                <Text style={styles.itemSubtitle}>Modelo:</Text>
                <Text style={styles.itemSubtitleSecondary}>Modelo prueba</Text>

                <Text style={styles.itemSubtitle}>Hora de inicio:</Text>
                <Text style={styles.itemSubtitleSecondary}>{this.props.navigation.state.params.hora_inicio}</Text>

                <Text style={styles.itemSubtitle}>Estado:</Text>
                <Text style={styles.itemSubtitleSecondary}>{this.getState(this.props.navigation.state.params.estado)}</Text>
                <Button
                    onPress={() => this.confirmation(this.props.navigation.state.params.id)}
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.containerButton}
                    titleStyle={styles.textButton}
                    title="Pausar tarea"
                />

                <Button
                    onPress={() => this.confirmation(this.props.navigation.state.params.id)}
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.containerButton}
                    titleStyle={styles.textButton}
                    title="Finalizar tarea"
                />
            </View>
        )
    }

    confirmation = (id) => {

        const secs = this.props.navigation.state.params.tiempo_estandar;

        const formatted = moment.utc(secs * 1000).format('HH:mm:ss');

        Alert.alert(
            '¿Seguro que deseas iniciar la tarea?',
            'Tienes ' + formatted + ' para completar la tarea desde que presionas el botón iniciar',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Iniciar', onPress: () => this.iniciarTarea(id) },
            ],
            { cancelable: false },
        );
    }

    iniciarTarea = (asignacion) => {


        api.get('asignacion/iniciartarea?asignacion=' + asignacion)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            })
            .catch((error) => {
                console.log(error)


            });
    }
}