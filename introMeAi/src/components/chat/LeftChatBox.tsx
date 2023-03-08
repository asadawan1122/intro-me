import React from 'react';
import {StyleSheet, ViewStyle, View} from 'react-native';
import {ColorSet} from '../../styles';
import appStyle from '../../styles/appStyle';
import Paragraph from '../typography/Paragraph';
import * as Animatable from 'react-native-animatable';
import {animation} from '../../utils/animations';

interface LineProps {
  children?: string;
  customStyle?: ViewStyle | undefined;
  isAI?: Boolean | false;
}

const LeftChatBox: React.FC<LineProps> = props => {
  const {children, isAI} = props;
  const backgroundColor = isAI ? ColorSet.purple : ColorSet.softGray;
  const textColor = isAI ? ColorSet.white : ColorSet.black;
  const animationType = animation.slideLeft;

  return (
    <Animatable.View style={[styles.chatContainer]} animation={animationType}>
      <View
        style={[styles.chatTextContainer, {backgroundColor: backgroundColor}]}>
        <Paragraph style={{color: textColor}}>{children}</Paragraph>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  chatTextContainer: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  chatContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
    alignSelf: 'flex-start',
  },
});

export default LeftChatBox;
