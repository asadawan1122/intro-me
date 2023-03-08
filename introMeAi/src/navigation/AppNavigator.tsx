import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Screen} from '../constants/screens/screens';
import {SplashScreen, LoginScreen} from '../screens';
import {ColorSet} from '../styles';
import Tabs from './BottomTabs';

const Stack = createNativeStackNavigator();

const SplashStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: ColorSet.theme,
        },
      }}>
      <Stack.Screen name={Screen.SplashScreen} component={SplashScreen} />
    </Stack.Navigator>
  );
};

const Auth = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screen.LoginScreen}
      screenOptions={{
        headerShown: false,
        animation: 'flip',
        gestureEnabled: true,
        presentation: 'card',
        contentStyle: {
          backgroundColor: ColorSet.black,
        },
      }}>
      <Stack.Screen name={Screen.LoginScreen} component={LoginScreen} />
    </Stack.Navigator>
  );
};

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screen.SplashScreen}
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: ColorSet.black,
          },
        }}>
        <Stack.Screen name={Screen.SplashStack} component={SplashStackScreen} />
        <Stack.Screen name={Screen.AuthStack} component={Auth} />
        <Stack.Screen name={Screen.MainStack} component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
