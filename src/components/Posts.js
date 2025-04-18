import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Posts = () => {
  return (
    <View style={styles.postsWrapper}>
        <Text style={styles.postsTitle}>Posts</Text>
        
    </View>
  )
}

const styles = StyleSheet.create({
    postsWrapper: {
        marginTop: 32,
        paddingHorizontal: 16
    },
    postsTitle: {
        fontWeight: 400,
        color: '#606773',
        fontFamily: 'Inter-Regular',
        fontSize: 15,
    },
})

export default Posts