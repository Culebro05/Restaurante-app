import React, { useState } from "react"
import {Alert, Dimensions, ScrollView, StyleSheet, Text, View} from "react-native"
import { Avatar, Button, Icon, Input, Image } from "react-native-elements"
import CountryPicker from "react-native-country-picker-modal"
import { map, size, filter, isEmpty } from "lodash"

import { loadImageFromGallery, validateEmail } from "../../utils/helpers"

const widthScreen = Dimensions.get('window').width

export default function AddRestaurantsForm({toastRef, setLoading, navigation }) {
  const [formData, setFormData] = useState(defaulFormValues());
  const [errorName, setErrorName] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [imagesSelected, setImagesSelected] = useState([]);

  const Addrestaurants = async () => {
    console.log(formData)
    console.log("Siiii")
    if (!validForm()) {
      return
    }
  }

  const validForm = () => {
    clearErrors()
    let isValid = true

    if (isEmpty(formData.name)) {
      setErrorName("Debes ingresar el nombre del restaurante.")
      isValid = false
    }

    if (isEmpty(formData.address)) {
      setErrorAddress("Debes ingresar la dirección del restaurante.")
      isValid = false
    }

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes ingresar un email de restaurante válido.")
      isValid = false
    }

    if (size(formData.phone) < 10) {
      setErrorPhone("Debes ingresar un teléfono de restaurante válido.")
      isValid = false
    }

    if (isEmpty(formData.description)) {
      setErrorDescription("Debes ingresar una descripción del restaurante.")
      isValid = false
    }
  }

  const clearErrors = () => {
    setErrorName(null)
    setErrorAddress(null)
    setErrorEmail(null)
    setErrorPhone(null)
    setErrorDescription(null)
  }

  return (
    <ScrollView style={styles.viewContainer}>
      <Imagerestaurants Imagerestaurants={imagesSelected[0]} />
      <FormAdd
        formData={formData}
        setFormData={setFormData}
        errorName={errorName}
        errorDescription={errorDescription}
        errorPhone={errorPhone}
        errorEmail={errorEmail}
        errorAddress={errorAddress}
      />
      <UploadImage
        toastRef={toastRef}
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />

      <Button
        title="Crear restaurante"
        onPress={Addrestaurants}
        buttonStyle={styles.btnAddrestaurants}
      />
    </ScrollView>
  )
}

function Imagerestaurants({ Imagerestaurants }) {
  return (
    <View style={styles.viewPhoto}>
      <Image
        style={{ width: widthScreen, height: 200 }}
        source={
          Imagerestaurants
            ? { uri: Imagerestaurants }
            : require("../../../assets/img/Sin foto.png")
        }
      />
    </View>
  )
}

function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
  const imageSelect = async () => {
    const response = await loadImageFromGallery([4, 3])
    if (!response.status) {
      toastRef.current.show("No has seleccionado ninguna imagen", 3000)
      return
    }
    setImagesSelected([imagesSelected, response.image])
  }

  const removeImage = (image) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estas seguro de eliminar la imagen?",
      [
        {
          text: "No",
          style: "Cancell",
        },
        {
          text: "Si",
          onPress: () => {
            setImagesSelected(
              filter(imagesSelected, (imageUrl) => imageUrl !== image)
            )
          }
        }
      ],
      { cancelable: false }
    )
  }

  return (
    <ScrollView horizontal style={styles.viewImages}>
      {
      size(imagesSelected) < 10 && (
        <Icon
          type="material-community"
          name="camera"
          color="#00a680"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )
      }
      {
      map(imagesSelected, (Imagerestaurants, index) => {
        <Avatar
          key={index}
          style={styles.minitureStyle}
          source={{ uri: Imagerestaurants }}
          onPress={() => removeImage(Imagerestaurants)}
        />
      })
      }
    </ScrollView>
  )
}

function FormAdd({ formData, setFormData, errorName, errorDescription, errorPhone, errorEmail, errorAddress}) {
  const [country, setCountry] = useState("MX")
  const [callingCode, setCallingCode] = useState("52")
  const [phone, setPhone] = useState("")

  const onChange = (e, type) => {
    setFormData({ formData, [type] : e.nativeEvent.text });
  }

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante"
        defaultValue={formData.name}
        onChange={(e) => onChange(e, "name")}
        errorMessage={errorName}
      />
      <Input
        placeholder="Direccion del restaurante"
        defaultValue={formData.address}
        onChange={(e) => onChange(e, "address")}
        errorMessage={errorAddress}
      />
      <Input
        keyboardType="email-address"
        placeholder="Email del restaurante"
        defaultValue={formData.email}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errorEmail}
      />
      <View style={styles.phoneView}>
        <CountryPicker
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          containerStyle={styles.countryPicker}
          countryCode={country}
          onSelect={(country) => {
            setFormData({
              formData,
              'country': country.cca2,
              'callingCode': country.callingCode[0],
            })
            setCountry(country.cca2) 
            setCallingCode(country.callingCode[0])
          }}
        />
        <Input
          placeholder="WhatsApp del restaurante"
          keyboardType="phone-pad"
          containerStyle={styles.inputPhone}
          defaultValue={formData.phone}
          onChange={(e) => onChange(e, "phone")}
          errorMessage={errorPhone}
        />
              </View>
        <Input
          placeholder="Descripcion del restaurante"
          multiline
          containerStyle={styles.textArea}
          defaultValue={formData.description}
          onChange={(e) => onChange(e, "description")}
          errorMessage={errorDescription}
        />
    </View>
  );
}

const defaulFormValues = () => {
  return {
    name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    country: "MX",
    callingCode: "52"
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    height: "100%",
  },
  viewForm: {
    marginHorizontal: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
  },
  phoneView: {
    width: "80%",
    flexDirection: "row",
  },
  inputPhone: {
    width: "80%",
  },
  btnAddrestaurants: {
    margin: 20,
    backgroundColor: "#442484",
  },
  viewImages: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  minitureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
});
