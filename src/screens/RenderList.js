import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment';
import akun from '../img/akun.png'

export default function RenderList({list, onPress}) {
    const { idUser } = useSelector(state => state.profile);
    return (
        <TouchableOpacity onPress={onPress}>
        {list.sender === idUser ? (
            <View style={style.card}>
            <View>
                <Image style={style.img} source={list.receiver.avatar === null ? akun : {uri: `http://54.147.40.208:8585${list.receiver.avatar}`}} />
            </View>
            <View style={style.body}>
                <View>
                    <Text style={style.textName}>{list.receiver.name}</Text>
                    <Text style={style.textChat}>{list.content.slice(0, 40).concat('...')}</Text>
                </View>
                <Text style={style.clock}>{moment.utc(list.createdAt).local().calendar({
                    sameDay: 'hh:mm A',
                    lastDay: '[Yesterday]',
                    sameElse: 'DD/MM/YYYY',
                  })}</Text>
            </View>
        </View>
        ): (
        <View style={style.card}>
            <View>
                <Image style={style.img} source={list.send.avatar === null ? akun : {uri: `http://54.147.40.208:8585${list.send.avatar}`}} />
            </View>
            <View style={style.body}>
                <View>
                    <Text style={style.textName}>{list.send.name}</Text>
                    <Text style={style.textChat}>{list.content.slice(0, 40).concat('...')}</Text>
                </View>
                <Text style={style.clock}>{moment.utc(list.createdAt).local().calendar({
                    sameDay: 'hh:mm A',
                    lastDay: '[Yesterday]',
                    sameElse: 'DD/MM/YYYY',
                  })}</Text>
            </View>
        </View>            
        )}
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    parent: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "white"
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    message: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "rgb(0, 204, 63)",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        marginTop: "65%",
        // shadowOpacity: 10,
        // shadowOffset: {
        //     width: 0,
        //     height: 5
        // },
        // shadowColor: "#000000",
        // shadowRadius: 9
    },
    body: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginLeft: 15,
        // marginRight: 10,
        paddingRight: 2,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgb(229,229,229)",
        alignItems: 'stretch'
    },
    textName: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "600",
    },
    textChat: {
        color: "grey",
        marginTop: 5,
        marginBottom: 15
    }
})