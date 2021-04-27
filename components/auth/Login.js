import React, { Component } from 'react'
import {View, Button, TextInput} from 'react-native'
import firebase from 'firebase'

export class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            name: ''
        }
        this.onSignUp = this.onSignIn.bind(this)
    }

    onSignIn(){
        const {email, password } = this.state
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TextInput 
                    placeholder="Email"
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput 
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                />

                <Button 
                    onPress={() => this.onSignIn()}
                    title="Sign In"
                />
            </View>
        )
    }
}

export default Login
