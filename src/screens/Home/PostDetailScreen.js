import React from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ArrowDropdown from '../../components/ArrowDropdown'
import CustomButton from '../../components/CustomButton'
import { useComments } from '../../api/queryClient'

const PostDetailScreen = ({ route, navigation }) => {
    const { data, isLoading, isError } = useComments()
    const { post } = route.params

    if (isError && !data) return <Text>Something went wrong</Text>

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#F2F3F5'}}>
            <ScrollView style={{flexGrow: 1, position: 'relative'}}>
                <ArrowDropdown navigation={navigation}/>

                <View style={styles.headerBgContainer}>
                    <Image
                        style={styles.headerBg}
                        source={require('../../../assets/bg/bgPostDetails.png')}
                    />
                </View>

                <View style={styles.headerContent}>
                    <Text style={[styles.headerTitle, styles.interFont]}>{post.title}</Text>
                    <Image source={require('../../../assets/book.png')}/>
                </View>
                
                <View style={styles.aboutWrapper}>
                    <Text style={[styles.title, styles.interFont]}>About</Text>
                    <View style={styles.aboutContainer}>
                        <Text style={[styles.aboutBody, styles.interFont]}>{post.body}</Text>
                    </View>
                </View>

                <View style={styles.commentsWrapper}>
                    <Text style={[styles.title, styles.interFont]}>Comments</Text>
                    {isLoading ? 
                        <Text>Loading...</Text> 
                        :
                        data.map( item =>(
                            <View key={item.id} style={styles.commentsContainer}>
                                <View>
                                    <Text style={[styles.commentsName, styles.interFont]}>{item.name}</Text>
                                    <Text style={[styles.commentsEmail, styles.interFont]}>{item.email}</Text>
                                </View>
                                <Text style={[styles.commentsBody, styles.interFont]}>{item.body}</Text>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>

            <View style={styles.buttonBg}>
                <View style={styles.buttonContainer}>
                    <CustomButton label={'Back'} onPressFunc={navigation.goBack}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerBgContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 480
    },
    headerBg: {
        height: '100%',
        width: '100%',
        objectFit: 'fill',
    },
    headerContent: {
        marginTop: 108,
        alignItems: 'center',
        gap: 61
    },
    headerTitle: {
        color: '#06070A',
        fontWeight: 700,
        fontSize: 28,
        textAlign: 'center',
    },
    interFont: {
        fontFamily: 'Inter-Regular',
    },
    aboutWrapper: {
        marginTop: 33,
        paddingHorizontal: 16,
        gap: 7,
    },  
    aboutContainer: {
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontWeight: 400,
        color: '#606773',
        fontSize: 15,
    },
    aboutBody: {
        fontWeight: 400,
        color: '#06070A',
        fontSize: 15,
        lineHeight: 32,
        textAlign: 'justify'
    },
    commentsWrapper: {
        marginTop: 53,
        paddingHorizontal: 16,
        gap: 12,
        paddingBottom: 5
    },
    commentsContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        gap: 10,
    },
    commentsName: {
        color: '#000000',
        lineHeight: 24,
        fontSize: 18,
        fontWeight: 500
    },
    commentsEmail: {
        color: '#06070A',
        lineHeight: 24,
        fontSize: 15,
        fontWeight: 500
    },
    commentsBody: {
        color: '#06070A',
        lineHeight: 19,
        fontSize: 14,
        fontWeight: 400,
        textAlign: 'justify'
    },
    buttonBg: {
        backgroundColor: '#FFFFFF',
    },
    buttonContainer: {
        paddingHorizontal: 28,
        paddingVertical: 10  
    }
})

export default PostDetailScreen