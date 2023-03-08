import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ColorSet} from '../../styles';
import Logo from '../Logo';

const HeaderRightIcon: React.FC<HeaderRightIconProps> = props => {
  return (
    <View style={[styles.headerRight]}>
      <Logo />
    </View>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 20,

    position: 'absolute',
    zIndex: 99,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HeaderRightIcon;
