import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native'
import {connect } from 'react-redux'
import firebase from 'firebase'
require('firebase/firestore')

function Feed(props) {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        // let posts = []
        if(props.userLoaded == props.following.length && props.following.length !== 0){
            // for(let i=0; i<props.following.length; i++){
            //     const user = props.users.find(el => el.uid === props.following[i])
            //     if(user != undefined){
            //         posts = [...posts, ...user.posts]
            //     }
            // }

            // posts.sort(function(x,y){
            //     return x.creation - y.creation
            // })

            props.feed.sort(function(x,y){
                    return x.creation - y.creation
                })

            setPosts(props.feed)
            
        }
    }, [props.userLoaded, props.feed])


    return (
        <View style={styles.container}>
            
            <View style={styles.containerGallery}>
                <FlatList 
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({item}) => (
                        <View style={styles.containerImg}>
                            <Text style={styles.container}>{item.user.name}</Text>
                            <Text style={styles.container}>{item.caption}</Text>
                            <Image 
                                style={styles.image}
                                source={{uri: item.downloadURL}}
                            />
                            <Text onPress={() => props.navigation.navigate('Comment', {postId: item.id, uid:item.user.uid})}>View Comments...</Text>
                        </View>
                    )}
                />
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 40,
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1,
    },
    image: {
        flex: 1,
        aspectRatio: 1/1
    },
    containerImg: {
        flex: 1/3
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    userLoaded: store.usersState.userLoaded,
})

export default connect(mapStateToProps, null)(Feed)