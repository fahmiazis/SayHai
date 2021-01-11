import React, { Component } from 'react'
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native'
import {NavigationContainer, useNavigation} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {connect, useSelector} from 'react-redux'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import Icon3 from 'react-native-vector-icons/FontAwesome5'

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

import img1 from '../img/akun.png'
import Welcome from './Welcome'
import RegisterPhone from './RegisterPhone'
import RegisterProfile from './RegisterProfile'
import Chats from './Chats'
import Calls from './Calls'
import Status from './Status'
import ChatRoom from './ChatRoom'
import DetailFriend from './DetailFriend'
import Setting from './Setting'
import Profile from './Profile'
import Contact from './Contact'
import InfoContact from './InfoContack'
import AddContack from './AddContact'
import ChangeName from './ChangeName'
import ResultSearch from './ResultSearch'
import { Input, Item } from 'native-base'

const SearchButton = () => {
    const navigation = useNavigation()
    return(
        <View style={style.search}>
        <TouchableOpacity onPress={() => navigation.navigate('Search') }>
            <Icon name="magnify" size={25} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Setting') }>
            <Icon2 name="options-vertical" size={20} color="white"/>
        </TouchableOpacity>
        </View>
    )
}

const Telephone = () => {
    return(
        <View style={style.search2}>
        <TouchableOpacity>
            <Icon name="video" size={25} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity>
            <Icon name="phone" size={25} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity>
            <Icon2 name="options-vertical" size={20} color="white"/>
        </TouchableOpacity>
        </View>
    )
}

const Option = () => {
    return(
        <View>
        <TouchableOpacity>
            <Icon2 name="options-vertical" size={20} color="white"/>
        </TouchableOpacity>
        </View>
    )
}

const star = () => {
    return(
        <View style={style.search2}>
        <TouchableOpacity>
            <Icon name="star-outline" size={25} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity>
            <Icon3 name="pen" size={25} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity>
            <Icon2 name="options-vertical" size={20} color="white"/>
        </TouchableOpacity>
        </View>
    )
}

const title = ({}) => {
    const navigation = useNavigation()
    
    const friend = useSelector(state=>state.friend)
    const { detail } = friend 
    return (
        <View style={style.cusTitle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={30} color="white" />
            </TouchableOpacity>
            <Image source={detail.avatar === null ? img1 : {uri: `http://54.147.40.208:8585${detail.avatar}`}} style={style.imgTitle} />
            <TouchableOpacity onPress={() => navigation.navigate('DetailFriend')}>
            <View style={style.info}>
                <Text style={style.textName}>{detail.name}</Text>
                <Text style={style.status}>Online</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const left = () => {
    const navigation = useNavigation()
    return (
        <View style={style.cusTitle}>
            <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                <Icon name="arrow-left" size={30} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const leftLeft = () => {
    const navigation = useNavigation()
    return (
        <View style={style.cusTitle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={30} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    search: {
        flexDirection: "row",
        width: 80,
        justifyContent: "space-between",
        paddingRight: 10
    },
    search2: {
        flexDirection: "row",
        width: 120,
        justifyContent: "space-between",
        paddingRight: 10
    },
    cusTitle: {
        flexDirection: "row",
        alignItems: "center"
    },
    imgTitle: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    textName: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },
    info: {
        marginLeft: 10
    },
    status: {
        color: "white"
    }
})

const ChatScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            options={{
                headerShown: false,
                headerStyle: {backgroundColor: "", elevation: 0}
            }}
            name="Chats"
            component={Chats}
            />
        </Stack.Navigator>
    )
}

const StatusScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            options={{
                headerShown: false,
                headerStyle: {backgroundColor: "", elevation: 0}
            }}
            name="Status"
            component={Status}
            />
        </Stack.Navigator>
    )
}

const CallScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            options={{
                headerShown: false,
                headerStyle: {backgroundColor: "", elevation: 0}
            }}
            name="Calls"
            component={Calls}
            />
        </Stack.Navigator>
    )
}

