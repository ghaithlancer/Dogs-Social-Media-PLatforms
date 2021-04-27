import React from 'react'
import {Text, View, Button} from 'react-native'

export default function Landing({navigation}) {
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button 
                title="Signup"
                onPress={() => navigation.navigate("Signup")}
            />
            <Button 
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    )
}
