import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux'

import auth from '../redux/actions/auth'

class Calls extends Component {

    logout = () => {
        this.props.logout()
    }

    render() {
        return (
            <View style={style.parent}>
                <Text style={style.desc}>Call with your friends who use SayHai on iPhone, Android, or kaiOS Phone</Text>
                <View style={style.position}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Contact")}>
                    <View style={style.message}>
                        <Icon name="phone-plus" size={30} color="white" />
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: "white",
    },
    btn: {
        backgroundColor: "rgb(0, 204, 63)",
        alignSelf: "center",
        width: 80,
        justifyContent: "center",
    },
    textBtn: {
        color: "white"
    },
    message: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "rgb(0, 204, 63)",
        justifyContent: "center",
        alignItems: "center",
        // alignSelf: "flex-end",
    },
    desc: {
        marginTop: 20,
        fontSize: 15,
        color: "rgb(108,108,108)",
        textAlign: "center",
        marginHorizontal: 20
    },
    position: {
        width: "90%",
        marginTop: "120%",
        position: "absolute",
        flexDirection: "row-reverse",
    }
})

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = {
    logout: auth.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Calls);