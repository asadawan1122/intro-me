import React from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native'
import { ColorSet, Fonts, FamilySet } from '../../styles'

interface H4Props {
  style?: TextStyle | undefined
  numberOfLines?: number | undefined
  children?: React.ReactNode
}

const H4: React.FC<H4Props> = props => {
  const { style, numberOfLines } = props
  return <Text numberOfLines={numberOfLines} style={{ ...styles.label, ...style }}>{props.children}</Text>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  label: {
    color: ColorSet.white,
    ...Fonts.size.small,
    fontFamily: FamilySet.regular,
  },
})

export default H4
