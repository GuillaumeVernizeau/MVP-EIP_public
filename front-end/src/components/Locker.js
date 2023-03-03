import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../../assets/mapc.svg')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 339,
    height: 615,
    marginBottom: 10,
  },
})