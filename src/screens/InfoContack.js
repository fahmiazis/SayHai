import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

class InfoContack extends Component {
    render() {
        return (
            <View>
                <View style={style.icon}>
                    <Icon name="user-alt" size={200} color="white" />
                </View>
                <Text style={style.textHeader}>Andi Jutawan</Text>
                <View style={style.body}>
                    <View style={style.contentBody}>
                        <Icon name="phone" size={20} color="rgb(7,94,84)"/>
                        <TouchableOpacity>
                        <View style={style.content}>
                            <Text style={style.textBody}>Voice Call +62 831-7714-0923</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.contentBody}>
                        <Icon name="video" size={20} color="rgb(7,94,84)"/>
                        <TouchableOpacity>
                        <View style={style.content}>
                            <Text style={style.textBody}>Video Call +62 831-7714-0923</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.contentBody}>
                        <Icon2 name="message-text" size={25} color="rgb(7,94,84)"/>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ChatRoom")}>
                        <View style={style.content1}>
                            <Text style={style.textBody}>Message +62 831-7714-0923</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default InfoContack

const style = StyleSheet.create({
    parent: {
        flex: 1
    },
    body: {
        margin: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white",
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(0, 151, 167)",
        height: 500,
        position: "relative"
    },
    textHeader: {
        position: "absolute",
        marginTop: "95%",
        marginLeft: 20,
        color: "white",
        fontSize: 20,
        fontWeight: "400"
    },
    contentBody: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    content: {
        borderBottomColor: "grey",
        borderBottomWidth: 0.5,
        paddingBottom: 20,
        marginLeft: 30,
        width: "179%"
    },
    content1: {
        marginLeft: 30,
        width: "179%",
        paddingBottom: 20
    }
})