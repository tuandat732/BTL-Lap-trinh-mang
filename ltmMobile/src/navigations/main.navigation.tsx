import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainScreen} from '../screens/main.screen';
import {SettingScreen} from '../screens/setting.screen';

const Tab = createBottomTabNavigator();

export const MainNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};
