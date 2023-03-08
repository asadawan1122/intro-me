import React from 'react';
import {StyleSheet,ViewStyle, View} from 'react-native';
import {ColorSet} from '../styles';
import appStyle from '../styles/appStyle';
import Paragraph from './typography/Paragraph';
import * as Animatable from 'react-native-animatable';
import {animation} from '../utils/animations';

interface LineProps {
  children?: string;
  customStyle?: ViewStyle | undefined
}

const Line: React.FC<LineProps> = props => {
  const {children,customStyle} = props;

  return (
    <Animatable.View
      animation={animation.slideRight}
      style={[appStyle.row, appStyle.aiCenter, appStyle.mt20]}>
      <Paragraph style={{color: ColorSet.grayLight}}>{children}</Paragraph>
      <View style={{...styles.line, ...customStyle}} />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: ColorSet.grayLight,
    width: '100%',
  },
});

export default Line;
