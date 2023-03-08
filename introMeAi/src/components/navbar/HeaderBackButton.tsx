import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {Icons} from '../../constants/assets/icons';

interface BackButtonProps {
  onPress: (() => void) | undefined;
}

const HeaderBackButton: React.FC<BackButtonProps> = ({onPress}) => {
  return (
    <View style={[styles.header]}>
      <TouchableOpacity onPress={onPress} style={{paddingRight: 20}}>
        <Image style={styles.image} source={Icons.back} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 99,
  },
  image: {
    width: 16,
    height: 18,
    resizeMode: 'contain',
  },
});

export default HeaderBackButton;
