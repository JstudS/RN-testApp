import { useRoute } from '@react-navigation/native'
import React from 'react'
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native'


const FooterComponent = ({ navigation }) => {    
    const route = useRoute()

    return (
        <View style={styles.footer}>
            <View style={styles.imgWrapper}>
                <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.navigate('Home')}>
                    { route.name === 'Home' ? 
                        <>
                            <Image style={styles.img} source={require('../../assets/footer/itemActive1.png')}/>
                            <Text style={[styles.imgText, {color: '#FA8A34'} ]}>Home</Text>
                        </>
                        :
                        <>
                            <Image style={styles.img} source={require('../../assets/footer/item1.png')}/>
                            <Text style={[styles.imgText, {color: '#858C94'}]}>Home</Text>
                        </>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.imgContainer}>
                    <Image style={styles.img} source={require('../../assets/footer/item2.png')}/>
                    <Text style={[styles.imgText, route.name === 'Portfolio' ? {color: '#FA8A34'} : {color: '#858C94'}]}>Portfolio</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.navigate('Search')}>
                    <Image style={styles.img} source={require('../../assets/footer/item3.png')}/>
                    <Text style={[styles.imgText, route.name === 'Search' ? {color: '#FA8A34'} : {color: '#858C94'}]}>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.navigate('Settings')}>
                    {route.name === 'Settings' ?
                        <>
                            <Image style={styles.img} source={require('../../assets/footer/itemActive4.png')}/>
                            <Text style={[styles.imgText, {color: '#FA8A34'}]}>Profile</Text>
                        </>
                        :
                        <>
                            <Image style={styles.img} source={route.name === 'Language' ? require('../../assets/footer/more.png') : require('../../assets/footer/item4.png')}/>
                            {route.name === 'Language' ? 
                                <Text style={[styles.imgText, {color: '#FA8A34'}]}>Language</Text>
                                :
                                <Text style={[styles.imgText, {color: '#858C94'}]}>Profile</Text>
                            }
                        </>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 1,
        zIndex: 5,
        backgroundColor: '#FFFFFF'
    },
    imgWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderTopWidth: 1,
        gap: 72,
        borderTopColor: '#E6EBF5',
        height: 51
    },
    imgContainer: {
        gap: 1,
        alignItems: 'center',
    },
    img: {
        height: 27,
        width: 27
    },
    imgText: {
        color: '#858C94',
        fontSize: 10,
        fontWeight: 500,
        fontFamily: 'Inter-Regular',
        textAlign: 'center'
    }
}) 

export default FooterComponent