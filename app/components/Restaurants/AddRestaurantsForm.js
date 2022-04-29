import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Avatar, Button, Icon, Input, Image } from "react-native-elements";
import CountryPicker from "react-native-country-picker-modal";
import { map, size, filter, isEmpty } from "lodash";

import { loadImageFromGaallery, validateEmail } from "../../utils/helpers";

const widthScreen = Dimensions.get("window").width;

export default function AddRestaurantsForm({loading, setLoading, navigation }) {
  const [formData, setFormData] = useState(defaulFormValues());
  const [errorName, setErrorName] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [imagesSelected, setImagesSelected] = useState([]);

  const addRestaurant = async () => {
    if (!validForm()) {
      return;
    }
    console.log(formData);
    console.log("Siiii");
  };

  const validForm = () => {
    clearErrors();
    let isValid = true;

    if (isEmpty(formData.name)) {
      setErrorName("Debes ingresar el nombre del restaurante.");
      isValid = false;
    }

    if (isEmpty(formData.address)) {
      setErrorAddress("Debes ingresar la dirección del restaurante.");
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes ingresar un email de restaurante válido.");
      isValid = false;
    }

    if (size(formData.phone) < 10) {
      setErrorPhone("Debes ingresar un teléfono de restaurante válido.");
      isValid = false;
    }

    if (isEmpty(formData.description)) {
      setErrorDescription("Debes ingresar una descripción del restaurante.");
      isValid = false;
    }

    if (size(imagesSelected) === 0) {
      toastRef.current.show(
        "Debes de agregar al menos una imagen al restaurante.",
        3000
      );
      isValid = false;
    }

    return isValid;
  };

  const clearErrors = () => {
    setErrorName(null);
    setErrorAddress(null);
    setErrorEmail(null);
    setErrorPhone(null);
    setErrorDescription(null);
  };

  return (
    <ScrollView style={styles.viewContainer}>
      <ImageRestaurant imageRestaurant={imagesSelected} />
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
        imageSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />

      <Button
        title="Crear restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.btnAddRestaurant}
      />
    </ScrollView>
  );
}

function ImageRestaurant({ imageRestaurant }) {
  return (
    <View style={styles.viewPhoto}>
      <Image
        style={{ width: widthScreen, height: 200 }}
        source={
          imageRestaurant
            ? { uri: imageRestaurant }
            : require("../../../assets/img/Sin foto.png")
        }
      />
    </View>
  );
}

function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
  const imageSelect = async () => {
    const response = await loadImageFromGaallery([4, 3]);
    if (response.status) {
      toastRef.current.show("No has seleccionado ninguna imagen", 3000);
      return;
    }
    setImagesSelected([imagesSelected, response.image]);
  };

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
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView horizontal style={styles.viewImages}>
      {size(imagesSelected) < 10 && (
        <Icon
          type="material-community"
          name="camera"
          color="#00a680"
          containertStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}
      {map(imagesSelected, (imageRestaurant, index) => {
        <Avatar
          key={index}
          style={styles.minitureStyle}
          source={{ uri: imageRestaurant }}
          onPress={() => removeImage(imageRestaurant)}
        />;
      })}
    </ScrollView>
  );
}

function FormAdd({ formData, setFormData, errorName, errorDescription, errorPhone, errorEmail, errorAddress}) {
  const [country, setCountry] = useState("MX");
  const [callingCode, setCallingCode] = useState("52");
  const [phone, setPhone] = useState("");

  const onChange = (e, type) => {
    setFormData({ formData, [type]: e.nativeEvent.text });
  };
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante"
        defaultValues={formData.name}
        onChange={(e) => onChange(e, "name")}
        errorMessage={errorName}
      />
      <Input
        placeholder="Direccion del restaurante"
        defaultValues={formData.address}
        onChange={(e) => onChange(e, "address")}
        errorMessage={errorAddress}
      />
      <Input
        keyboardType="email-address"
        placeholder="Email del restaurante"
        defaultValues={formData.email}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errorEmail}
      />
      <View style={styles.phoneView}>
        <CountryPicker
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          containertStyle={styles.countryPicker}
          countryCode={country}
          onSelect={(country) => {
            setFormData({
              formData,
              country: country.cca2,
              callingCode: country.callingCode[0],
            });
          }}
        />
        <Input
          placeholder="WhatsApp del restaurante"
          keyboardType="phone-pad"
          containertStyle={styles.inputPhone}
          defaultValues={formData.phone}
          onChange={(e) => onChange(e, "phone")}
          errorMessage={errorPhone}
        />
        <Input
          placeholder="Descripcion del restaurante"
          multiline
          containertStyle={styles.textArea}
          defaultValues={formData.description}
          onChange={(e) => onChange(e, "description")}
          errorMessage={errorDescription}
        />
      </View>
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
    callingCode: "52",
  };
};

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
  btnAddRestaurant: {
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
