import React, {useEffect} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Logo} from '../../components';
import appStyle from '../../styles/appStyle';
import {Screen} from '../../constants/screens/screens';
import {Images} from '../../constants/assets/images';
import { animation } from '../../utils/animations';

const SplashScreen: React.FC<{navigation: any}> = ({navigation}) => {
  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    await performTimeConsumingTask();
    // const user = await auth().currentUser
    // navigation.replace(user ? Screen.LoadingStack : Screen.AuthStack)
    navigation.replace(Screen.AuthStack);
    // navigation.replace(Screen.HomeStack);
  };

  const performTimeConsumingTask = () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(Screen.SplashStack);
      }, 3000),
    );
  };
  return (
    <ImageBackground
      source={Images.bgSplash}
      resizeMode="cover"
      style={styles.image}>
      <Logo animationType={animation.slideUp} />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
