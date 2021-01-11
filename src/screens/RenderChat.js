import React, {Component} from 'react'
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import moment from 'moment';
// import {connect} from 'react-redux'

// import profile from '../redux/actions/profile'

export default function RenderChat({message}) {
    const { idUser } = useSelector(state => state.profile);
    return (
        <View>
            {message.sender == idUser ? (
            <View style={[style.message1]}>
                <View style={style.sendContent}>
                    <Text style={style.content}>{message.content}</Text>
                    <Text style={style.clock}>{moment.utc(message.createdAt).local().format('hh:mm A')}</Text>
                </View>
            </View>
            ) : (
            <View style={[style.message]}>
                <View style={style.receiveContent}>
                    <Text style={style.content}>{message.content}</Text>
                    <Text style={style.clock}>{moment.utc(message.createdAt).local().format('hh:mm A')}</Text>
                </View>
            </View>
            )}
        </View>
    )
}

const style = StyleSheet.create({
    parent: {
        flex: 1
    },
    background: {
        flex: 1,
        position: "relative"
    },
    itemInput: {
        width: "88%",
        backgroundColor: "rgb(255,255,255)",
        borderRadius: 30,
        paddingLeft: 10,
        paddingRight: 15
    },
    imgbackground: {
        width: "100%",
        height: "100%"
    },
    message: {
        width: "50%",
        marginTop: 5,
    },
    message1: {
        width: "50%",
        marginTop: 5,
        alignSelf: "flex-end"
    },
    send: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    receive: {
        flexDirection: "row",
        justifyContent: "flex-start"

    },
    body: {
        position: "absolute",
        flex: 1,
        height: "100%",
        width: "100%",
    },
    input: {
        width: "100%",
        flexDirection: "row",
        marginTop: "148%",
        position: "absolute"
    },
    sendContent: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "rgb(199, 244, 130)",
        padding: 8,
        marginRight: 10,
        borderRadius: 10
    },
    receiveContent: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "rgb(255,255,255)",
        padding: 8,
        marginLeft: 10,
        borderRadius: 10
    },
    content: {
        fontSize: 15,
        marginRight: 5
    },
    clock: {
        color: "grey"
    },
    emot: {
        color:"grey",
    },
    camera: {
        color:"grey",
        marginLeft: 20
    },
    mic: {
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(0, 137, 123)",
        borderRadius: 50,
        marginLeft: 3,
        marginRight: 2
    }
})