const TopTabs = () => {
  return (
    <Tab.Navigator
    tabBarOptions={{
        labelStyle: { color: "white", fontWeight: "bold", fontSize: 15 },
        style: { backgroundColor: '"rgb(7,94,84)"' },
        indicatorStyle: { backgroundColor: "white"}
      }}
    >
      <Tab.Screen 
      name="CHATS"
      options={{}}
      component={ChatScreen} 
      />
      <Tab.Screen name="STATUS" component={StatusScreen} />
      <Tab.Screen name="CALLS" component={CallScreen} />
    </Tab.Navigator>
  );
}


class Main extends Component {
    render() {
        return (
            <NavigationContainer>
                    {!this.props.auth.isLogin ? (
                    <Stack.Navigator>
                       <Stack.Screen
                        options={{headerShown: false}} 
                        name="Welcome" 
                        component={Welcome} 
                       />
                       <Stack.Screen
                        options={{headerShown: false}} 
                        name="RegisterPhone" 
                        component={RegisterPhone} 
                       />
                       <Stack.Screen
                        options={{headerShown: false}} 
                        name="RegisterProfile" 
                        component={RegisterProfile} 
                       />
                    </Stack.Navigator>
                    ): (
                    <Stack.Navigator>
                        <Stack.Screen
                        options={{
                            title:"SayHai!",
                            headerTitleStyle: {color: "white", letterSpacing: 2, fontWeight: "bold", fontSize: 25, fontFamily: "metropolis"},
                            headerStyle: {backgroundColor: "rgb(7,94,84)", elevation: 0,},
                            headerRight: SearchButton
                        }} 
                        name="TopTabs" 
                        component={TopTabs}
                       />
                       <Stack.Screen
                       options={{
                            title: "",
                            headerLeft: title,
                            // headerTitleStyle: {color: "white", fontWeight: "500"},
                            headerTintColor: "white",
                            headerStyle: {backgroundColor: "rgb(7,94,84)", elevation: 0,},
                            headerRight: Telephone
                        }} 
                       name="ChatRoom"
                       component={ChatRoom}
                       />
                       <Stack.Screen
                       options={{
                           title: "",
                           headerTintColor: "white",
                           headerRight: Option,
                           headerTransparent: true,
                       }}
                       name="DetailFriend"
                       component={DetailFriend}
                       />
                       <Stack.Screen
                       options={{
                           title: "Settings",
                           headerTintColor: "white",
                           headerStyle: {backgroundColor: "rgb(7,94,84)"}
                       }}
                       name="Setting"
                       component={Setting}
                       />
                       <Stack.Screen
                       options={{
                           title: "Profile",
                           headerTintColor: "white",
                           headerStyle: {backgroundColor: "rgb(7,94,84)"}
                       }}
                       name="Profile"
                       component={Profile}
                       />
                       <Stack.Screen
                       options={{
                           title: "Select contact",
                           headerTintColor: "white",
                           headerStyle: {backgroundColor: "rgb(7,94,84)"}
                       }}
                       name="Contact"
                       component={Contact}
                       />
                       <Stack.Screen
                       options={{
                           title: "Add new contact",
                           headerTintColor: "white",
                           headerStyle: {backgroundColor: "rgb(7,94,84)"}
                       }}
                       name="AddContack"
                       component={AddContack}
                       />
                       <Stack.Screen
                       options={{
                           title: "",
                           headerTintColor: "white",
                           headerTransparent: true,
                           headerStyle: {backgroundColor: "rgb(7,94,84)"},
                           headerLeft: left,
                           headerRight: star
                       }}
                       name="InfoContack"
                       component={InfoContact}
                       />
                       <Stack.Screen
                       options={{
                           title: "Change Name",
                           headerTintColor: "white",
                           headerStyle: {backgroundColor: "rgb(7,94,84)"},
                       }}
                       name="ChangeName"
                       component={ChangeName}
                       />
                       <Stack.Screen
                        options={{
                            headerShown: false
                        }}
                        name="Search"
                        component={ResultSearch}
                       />
                    </Stack.Navigator>
                    )}
            </NavigationContainer>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Main);