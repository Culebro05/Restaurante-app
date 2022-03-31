import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Accounts from '../screens/Account/Accounts'
import Login from '../screens/Account/Login'
import Register from '../screens/Account/Register'

const Stack = createStackNavigator()

export default function AccountsStack() {
    return (
       <Stack.Navigator>
            <Stack.Screen
                name='account'
                component={Accounts}
                options={{ title: 'Mi cuenta'}}
            />
            <Stack.Screen
                name='login'
                component={Login}
                options={{title:'Inicie Sesión'}}
            />
            <Stack.Screen
                name='register'
                component={Register}
                options={{title:'Registro'}}
            />
       </Stack.Navigator>
    )
}
