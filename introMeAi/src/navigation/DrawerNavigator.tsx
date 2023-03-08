import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  HomeScreen,
  ScheduleActionScreen,
  InboxScreen,
  ProfileScreen,
  SidemenuScreen,
  MoveActionScreen,
  MoveActiveScreen,
  MoveDetailScreen,
  VinVerificationScreen,
  Earningcreen,
  EarningWeeklyScreen,
  EarningDailyScreen,
  ConciergeMoveScreen,
  RideMoveScreen,
  WorkflowStepsScreen,
  HelpScreen,
  LoadingScreen,
  DebugScreen,
} from '../screens';
import { Screen } from '../constants/screens/screens';
import { ColorSet } from '../styles/colors';
import { Fonts } from '../styles';
import { FamilySet } from '../styles/fontFamily';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screen.HomeScreen} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={Screen.LoadingScreen} component={LoadingScreen} />
      <Stack.Screen name={Screen.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen name={Screen.InboxScreen} component={InboxScreen} /> 
      <Stack.Screen name={Screen.ScheduleActionScreen} component={ScheduleActionScreen} />
      <Stack.Screen name={Screen.MoveDetailScreen} component={MoveDetailScreen} />
      <Stack.Screen name={Screen.MoveActionScreen} component={MoveActionScreen} />
      <Stack.Screen name={Screen.MoveActiveScreen} component={MoveActiveScreen} />
      <Stack.Screen name={Screen.VinVerificationScreen} component={VinVerificationScreen} />
      <Stack.Screen name={Screen.Earningcreen} component={Earningcreen} />
      <Stack.Screen name={Screen.EarningWeeklyScreen} component={EarningWeeklyScreen} />
      <Stack.Screen name={Screen.EarningDailyScreen} component={EarningDailyScreen} />
      <Stack.Screen name={Screen.ConciergeMoveScreen} component={ConciergeMoveScreen} />
      <Stack.Screen name={Screen.RideMoveScreen} component={RideMoveScreen} />
      <Stack.Screen name={Screen.WorkflowStepsScreen} component={WorkflowStepsScreen} />
      <Stack.Screen name={Screen.HelpScreen} component={HelpScreen} />
      <Stack.Screen name={Screen.DebugScreen} component={DebugScreen} /> 
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={SidemenuScreen}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{
          drawerLabel: 'Dashboard',
          drawerActiveBackgroundColor: ColorSet.transparent,
          drawerActiveTintColor: ColorSet.black,
          drawerLabelStyle: { ...Fonts.size.large, fontFamily: FamilySet.boldSf },
          drawerAllowFontScaling: true,
        }}
        component={HomeScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
