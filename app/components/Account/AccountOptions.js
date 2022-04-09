import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { ListItem, Icon } from "react-native-elements"

export default function AccountOptions(props) {
  const { userInfor, toastRef } = props
  const selectedComponent = (key) => {
    console.log("click")
    console.log(key)
  }
  const menuOptions = generateOptions(selectedComponent)

  return (
    <View>
      {menuOptions.map((menu, index) => (
        <ListItem key={index} bottomDivider onPress={menu.onPress}>
          <Icon name={menu.iconNameLeft} />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  )
}

function generateOptions(selectedComponent) {
  return [
    {
      title: "Cambiar nombres y apellidos",
      iconNameLeft: "account-circle",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Cambiar email",
      iconNameLeft: "drafts",
      onPress: () => selectedComponent("displayEmail"),
    },
    {
      title: "Cambiar password",
      iconNameLeft: "lock",
      onPress: () => selectedComponent("displayPassword"),
    },
  ]
}
