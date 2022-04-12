import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Input, Button } from "react-native-elements"
import firebase from "firebase"

const ChangePasswordForm = ({displayPassword, setReloadUserInfo, setShowModal}) => {
  const [newPassword, setNewPassword] = useState(null)
  const [currentPassword, setCurrentPassword] = useState(null)
  const [error, setError] = useState({})
  const [isLoadig, setIsLoading] = useState(false)

  const onSubmit = async () => {
    setIsLoading(true)
    setError({})

    if (!newPassword) {
      setError({
        ...error,
        newPassword: "La nueva contraseña no es válida",
      })
      return
    }
    if (!currentPassword) {
      setError({
        ...error,
        currentPassword: "La nueva contraseña no es válida",
      })
      return
    }

    if (displayPassword === newPassword) {
      setError({
        newPassword: "Las contraseñas no pueden ser iguales",
        currentPassword: "Las contraseñas no pueden ser iguales",
      })
      return
    }

    let user = firebase.auth().currentUser
    let email = user.email

    let credential = firebase.auth.EmailAuthProvider.credential(
      email,
      currentPassword
    );
    const validate = await user
      .reauthenticateWithCredential(credential)
      .then((response) => true)
      .catch((e) => {
        if (e?.code == "auth/wrong-password") {
          setError({
            ...error,
            currentPassword: "la contraseña no es valida",
          })
        }
        return false
      });

    if (!(await validate)) {
      setIsLoading(false)
      return
    }

    await user
      .updatePassword(newPassword)
      .then(() => {
        setIsLoading(false)
        setReloadUserInfo(true)
        setShowModal(false)
      })
      .catch((e) => {
        if (e.code == "auth/requires-recent-login") {
          setIsLoading(false)
        }
      })
    setIsLoading(false)
  }

  return (
    <View style={styles.view}>
      <InputText
        placeholder="Contraseña actual"
        icon={{
          type: "lock",
          name: "lock",
          color: "#c2c2c2",
        }}
        is_secure
        value={currentPassword || ""}
        onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
        error={error?.currentPassword}
      />
      <InputText
        placeholder="Nueva contraseña"
        icon={{
          type: "lock",
          name: "lock",
          color: "#c2c2c2",
        }}
        is_secure
        value={newPassword || ""}
        onChange={(e) => setNewPassword(e.nativeEvent.text)}
        error={error?.newPassword}
      />
      <ButtonModal
        text="Cambiar contraseña"
        isLoadig={isLoadig}
        onPress={onSubmit}
      />
    </View>
  )
}

export default ChangePasswordForm;

const ButtonModal = ({ text, isLoadig, onPress }) => {
  return (
    <Button
      title={text || ""}
      containerStyle={styles.btnContainer}
      buttonStyle={styles.btn}
      onPress={onPress}
      loading={isLoadig}
    />
  )
}

const InputText = ({placeholder, value, onChange, error, icon, is_secure}) => {
  return (
    <Input
      placeholder={placeholder || ""}
      containerStyle={styles.input}
      rightIcon={icon}
      defaultValue={value || ""}
      onChange={onChange}
      errorMessage={error || false}
      secureTextEntry={is_secure}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
})
