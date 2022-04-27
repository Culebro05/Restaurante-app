import React,{useState} from "react"
import { StyleSheet, View, Text } from "react-native"
import { ListItem, Icon } from "react-native-elements"
import Modal from "../Modal"
import ChangeDisplayNameForm from "./ChangeDisplayNameForm"
import ChangeEmailForm from "./ChangeEmailForm"
import ChangePasswordForm from "./ChangePasswordForm"

export default function AccountOptions(props) {
  const { userInfo, toastRef, setReloadUserInfo } = props
  const [showModal, setShowModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)

  const selectedComponent = (key) => {
    switch(key){
      case 'displayName':
        setRenderComponent(
          <ChangeDisplayNameForm
              displayname={userInfo.displayname}
              setShowModal={setShowModal}
              toastRef={toastRef}
              setReloadUserInfo={setReloadUserInfo}
          />
        )
        setShowModal(true)
        break
      case 'displayEmail':
        setRenderComponent(
          <ChangeEmailForm
          displayEmail={userInfo.displayEmail}
          setReloadUserInfo={setReloadUserInfo}
          setShowModal={setShowModal}
        />
        )
        setShowModal(true)
        break
      case 'currentPassword':
        setRenderComponent(
          <ChangePasswordForm
              displaypassword={userInfo.displaypassword}
              setShowModal={setShowModal}
              toastRef={toastRef}
              setReloadUserInfo={setReloadUserInfo}
          />
        )
        setShowModal(true)
        break
      default:
        setRenderComponent(null)
        setShowModal(false)
    }
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
          <ListItem.Chevron/>
        </ListItem>
      ))}
      {renderComponent &&(
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        {renderComponent}
      </Modal>
       )}
    </View>
  )
}

function generateOptions(selectedComponent) {
  return [
    {
      title: "Cambia nombres y apellidos",
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
      onPress: () => selectedComponent("currentPassword"),
    },
  ]
}
