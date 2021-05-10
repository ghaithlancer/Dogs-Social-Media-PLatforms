import React, {useState} from 'react'
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')
require('firebase/firebase-storage')

export default function Save(props) {
    
    const [caption, setCaption] = useState('')
    
    const uploadImage = async () => {
        const uri = props.route.params.image
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
        // console.log(childPath)
        const res = await fetch(uri)
        const blob = await res.blob()

        const task = firebase.storage().ref().child(childPath).put(blob)
        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL()
            .then((snapshot) => {
                savePostData(snapshot)
                // console.log(snapshot)
            })
        }

        const taskErr = snapshot => {
            console.log(snapshot)
        }

        task.on('state_changed', taskProgress, taskErr, taskCompleted)
    }

    const savePostData = (downloadURL) => {
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts').add({
            downloadURL,
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then((function () {
            props.navigation.popToTop()
        }))
    }
    
    return (
        <View style={{flex: 1}}>
            <Image source={{uro: props.route.params.image}} />
            <TextInput 
                placeholder="Caption . . ."
                onChangeText={(caption) => setCaption(caption)}
            />

            <Button 
                title='Save'
                onPress={() => uploadImage()}
            />
        </View>
    )
}
