import React from 'react';
import {StyleSheet, View, Image, Platform, ViewStyle} from 'react-native';

import {H3, HeaderBackButton, Logo} from '../components';
import {Icons} from '../constants/assets/icons';
import {ColorSet} from '../styles';
import appStyle from '../styles/appStyle';
import {FamilySet} from '../styles/fontFamily';
import {animation} from '../utils/animations';

interface CheckboxProps {
  isActive?: boolean | undefined;
  customStyle?: ViewStyle | undefined;
}

const Checkbox: React.FC<CheckboxProps> = props => {
  const {isActive, customStyle} = props;

  return (
    <View>
      {isActive ? (
        <Image style={{...styles.icon}} source={Icons.check} />
      ) : (
        <Image style={styles.icon} source={Icons.uncheck} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
  },
});

export default Checkbox;
