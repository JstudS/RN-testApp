import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'

const CardsComponent = () => {
  return (
    <View style={styles.cards}>
        <Text style={styles.cardsTitle}>Before you Start</Text>
        <View style={styles.cardsWrapper}>
            <ImageBackground style={styles.cardItem} source={require('../../assets/bg/bgCard.png')}>
                <View style={styles.cardInfo}>
                    <Image source={require('../../assets/iconCard.png')}/>
                    <Text style={styles.cardText}>Link your Bank Account</Text>
                </View>
                <View style={styles.cardSteps}>
                    <Text style={styles.stepsText}>2 steps</Text>
                    <Image source={require('../../assets/ArrowLeft.png')}/>
                </View>
            </ImageBackground>
            <ImageBackground style={styles.cardItem} imageStyle={{ borderRadius: 20 }} source={require('../../assets/bg/bgCardRed.png')}>
                <View style={styles.cardInfo}>
                    <Image source={require('../../assets/iconCardGreen.png')}/>
                    <Text style={[styles.cardText, {color: '#06070A'}]}>Add funds to your wallet</Text>
                </View>
                <View style={styles.cardSteps}>
                    <Text style={[styles.stepsText, {color: '#606773'}]}>3 steps</Text>
                    <Image source={require('../../assets/ArrowLeft.png')}/>
                </View>
            </ImageBackground>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cards: {
    marginTop: 32,
    paddingLeft: 16,
    gap: 5
  },
  cardsTitle: {
    fontWeight: 400,
    color: '#606773',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
  },
  cardsWrapper: {
    flexDirection: 'row',
    gap: 16
  },
  cardItem: {
    width: 233,
    height: 152,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 12,
  },
  cardText: {
    fontWeight: 500,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 24,
    width: 133
  },
  cardSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  stepsText: {
    fontWeight: 500,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
  }
})

export default CardsComponent