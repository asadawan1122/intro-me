import React from 'react';
import {StyleSheet, ViewStyle, View} from 'react-native';
import {ColorSet} from '../../styles';
import appStyle from '../../styles/appStyle';
import Paragraph from '../typography/Paragraph';
import {animation} from '../../utils/animations';
import * as Animatable from 'react-native-animatable';

interface LineProps {
  children?: string;
  customStyle?: ViewStyle | undefined;
  isAI?: Boolean | false;
}

const RightChatBox: React.FC<LineProps> = props => {
  const {children, isAI} = props;
  const backgroundColor = isAI?ColorSet.green:ColorSet.grayLight;
  const textColor = isAI?ColorSet.black:ColorSet.white;
  const animationType = animation.slideRight;

  return (
    <Animatable.View
    animation={animationType}
    style={[styles.chatContainer]}>
      <View style={[styles.chatTextContainer,{backgroundColor:backgroundColor}]}>
        <Paragraph style={{color: textColor}}>{children}</Paragraph>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  chatTextContainer: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    // marginRight: 10,
  },
  chatContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
    alignSelf: 'flex-end',
  },
});

export default RightChatBox;
