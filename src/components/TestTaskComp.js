import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const TestTaskComp = () => {
  return (
    <View style={styles.testTask}>
        <View style={styles.testTaskWrapper}>
            <View style={styles.testTaskColOne}>
            <View>
                <Text style={styles.textTask}>Test task</Text>
                <Text style={styles.textLorem}>Lorem ipsum</Text>
            </View>
            <Text style={styles.textCall}>Go to call</Text>
            </View>
            <View style={styles.testTaskColTwo}>
            <Image source={require('../../assets/arrow-dropdownGreen.png')}/>
            </View>
            <View style={styles.testTaskColThree}>
            <Image source={require('../../assets/testTask.png')}/>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  testTask: {
    marginTop: 168,
    paddingHorizontal: 16,
    height: 144,
    justifyContent: 'center',
  },
  testTaskWrapper: {
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'space-between',
    padding: 8
  },
  testTaskColOne: {
    gap: 20,
    paddingTop: 29,
    paddingLeft: 24 
  },
  textCall: {
    color: '#009E81',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    fontWeight: 500, 
  },
  textTask: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    fontWeight: 500,
  },
  textLorem: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    fontWeight: 400,
    color: '#858C94'
  },
  testTaskColTwo: {
    justifyContent: 'flex-end',
    paddingBottom: 15
  }

})

export default TestTaskComp