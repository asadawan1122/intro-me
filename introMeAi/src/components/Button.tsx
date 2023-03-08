import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  Image,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import {ColorSet, Fonts, FamilySet} from '../styles';

interface ButtonProps {
  style?: TextStyle | undefined;
  containerStyle?: ViewStyle | undefined;
  onPress?: (() => void) | undefined;
  icon?: ImageSourcePropType | undefined;
  icon2?: ImageSourcePropType | undefined;
  disable?: boolean;
  children?: string;
}

const Button: React.FC<ButtonProps> = props => {
  const {style, disable, containerStyle, onPress, icon, icon2} = props;

  return (
    <TouchableOpacity
      disabled={disable}
      style={[
        {
          ...styles.container,
          ...containerStyle,
        },
        disable ? styles.disabled : null,
      ]}
      onPress={onPress}>
      {icon !== undefined && <Image style={{...styles.image}} source={icon} />}
      <Text style={{...styles.label, ...style}}>{props.children}</Text>
      {icon2 !== undefined && (
        <Image style={{...styles.image}} source={icon2} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: ColorSet.white,
    // alignSelf:'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    // alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3.0,
    elevation: 6,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: ColorSet.white,
  },
  disabled: {
    backgroundColor: ColorSet.red,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    alignSelf:'flex-start'
  },
  label: {
    color: ColorSet.white,
    ...Fonts.size.normal,
    lineHeight:21,
    fontFamily:FamilySet.regular
  },
});

export default Button;
