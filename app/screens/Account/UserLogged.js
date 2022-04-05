import React from 'react'
import {View, Text} from 'react-native'
import firebase from 'firebase'
import { Button } from 'react-native-elements'

export default function UserLogged(){
    return(
       <View>
         <Text>UserLogged</Text>
        <Button title='Cerrar sesión' onPress={()=>firebase.auth().signOut}/>
       </View>
    )
}