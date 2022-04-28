import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import AddRestaurantsForm from '../../components/Restaurants/AddRestaurantsForm'
export default function AddRestaurants({navigation}) {
  return (
    <View>
        <AddRestaurantsForm/>
    </View>
  )
}

const styles = StyleSheet.create({})