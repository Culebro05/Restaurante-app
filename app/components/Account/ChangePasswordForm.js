import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import firebase from 'firebase'



export default function ChangePasswordForm(props){
    const { setShowModal, toastRef, setReloadUserInfo} = props
    const [displayPassword, setDisplayPassword] = useState(null)
    const [newDisplayPassword, setNewDisplayPassword] = useState(null)
    const [error, setError]= useState(null)
    const [isLoadig, setIsLoading] = useState(false)

    const onSubmit= () => {
        setError(null)
        if(!newDisplayPassword){
            setError(' No puede estar vacío')
        }else if(displayPassword === newDisplayPassword){
            setError('El nombre no puede ser igual al actual')
        }else{
            setIsLoading(true)
            const update = {
                displayPassword: newDisplayPassword
            }
            firebase
            .auth()
            .currentUser.updatePassword(update)
            .then(()=>{
                console.log('Escelente desde firebase')
                setIsLoading(false)
                setReloadUserInfo(true)
                setShowModal(false)
            })
            .catch(()=>{
                console.log('Error al actualizar el nombre')
                setIsLoading(false)
            })
        }
    }

    return(
        <View style={styles.view}>
            <Input
               placeholder='Contraseña actual'
               containerStyle={styles.input}
               rightIcon={{
                   type:'material-community',
                   name: 'eye-outline',
                   color:'#c2c2c2'
               }}
               defaultValue={displayPassword || ''}
               onChange={(e)=>setDisplayPassword(e.nativeEvent.text)}
               errorMessage={error}
            />
            <Input
               placeholder='Contraseña nueva'
               containerStyle={styles.input}
               rightIcon={{
                   type:'material-community',
                   name: 'eye-outline',
                   color:'#c2c2c2'
               }}
               defaultValue={displayPassword || ''}
               onChange={(e)=>setNewDisplayPassword(e.nativeEvent.text)}
               errorMessage={error}
            />
            <Button
                title='Cambiar nombre'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoadig}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom:10,

    },
    view:{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop: 20,
        width:'95%'
    },
    btn:{
        backgroundColor: '#00a680'
    }
})