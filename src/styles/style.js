import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    logoContainer: {
        width: wp('100%'),
        height: hp('25%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: wp('80%'),
        height: hp('20%'),
    },
    titleContainer: {
        width: wp('100%'),
        height: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: hp('2.5%'),
        fontFamily: 'Roboto'
    },
    subTitle: {
        fontSize: hp('2.5%'),
        fontFamily: 'Roboto',
        color: "#ffffff",

    },
    password: {
        fontSize: hp('2%'),
        fontFamily: 'Roboto',
        textAlign: 'center',
        color: "#34D6B7",
        marginTop: hp('5%')
    },
    formContainer: {
        width: wp('100%'),
        height: hp('65%'),
        backgroundColor: '#2E4056',
        paddingHorizontal: wp('8%'),
        paddingTop: hp('7%')
    },

    buttonContainer: {
        width: wp('100%'),
        height: hp('10%'),
        backgroundColor: '#407BFC',
        alignItems: 'center',
    },

    input: {
        height: hp('7%'),
        backgroundColor: '#ffffff',
        borderRadius: wp('2.5%'),
        marginTop: hp('2%')
    },
    textButton: {
        fontSize: hp('3.5%'),
        fontFamily: 'Roboto',
        color: "#ffffff",
        marginTop: hp('1%')

    },
})

export default styles;