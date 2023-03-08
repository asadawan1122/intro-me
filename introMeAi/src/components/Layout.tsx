import React from 'react';
import {Image, ImageStyle, StyleSheet, View, ViewStyle} from 'react-native';
import appStyle from '../styles/appStyle';
import {screenWidth} from '../styles/screenSize';
import {Images} from '../constants/assets/images';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface LogoProps {
  style?: ViewStyle | undefined;
  children?: any;
}

const Logo: React.FC<LogoProps> = props => {
  const {style} = props;
  return (
    <KeyboardAwareScrollView
      style={[appStyle.mh20, {...style}]}
      contentContainerStyle={appStyle.flex1}>
      {props.children}
      {/* <Loader
                    isLoading={loader}
                    layout={'outside'}
                /> */}
    </KeyboardAwareScrollView>
  );
};

export default Logo;
