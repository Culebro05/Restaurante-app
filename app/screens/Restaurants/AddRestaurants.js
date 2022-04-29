import React, {useRef, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../components/Loading'

import AddRestaurantsForm from '../../components/Restaurants/AddRestaurantsForm'

export default function AddRestaurants({navigation}) {
  const toastRef = useRef()
  const [loading, setLoading]=useState(false)

  return (
    <KeyboardAwareScrollView>
              <AddRestaurantsForm 
              toastRef={toastRef} 
              setLoading={setLoading}
              navigation={navigation}
              />
              <Loading isVisible={loading} text="Creando restaurante..."/>
              <Toast ref={toastRef} position ="center" opacity={0.5}/>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})