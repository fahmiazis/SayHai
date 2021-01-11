import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import socket from '../helpers/socket'
import img1 from '../img/img1.png'
import img2 from '../img/img2.png'
import RenderList from './RenderList'
import {connect} from 'react-redux'
import message from '../redux/actions/message'
import profile from '../redux/actions/profile'
import friend from '../redux/actions/friend'
import search from '../redux/actions/search'

class Chats extends Component {
    state = {
        loading: false
    }

    componentDidMount(){
        this.getList()
        const search = ''
        this.props.search(this.props.auth.token, search)
    }
    getList = async () => {
        this.setState({loading: true})
        await this.props.getProfile(this.props.auth.token)
        await this.props.chatList(this.props.auth.token)
        await this.props.getFriend(this.props.auth.token)
        this.setState({loading: false})
    }

    getChatList = async () => {
        await this.props.chatList(this.props.auth.token)
    }

    goChat = async (idfriend) => {
        const {id} = idfriend
        await this.props.readMessage(this.props.auth.token, id)
        await this.props.detailFriend(this.props.auth.token, id)
        this.props.navigation.navigate('ChatRoom', id)
        console.log(id)
    }

    componentDidUpdate(){
        const {idUser} = this.props.profile
        socket.on(idUser, () => {
            this.getChatList()
        })
    }

    render() {
        const {loading} = this.state
        const {chatlist} = this.props.message
        const {idUser} = this.props.profile
        return (
            <View style={style.parent}>
                <View>
                <FlatList
                    data = {Object.keys(chatlist).length > 0 && chatlist.result.rows}
                    // onEndReached={this.nextPage}
                    // onEndReachedThreshold={0.5}
                    refreshing={loading}
                    onRefresh={this.getList}
                    renderItem = {({item}) => (
                    <RenderList
                    onPress={() => this.goChat({id: item.sender === idUser ? item.recipient : item.sender})}
                    list={item} 
                    />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    />
                </View>
                <View style={style.position}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Contact")}>
                    <View style={style.message}>
                        <Icon name="message-text" size={30} color="white" />
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    message: state.message
})

const mapDispatchToProps = {
    getProfile: profile.getProfile,
    chatList: message.chatList,
    clear: message.clear,
    read: message.readMessage,
    detailFriend: friend.detailFriend,
    readMessage: message.readMessage,
    getFriend: friend.getFriend,
    search: search.procSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats);

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
        // alignSelf: "flex-end",
    },
    body: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "85%",
        marginLeft: 15,
        marginRight: 10,
        paddingRight: 2,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgb(229,229,229)"
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
    },
    position: {
        width: "100%",
        marginTop: "135%",
        position: "absolute",
        flexDirection: "row-reverse",
    }
})