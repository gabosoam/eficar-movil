import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },

    item: {
        backgroundColor: '#2E4056',
        height: hp('100%'),
        paddingHorizontal: wp('5%'),
        paddingTop: '5%'
    },

    itemSubtitle: {
        color: '#34D6B7',
        fontFamily: 'Roboto',
        fontSize: hp('3.5%')
    },


    itemSubtitleSecondary: {
        color: '#ffffff',
        fontFamily: 'Roboto',
        fontSize: hp('3.5%'),
        paddingHorizontal: wp('2.5')
    },


    itemContainer: {
        backgroundColor: '#2E4056',
        marginVertical: hp('2%'),
        marginHorizontal: wp('4%'),
        borderRadius: wp('2%')

    },

    numberContainer: {
        width: wp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontFamily: "Roboto",
        fontSize: hp('3'),
        fontWeight: "500",
        fontStyle: "normal",
        color: "#ffffff"
    },

    header: {
        fontFamily: "Roboto",
        fontSize: hp('4.5'),
        fontWeight: "500",
        paddingTop: hp('5%'),
        fontStyle: "italic",
        color: "#224E6A",
        paddingHorizontal: wp('4%')
    },

    subTitle: {
        fontFamily: "Roboto",
        fontSize: hp('2%'),
        fontStyle: "normal",
        color: "#ffffff"
    },

    buttonStyle: {
        marginTop: hp('5%'),
        backgroundColor: '#D43539', 
        borderRadius: wp('2%')
    },

    textButton:{
    
        fontFamily: 'Roboto',
        fontSize: hp('3.5%'),

    },

    containerButton: {
        borderRadius: wp('2%'),
        width: wp('50%')
    },

    number: {
        fontFamily: 'Roboto',
        fontSize: hp('7%'),
        textAlign: 'center'
    },

    listContainer: {
    },

    image: {
        width: wp('50%'),
        height: hp('15%')
    }
})

export default styles;