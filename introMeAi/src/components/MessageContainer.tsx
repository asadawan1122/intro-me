import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Image} from 'react-native-animatable';
import {Icons} from '../constants/assets/icons';
import {ColorSet} from '../styles';
import appStyle from '../styles/appStyle';
import H3 from './typography/H3';
import H4 from './typography/H4';

interface MessageContainerProps {
  containerStyle?: ViewStyle | undefined;
  style?: TextStyle | undefined;
  numberOfLines?: number | undefined;
  children?: React.ReactNode;
  title1?: string;
  title2?: string;
  onPress?: (() => void) | undefined;
}

const MessageContainer: React.FC<MessageContainerProps> = props => {
  const {title1, title2, numberOfLines, containerStyle, onPress} = props;
  return (
    <TouchableOpacity
    onPress={onPress}
      style={{
        ...styles.main,
        ...containerStyle,
      }}>
      <View>
        <H3>{title1}</H3>
        <H4 numberOfLines={1} style={styles.text}>
          {title2}
        </H4>
      </View>
      <View style={[appStyle.asCenter]}>
        <Image style={styles.icon} source={Icons.forwardIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 30,
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor:ColorSet.gray,
    borderRadius:8,

  },
  container: {backgroundColor: ColorSet.gray, borderRadius: 8},
  icon: {height: 15, width: 10},
  text: {color: ColorSet.grayLight, marginTop: 10},
});

export default MessageContainer;
