import React, { useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import FooterComponent from '../../components/FooterComponent'
import { SafeAreaView } from 'react-native-safe-area-context'
import { usePosts } from '../../api/queryClient'
import { useFocusEffect } from '@react-navigation/native'

const SearchScreen = ({ navigation }) => {
    const { data, isLoading, isError} = usePosts()
    const [search, setSearch] = useState('')

    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return data.filter(post => 
            post.id?.toString().includes(q) ||
            post.title?.toLowerCase().includes(q)
        )
    }, [search, data])

    useFocusEffect(
        useCallback(() => {
          setSearch('')
        }, [])
      )

    if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />;
    if (isError || (filtered === undefined)) return <Text>Something went wrong</Text>;

    return (
        <SafeAreaView style={{flex: 1, position: 'relative', backgroundColor: '#F2F3F5'}}>
            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <Text style={[styles.mainTitle, styles.interFont]}>Search</Text>
                    <View style={styles.search}>
                        <Image source={require('../../../assets/Search.png')}/>
                        <TextInput
                            style={[styles.input, styles.interFont]}
                            placeholder="Search Products..."
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>

                </View>
            
                {search ?
                    <FlatList 
                        data={filtered}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.postInfo} onPress={() => navigation.navigate('PostDetails', { post: item })}>
                                    <Text style={[styles.title, styles.interFont]}>ID: {item.id}</Text>
                                    <Text style={[styles.text, styles.interFont]}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                    :
                    <FlatList 
                        data={data}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.postInfo} onPress={() => navigation.navigate('PostDetails', { post: item })}>
                                    <Text style={[styles.title, styles.interFont]}>ID: {item.id}</Text>
                                    <Text style={[styles.text, styles.interFont]}>{item.title}</Text>
                                </TouchableOpacity>
                            )   
                        }}
                    />
                }
            </View>

            <FooterComponent navigation={navigation}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 16,
        marginTop: 15,
        gap: 15
    },
    header: {
        gap: 16
    },
    interFont: {
        fontFamily: 'Inter-Regular'
    },  
    input: {
        color: '#606773',
        fontWeight: 400,
        fontSize: 15
    },
    mainTitle : {
        color: '#06070A',
        fontSize: 22,
        fontWeight: 600,
        lineHeight: 32
    },
    title: {
        color: '#06070A',
        fontSize: 15,
        fontWeight: 500,
        lineHeight: 24,
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        borderColor: '#CED5E0',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    text: {
        color: '#606773',
        fontSize: 15,
        lineHeight: 16,
        fontWeight: 400
    },
    postsContainer: {
        gap: 12
    },
    postInfo: {
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 20,
        gap: 5,
        marginTop: 10
    },

})

export default SearchScreen