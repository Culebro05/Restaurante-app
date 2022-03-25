import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {Icon} from 'react-native-elements'

// import Restaurants from '../screens/Restaurants'
import RestaurantsStack from './RestaurantsStack'
// import Favorites from '../screens/Favorites'
import FavoritesStack from './FavoritesStack'
// import TopRestaurants from '../screens/TopRestaurants'
import TopRestaurantsStack from './TopRestaurantsStack'
// import Search from '../screens/Search'
import SearchStack from './SearchStack'
// import Accounts from '../screens/Accounts'
import AccountsStack from "./AccountsStack"



const Tab = createBottomTabNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='restaurants'
                tabBarOptions={{
                    inativeTintColor:'#646464',
                    activeTintColor: '#00a680'
                }}
                screenOptions = {({route}) => ({
                    tarBarIcon: ({color}) => screenOptions(route, color)
                })}
            >
                <Tab.Screen 
                name= 'restaurants' 
                component={RestaurantsStack}
                options={{title:"Restaurantes"}}
                />
                <Tab.Screen 
                name= 'favorites' 
                component={FavoritesStack}
                options={{title:"Favoritos"}}
                />
                <Tab.Screen 
                name= 'top-restaurants' 
                component={TopRestaurantsStack}
                options={{title:"Top 5"}}
                />
                <Tab.Screen 
                name= 'serch' 
                component={SearchStack}
                options={{title:"Buscar"}}
                />
                <Tab.Screen 
                name= 'account' 
                component={AccountsStack}
                options={{title:"Cuenta"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function screenOptions(route, color){
    let iconName
    switch(route, name){
        case 'restaurants':
            iconName='compass-outline'
            break
        case 'favorites':
            iconName='heart-outline'
            break
        case 'top-restaurants':
            iconName='star-outline'
            break
        case 'serch':
            iconName='magnify'
            break
        case 'account':
            iconName='home-outline'
            break
    }
    return(
        <Icon type='material-community' name={iconName} size={22} color={color}/>
    )
}