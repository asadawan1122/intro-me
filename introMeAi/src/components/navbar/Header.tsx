import React from 'react';
import {StyleSheet, View, StatusBar, Platform} from 'react-native';

import {H3, HeaderBackButton, Logo} from '../../components';
import {ColorSet} from '../../styles';
import appStyle from '../../styles/appStyle';
import {FamilySet} from '../../styles/fontFamily';
import {animation} from '../../utils/animations';

interface HeaderProps {
  navigation?: any | undefined;
  backNavigation?: String | undefined;
  subTitle?: String | undefined;
  title?: String | undefined;
  isBackButton?: boolean;
  onPress?: (() => void) | undefined;
  children?: React.ReactNode;
  rightComponent?: React.ReactNode;
  notificationCount?: Number | undefined;
}

const Header: React.FC<HeaderProps> = props => {
  const {navigation, isBackButton, backNavigation, title} = props;

  const backPressHandler = async () => {
    if (backNavigation) {
      navigation.replace(backNavigation);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[appStyle.row, appStyle.jcSpaceBetween, appStyle.pv15]}>
      <View style={appStyle.asCenter}>
        {isBackButton && (
          <HeaderBackButton onPress={() => backPressHandler()} />
        )}
        {title && <H3>{title}</H3>}
      </View>
      <View>
        <Logo animationType={animation.slideDown} imageStyle={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // flexDirection: 'row',
  },
  logo: {
    height: 30,
    width: 100,
  },
});

export default Header;
