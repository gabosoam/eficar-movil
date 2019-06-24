import React from 'react'
import { View, Text, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import styles from '../../styles/main-style'
import Icon from 'react-native-vector-icons/FontAwesome';
import apiController from '../../controllers/api-controller';
import moment from 'moment'

export default class ItemProduction extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: props.navigation.state.params.producto,
            pausas: []
        }

       this.getPausas()
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

    getPausas= ()=>{
       
      
        apiController.get('motivo?estado=true' )
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({pausas: []})
            var pausas = []
            console.log(responseJson)
            responseJson.forEach(pausa => {
                pausas.push({text: pausa.descripcion, onPress: () => this.iniciarTarea(this.props.navigation.state.params.id, pausa.id,this.props.navigation.state.params)})
            });
            this.setState({pausas: pausas})
        })
        .catch((error) => {
            console.log(error)


        });
 
       
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
                    onPress={() => this.confirmationFinalizar(this.props.navigation.state.params.id)}
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.containerButton}
                    titleStyle={styles.textButton}
                    title="Finalizar tarea"
                />
            </View>
        )
    }

    confirmation = (id) => {

        Alert.alert(
            'Seleccionar motivo de la pausa',
            'Recuerda que al seleccionar un motivo la tarea se pausará',
            this.state.pausas,
            {cancelable: true},
          );
    }

    confirmationFinalizar = (id) => {

        Alert.alert(
            'Finalizar tarea',
            'Recuerda que al finalizar una tarea el jefe de taller tendrá que aprobar la labor realizada',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Iniciar', onPress: () => this.finalizarTarea(id) },
            ],
            {cancelable: true},
          );
    }

    iniciarTarea = (asignacion, motivo, item) => {


        apiController.get('asignacion/pausartarea?asignacion=' + asignacion+"&motivo="+motivo)
            .then((response) => response.json())
            .then((responseJson) => {
                this.props.navigation.replace('Pausa', { ...item })
            })
            .catch((error) => {
                console.log(error)


            });
    }

    finalizarTarea = (asignacion) => {


        apiController.get('asignacion/finalizartarea?asignacion=' + asignacion)
            .then((response) => response.json())
            .then((responseJson) => {
                this.props.navigation.goBack()
            })
            .catch((error) => {
                console.log(error)


            });
    }
}