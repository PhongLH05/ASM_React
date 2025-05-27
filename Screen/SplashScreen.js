import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import logo from '../assets/logo.png'

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image 
      source={logo}
      style={styles.image}
      />

      <ActivityIndicator size="large" color="#fff" style={styles.indicator}/>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        width: 500,
        height: 500,
        resizeMode: 'cover'
    },
    indicator: {
      marginTop: 20,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#fff',
    }
  });