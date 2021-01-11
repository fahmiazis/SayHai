import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, FlatList, TextInpu, ScrollView } from 'react-native'
import { Input, Item} from 'native-base'
import background from '../img/background.png'
import socket from '../helpers/socket'
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import RenderChat from './RenderChat'

import {connect} from 'react-redux'
import message from '../redux/actions/message'
import friend from '../redux/actions/friend'

class ChatRoom extends Component {
    
    state = {
        message: {},
        detail: null,
        id: 0,
        content: '',
        loading: false
    }

    componentDidMount() {
        const id = this.props.route.params
        const {detail} = this.props.friend
        const {read} = this.props.message
        this.setState({id: id, message: read, detail: detail, loading: false})
    }

    readMessage = () => {
        this.setState({loading: true})
        const id = this.props.route.params
        this.props.readMessage(this.props.auth.token, id)
        this.props.detailFriend(this.props.auth.token, id)
        this.setState({loading: false})
    }

    readAgain = () => {
        const id = this.props.route.params
        this.props.readMessage(this.props.auth.token, id)
        this.props.chatList(this.props.auth.token)
    }

    sendMessage = async () => {
        const id = this.props.route.params
        const { content } = this.state
        const data = { content }
        await this.props.sendMessage(this.props.auth.token, id, data)
        const { read, isSuccessSend } = this.props.message
        if (isSuccessSend) {
            setTimeout(() => {
                this.props.readMessage(this.props.auth.token, id)
                this.setState({message: read, content: ''})
                this.props.chatList(this.props.auth.token)
            })
        }
    }

    componentDidUpdate(){
        const {idUser} = this.props.profile
        socket.on(idUser, () => {
            this.readAgain()
        })
    }

    nextPage = async () => {
        const {message} = this.state
        const { nextLink } = message.pageInfo
        if (nextLink) {
            await this.props.next(this.props.auth.token, nextLink)
            const {res} = this.props.message
            const {rows} = res.result
            const newData = {
                ...message,
                result:{
                     rows: [...message.result.rows, ...rows]
                    },
                pageInfo: res.pageInfo,
            }
            this.setState({message: newData})
        }
    }

    render() {
        const {message, loading, content} = this.state
        const {read} = this.props.message
        return (
            <View style={style.parent}>
                <View style={style.background}>
                    <ImageBackground style={style.imgbackground} source={background}/>
                </View>
                <View style={style.body}>
                    <View style={style.contentMessage}>
                    <FlatList
                    data = {Object.keys(read).length > 0 && read.result.rows}
                    onEndReached={this.nextPage}
                    onEndReachedThreshold={0.5}
                    refreshing={loading}
                    onRefresh={this.readMessage}
                    renderItem = {({item}) => <RenderChat message={item} /> }
                    keyExtractor={(item) => item.id.toString()}
                    inverted = {true}
                    />
                    </View>
                    <ScrollView>
                    <View style={style.input}>
                        <Item style={style.itemInput}>
                            <TouchableOpacity>
                                <Icon style={style.emot} name="emoticon-outline" size={25} />
                            </TouchableOpacity>
                            <Input
                            multiline={true}
                            scrollEnabled={true}
                            value={content}
                            onChangeText={content=>this.setState({content})} 
                            onKeyPress={() => this.setState({iconSend: "send"})}
                            placeholder="Type a message"
                            />
                            {content === '' ? (
                            <View style={style.campap}>
                                <TouchableOpacity>
                                    <Icon2 style={style.emot} name="paperclip" size={25} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon2 style={style.camera} name="camera" size={25} />
                                </TouchableOpacity>
                            </View>
                            ) : (
                            <TouchableOpacity>
                                <Icon2 style={style.emot} name="paperclip" size={25} />
                            </TouchableOpacity>
                            )}
                        </Item>
                        {content === '' ? (
                        <TouchableOpacity>
                            <View style={style.mic}>
                                <Icon name='microphone' color="white" size={30} />
                            </View>
                        </TouchableOpacity> 
                        ) : (
                        <TouchableOpacity onPress={this.sendMessage} style={style.touch}>
                            <View style={style.mic}>
                                <Icon name='send' color="white" size={30} />
                            </View>
                        </TouchableOpacity>    
                        )}
                    </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    friend: state.friend,
    message: state.message
})

const mapDispatchToProps = {
    detailFriend: friend.detailFriend,
    readMessage: message.readMessage,
    sendMessage: message.sendMessage,
    next: message.next,
    chatList: message.chatList,
    clear: message.clear
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

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
        paddingRight: 15,
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
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 30
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
        alignSelf: 'flex-end'
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
    },
    contentMessage: {
        width: "100%",
        height: "85%"
    },
    campap: {
        flexDirection: "row",
    },
})
