import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardTypeOptions,
  Text,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
// import { TextInput } from 'react-native-paper';

import {ColorSet, Fonts, FamilySet} from '../styles';
import appStyle from '../styles/appStyle';
import {H5} from '.';

interface InputProps {
  value?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: Function;
  onEditingEndHandler?: Function;
  setValue: Function;
  autofocus?: boolean;
  editable?: boolean;
  required?: boolean;
  multiline?: boolean;
  disabled?: boolean;
  label?: string;
  title?: string;
  errorText?: string;
  isSecure?: boolean | undefined;
  outlineColor?: string | undefined;
  maxLength?: Number | any;
  inputActiveBg?: string;
  rightIcon?: ImageSourcePropType | undefined;
  isDropdown?: boolean;
  onPressDropdown?: (() => void) | any;
  dropdownOptions?: any;
}

const Input: React.FC<InputProps> = props => {
  const {
    onEditingEndHandler,
    onChangeText,
    keyboardType,
    setValue,
    autofocus,
    label,
    title,
    isSecure,
    value,
    errorText,
    required,
    disabled,
    editable,
    multiline,
    maxLength,
    inputActiveBg,
    rightIcon,
    isDropdown,
    onPressDropdown,
    dropdownOptions,
  } = props;
  const [bgColor, setBgColor] = useState(false);
  const [showSecureInput, setShowSecureInput] = useState(true);

  const onFocus = () => {
    setBgColor(true);
  };
  const onBlur = () => {
    setBgColor(false);
  };

  const changeHandler = (inputText: string) => {
    if (onChangeText) onChangeText();
    setValue(inputText);
  };

  const onEditingEnd = () => {
    if (onEditingEndHandler) {
      onEditingEndHandler(value);
    }
  };

  return (
    <View style={styles.container}>
      {title && (
        <Text style={styles.title}>
          {title}
          <Text style={{color: ColorSet.red}}>{required ? ' *' : ''}</Text>
        </Text>
      )}
      <View
        style={[
          {
            height: multiline ? 150 : 65,
          },
        ]}>
        <TextInput
          style={[
            styles.input,
            {
              textAlignVertical: 'top',
            },
          ]}
          placeholderTextColor={ColorSet.grayLight}
          placeholder={label}
          value={value}
          multiline={multiline}
          numberOfLines={multiline ? 5 : 1}
          onChangeText={changeHandler}
          keyboardType={keyboardType ?? 'default'}
          autoFocus={autofocus}
          editable={editable}
          secureTextEntry={isSecure && showSecureInput}
          maxLength={maxLength}
          onEndEditing={onEditingEnd}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingTop: 15,
  },
  input: {
    borderRadius: 50,
    ...Fonts.size.normal,
    fontFamily: FamilySet.semiboldSf,
    color: ColorSet.grayLight,
    borderWidth: 0,
    marginTop: 0,
    flex: 1,
    backgroundColor: ColorSet.gray,
    paddingHorizontal:30,
    marginHorizontal:15
  },
 
  title: {
    marginTop: 10,
    color: ColorSet.black,
    ...Fonts.size.medium,
    fontFamily: FamilySet.medium,
  },
 
});

export default Input;
