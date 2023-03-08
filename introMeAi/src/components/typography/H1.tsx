import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {ColorSet, Fonts, FamilySet} from '../../styles';

interface H1Props {
  style?: TextStyle | undefined;
  children?: React.ReactNode;
  numberOfLines?: number | undefined;
}

const H1: React.FC<H1Props> = props => {
  const {style, numberOfLines} = props;
  return (
    <Text numberOfLines={numberOfLines} style={{...styles.label, ...style}}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  label: {
    color: ColorSet.white,
    ...Fonts.size.large,
    fontFamily: FamilySet.bold,
  },
});

export default H1;
