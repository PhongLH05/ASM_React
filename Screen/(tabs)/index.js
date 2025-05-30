import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../(tabs)/Home";
import Cart from "../(tabs)/Cart";
import Favorite from "../(tabs)/Favorite";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "@react-native-vector-icons/ionicons";


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false, tabBarIcon: ({ size, color }) => (
              <Icon name="cart" size={size} color={color} />
            ), }}
        />
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          options={{ headerShown: false, tabBarIcon: ({ size, color }) => (
              <Icon name="star-outline" size={size} color={color} />
            ), }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
