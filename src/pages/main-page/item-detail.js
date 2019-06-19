import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import styles from '../../styles/main-style'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ItemDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: props.navigation.state.params.producto
        }
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

                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.containerButton}
                    titleStyle={styles.textButton}
                    title="Iniciar tarea"
                />
            </View>
        )
    }
}