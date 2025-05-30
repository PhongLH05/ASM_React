import { useEffect, useState } from "react";
import HomeScreen from "./Screen/(tabs)/Home";
import SplashScreen from "./Screen/SplashScreen";
import LoginScreen from "./Screen/LoginScreen"
import SignUpScreen from "./Screen/SignUpScreen";
import TabNavigation from "./Screen/(tabs)";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from "./Screen/(tabs)/Cart";

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const Stack = createStackNavigator(); 

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  });

  if(isShowSplash){
    return <SplashScreen />;
  }

  return (<NavigationContainer>
      {/* Stack.Navigator là nơi bạn định nghĩa các màn hình có thể điều hướng */}
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="index"
          component={TabNavigation}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>);
}
