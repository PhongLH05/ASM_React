import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Animated
  
} from "react-native";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigation();

    const postUser = async() => {
      try {
        if(!name || !password || !email){
          return alert('Nhap day du thong tin')
        }
        const res = await axios.post('http://localhost:3000/users', {
          name: name,
          email: email,
          password: password
        })
        alert('Success');
        nav.navigate('LoginScreen', {name, email, password})
      } catch (error) {
        console.log(error);
      }
    }

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
              Sign Up
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
                name="person-outline"
                size={20}
                color="#666"
                style={{ marginRight: 5, marginTop: 8 }}
              />
              <TextInput
                placeholder="Username"
                style={{ flex: 1, paddingVertical: 0 }}
                keyboardType="default"
                onChangeText={setName}
              />
            </Animated.View>

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
                onChangeText={setEmail}
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
                onChangeText={setPassword}
              />
            </View>

            
    
            <TouchableOpacity
              onPress={() => postUser()}
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
                Sign Up
              </Text>
            </TouchableOpacity>
    
            <View style={{ flexDirection: "row" , justifyContent: "center" }}>
              <Text>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => nav.navigate('LoginScreen')}
              >
                <Text
                  style={{color: '#39e75f', fontWeight: '700'}}
                > Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
  )
}

export default SignUpScreen