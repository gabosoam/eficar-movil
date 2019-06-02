import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import MainPage from './src/pages/main-page/MainPage';
import LoginPage from './src/pages/login-page/LoginPage';

const AppNavigator = createStackNavigator({
  Main: {
    screen: MainPage,
  },
  LoginPage: {
    screen: LoginPage
  }
},
  {
    initialRouteName: "LoginPage",
    headerMode: 'none',
  });

export default createAppContainer(AppNavigator);