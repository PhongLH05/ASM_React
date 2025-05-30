import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Animated
  
} from "react-native";
import React from "react";
import logo from "../assets/logo.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';







export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image source={logo} style={{ width: 400, height: 400 }} />
        </View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Login
        </Text>

        <Animated.View 
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <Icon
            name="alternate-email"
            size={20}
            color="#666"
            style={{ marginRight: 5, marginTop: 8 }}
          />
          <TextInput
            placeholder="Email ID"
            style={{ flex: 1, paddingVertical: 0 }}
            keyboardType="email-address"
          />
        </Animated.View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5, marginTop: 8 }}
          />
          <TextInput
            placeholder="Password"
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: "#39e75f", fontWeight: "500" }}>Forgot</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('index')}
          style={{
            backgroundColor: "#39e75f",
            padding: 16,
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
              color: "#FFF",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" , justifyContent: "center" }}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
          >
            <Text
              style={{color: '#39e75f', fontWeight: '700'}}
            > SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
