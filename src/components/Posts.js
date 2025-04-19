import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { usePosts } from '../api/queryClient'
import { useNavigation } from '@react-navigation/native'

const Posts = ({ navigation }) => {
  const { data, isLoading, isError } = usePosts()
  if (isLoading) return <Text>Loading...</Text>
  if (isError) return <Text>Error fetching data</Text>

  return (
    <View style={styles.postsWrapper}>
        <Text style={styles.postsHeader}>Posts</Text>
        <View style={styles.postsContainer}>
          {data.map(post => (
            <TouchableOpacity key={post.id} style={styles.postInfo} onPress={() => navigation.navigate('PostDetails', { post })}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postBody}>{post.body}</Text>
            </TouchableOpacity>
          ))}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    postsWrapper: {
      marginTop: 32,
      paddingHorizontal: 16,
      gap: 7,
      paddingBottom: 55
    },
    postsHeader: {
      fontWeight: 400,
      color: '#606773',
      fontFamily: 'Inter-Regular',
      fontSize: 15,
    },
    postsContainer: {
      gap: 8
    },
    postInfo: {
      borderRadius: 16,
      backgroundColor: '#FFFFFF',
      paddingLeft: 16,
      paddingRight: 20,
      paddingVertical: 12,
      gap: 3
    },
    postTitle: {
      color: '#171718',
      fontSize: 18,
      fontWeight: 500,
      fontFamily: 'Inter-Regular'
    },
    postBody:{
      color: '#414141',
      fontSize: 16,
      fontWeight: 500,
      fontFamily: 'Inter-Regular',
      textAlign: 'justify'
    }
})

export default Posts