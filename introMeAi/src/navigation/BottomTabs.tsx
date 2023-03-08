import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Icons} from '../constants/assets/icons';
import {ColorSet} from '../styles';
import {ChatScreen, Conversation, ProfileScreen} from '../screens';
import {Screen} from '../constants/screens/screens';
import {screenWidth} from '../styles/screenSize';
import {Paragraph} from '../components';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {forUIKit} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/HeaderStyleInterpolators';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//screen on which bottom tab menu needs to be hide.
const tabHiddenRoutes = [Screen.Conversation];

const getChatIcon = (focused: boolean) => {
  return (
    <View style={[styles.tab]}>
      <Image
        style={[
          styles.logoStyle,
          {tintColor: focused ? ColorSet.link : ColorSet.grayMedium},
        ]}
        source={Icons.chat}
      />
      <Paragraph
        style={{
          color: focused ? ColorSet.link : ColorSet.grayMedium,
          fontSize: 10,
        }}>
        Chat AI
      </Paragraph>
    </View>
  );
};

const getProfileIcon = (focused: boolean) => {
  return (
    <View style={[styles.tab]}>
      <Image
        style={[
          styles.logoStyle,
          {tintColor: focused ? ColorSet.link : ColorSet.grayMedium},
        ]}
        source={Icons.profile}
      />
      <Paragraph
        style={{
          color: focused ? ColorSet.link : ColorSet.grayMedium,
          fontSize: 10,
        }}>
        Profile
      </Paragraph>
    </View>
  );
};

const ChatScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screen.MainStack}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: ColorSet.black,
        },
      }}>
      <Stack.Screen name={Screen.Chat} component={ChatScreen} />
      <Stack.Screen name={Screen.Conversation} component={Conversation} />
    </Stack.Navigator>
  );
};


const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={Screen.MainStack}
      screenOptions={{
        tabBarActiveTintColor: 'white',
        headerShown: false,
        tabBarLabelStyle: {
          fontWeight: '700',
        },
        tabBarStyle: styles.tabBar,
      }}
      sceneContainerStyle={{backgroundColor: ColorSet.black}}>
      <Tab.Screen
        name={'MainScreenStack'}
        component={ChatScreenStack}
        options={({route}) => ({
          tabBarShowLabel: false,
          // hide/show bottom menu in specefic screens
          tabBarStyle: (route => {
            if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route) as any)) {
              return {display: 'none'};
            }
            return styles.tabBar;
          })(route),
          tabBarIcon: ({focused}) => getChatIcon(focused),
        })}
      />
      <Tab.Screen
        name={Screen.Profile}
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => getProfileIcon(focused),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginBottom: 3,
  },

  tab: {
    alignItems: 'center',
  },

  tabBar: {
    bottom: 25,
    borderRadius: 30,
    width: 230,
    alignItems: 'center',
    height: 60,
    position: 'absolute',
    left: screenWidth.width50 - 230 / 2,
  },
});

export default Tabs;
