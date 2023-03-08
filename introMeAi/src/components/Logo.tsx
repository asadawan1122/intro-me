import React from 'react';
import {Image, ImageStyle, StyleSheet, View, ViewStyle} from 'react-native';
import appStyle from '../styles/appStyle';
import {screenWidth} from '../styles/screenSize';
import {Images} from '../constants/assets/images';
import * as Animatable from 'react-native-animatable';

interface LogoProps {
  style?: ViewStyle | undefined;
  imageStyle?: ImageStyle | undefined;
  animationType?: string | 'slideInUp';
}

const Logo: React.FC<LogoProps> = props => {
  const {style, imageStyle, animationType} = props;

  return (
    <Animatable.View
      animation={animationType}
      style={[appStyle.aiCenter, {...style}]}>
      <Image
        style={{
          ...styles.image,
          ...imageStyle,
        }}
        source={Images.logo}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: screenWidth.width60,
    height: 118,
    resizeMode: 'contain',
  },
});

export default Logo;
