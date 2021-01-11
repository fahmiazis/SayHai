import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {useNavigation} from '@react-navigation/native'

import akun from '../img/akun.png'

export default function RenderContact({friend, onPress}) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity key={friend.id} onPress={onPress}>
            <View style={style.header}>
                <View>
                    <Image source={friend.friend.avatar === null ? akun : {uri: `http://54.147.40.208:8585${friend.friend.avatar}`}} style={style.img} />
                </View>
                <Text style={style.title}>{friend.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 50,
        backgroundColor: "rgb(0, 204, 63)",
        borderRadius: 50
    },
    icon2: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        backgroundColor: "grey",
        borderRadius: 50
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20
    },
    title: {
        marginLeft: 15,
        fontSize: 16,
        fontWeight: "300"
    },
    title2: {
        marginLeft: 27,
        fontSize: 16,
        fontWeight: "300"
    },
    title3: {
        marginLeft: 20,
        fontSize: 16,
        fontWeight: "300"
    },
    contact: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "85%"
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 50
    }
})