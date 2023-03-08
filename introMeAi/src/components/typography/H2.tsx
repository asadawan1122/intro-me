import React from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native'
import { ColorSet, Fonts, FamilySet } from '../../styles'

interface H2Props {
  style?: TextStyle | undefined
  children?: React.ReactNode
}

const H2: React.FC<H2Props> = props => {
  const { style } = props
  return <Text style={{ ...styles.label, ...style }}>{props.children}</Text>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  label: {
    color: ColorSet.white,
    ...Fonts.size.xmedium,
    fontFamily: FamilySet.medium,
  },
})

export default H2
