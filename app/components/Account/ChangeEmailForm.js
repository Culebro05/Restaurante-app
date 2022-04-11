import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import firebase from "firebase";
import { Input, Button } from "react-native-elements";

const ChangeEmailForm = ({ displayEmail, setReloadUserInfo, setShowModal }) => {
  const [newEmail, setNewEmail] = useState(null);
  const [error, setError] = useState(null);
  const [isLoadig, setIsLoading] = useState(false);
  

  const onSubmit = () => {
    setError(null);
    if (!newEmail) {
      setError("El email no puede ser vacío");
      return;
    }
    let regexEAmail = new RegExp("^[^s@]+@([^s@.,]+.)+[^s@.,]{2,}$");

    if (!regexEAmail.test(newEmail)) {
      setError("El email no es valido");
      return;
    }

    if (displayEmail === newEmail) {
      setError("El email no puede ser igual al actual");
      return;
    }

    setIsLoading(true);
    const user = firebase.auth().currentUser;
    user
      .updateEmail(newEmail)
      .then(() => {
        firebase.auth().currentUser.reload();

        setIsLoading(false);
        setReloadUserInfo(true);
        setShowModal(false);
      })
      .catch((e) => {
        if (e.code == "auth/requires-recent-login") {
          setError(
            "Debes iniciar sesión nuevamente para actualizar tu email"
          );
          setIsLoading(false);
        }
      });
}

  return (
    <View style={styles.view}>
      <InputText
        placeholder="Nuevo email"
        icon={{
          type: "material-community",
          name: "email",
          color: "#c2c2c2",
        }}
        value={newEmail || ""}
        onChange={(e) => setNewEmail(e.nativeEvent.text)}
        error={error}
      />

      <ButtonModal text="Cambiar email" isLoadig={isLoadig} onPress={onSubmit}       />
    </View>
  );
};

export default ChangeEmailForm;

const ButtonModal = ({ text, isLoadig, onPress }) => {
    return (
      <Button
        title={text || ""}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onPress}
        loading={isLoadig}
      />
    );
  };

  const InputText = ({placeholder, value, onChange, error, icon, is_secure }) => {
    return (
      <Input
        placeholder={placeholder    || ''}
        containerStyle={styles.input}
        rightIcon={icon}
        defaultValue={value || ""}
        onChange={onChange}
        errorMessage={error || false}
        secureTextEntry={is_secure}
      />
    );
  };



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
});
