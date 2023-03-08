import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Layout, Logo, Paragraph, Link} from '../../components';
import Button from '../../components/Button';
import {Icons} from '../../constants/assets/icons';
import {Images} from '../../constants/assets/images';
import {ColorSet} from '../../styles';
import appStyle from '../../styles/appStyle';
import {Screen} from '../../constants/screens/screens';
import { animation } from '../../utils/animations';

const LoginScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const onPressLogin = () => {
    console.log('login pressed');
    navigation.replace(Screen.MainStack);
  };
  const onPressLink = () => {
    console.log('link pressed');
  };
  return (
    <Layout>
      <View style={[appStyle.main,appStyle.mt50]}>
        <Logo animationType={animation.slideRight} />
      </View>
      <Button icon={Icons.apple} onPress={onPressLogin} icon2={Icons.appleB}>
        Continue With Apple
      </Button>
      <View style={[appStyle.mv50, appStyle.row]}>
        <Paragraph style={appStyle.taCenter}>
          By creating an account or signing you agree to our
          <Paragraph onPress={onPressLink} style={{color: ColorSet.link}}>
            {' '}
            Terms and Condition
          </Paragraph>
        </Paragraph>
      </View>
    </Layout>
  );
};

export default LoginScreen;
