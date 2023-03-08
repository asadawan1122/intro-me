import React from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native'
import { ColorSet, Fonts, FamilySet } from '../../styles'

interface ParagraphProps {
  style?: TextStyle | undefined
  numberOfLines?: number | undefined
  children?: React.ReactNode
  onPress?: (() => void) | undefined

}

const Paragraph: React.FC<ParagraphProps> = props => {
  const { style, numberOfLines,onPress } = props
  return (
    <Text onPress={onPress} numberOfLines={numberOfLines} style={{ ...styles.paragraph, ...style }}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  paragraph: {
    color: ColorSet.grey,
    ...Fonts.size.small,
    fontFamily: FamilySet.regular,
  },
})

export default Paragraph
