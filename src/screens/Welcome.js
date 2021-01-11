import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Button } from 'native-base'
import center from '../img/center.jpg'


class Welcome extends Component {
    render() {
        return (
            <View style={style.parent}>
                <Text style={style.title}> Welcome To SayHai! </Text>
                <Image style={style.img} source={center} />
                <Text style={style.textdesc}>Read our <Text style={style.textColor}>Privacy Policy.</Text> Tap 'Agree and Continue' to accept the <Text style={style.textColor}>Terms of Service</Text></Text>
                <Button style={style.btn} onPress={() => this.props.navigation.navigate("RegisterPhone")} ><Text style={style.textBtn}>AGREE AND CONTINUE</Text></Button>
                <View style={style.footer}>
                    <Text style={style.textForm}>from</Text>
                    <Text style={style.author}>Fahmi Aziz</Text>
                </View>
            </View>
        )
    }
}

export default Welcome

const style = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgb(255,255,255)",
        paddingHorizontal: 30,
        justifyContent: "center"
    },
    title: {
        fontSize: 40,
        color: "rgb(18,141,121)",
        marginBottom: "25%",
        lineHeight: 100
    },
    img: {
        height: 214,
        width: 214,
        marginBottom: "20%"
    },
    textColor: {
        color: "rgb(20, 211, 236)"
    },
    footer: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 100
    },
    textForm: {
        color: "rgb(108,108,108)"
    },
    author: {
        color: "rgb(18,141,121)",
        letterSpacing: 1,
        lineHeight: 20
    },
    textdesc: {
        marginBottom: 20,
        textAlign: "center",
        lineHeight: 30,
        color: "rgb(108,108,108)"
    },
    btn: {
        width: 200,
        backgroundColor: "rgb(0, 204, 63)",
        borderRadius: 5,
        justifyContent: "center",
        alignSelf: "center"
    },
    textBtn: {
        color: 'white'
    }
})