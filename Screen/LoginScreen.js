import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createStaticNavigation,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import axios from "axios";
import a from "./(tabs)/index";

export default function LoginScreen({ navigation, route }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [name, setName] = useState();
  const apiURL = "http://localhost:3000/users";

  const handleLogin = async () => {
    if (!inputEmail || !inputPassword) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
      return;
    }

    try {
      const res = await axios.get(
        `${apiURL}?email=${inputEmail}&password=${inputPassword}`
      );
      const loggedInUser = res.data[0];
      navigation.navigate('index', {email: inputEmail, email: inputEmail, user: loggedInUser})
      if (res.data.length > 0) {
        Alert.alert("Thành công", "Đăng nhập thành công!");
       
      } else {
        Alert.alert("Thất bại", "Tên đăng nhập hoặc mật khẩu sai");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể kết nối đến server");
      console.error(error);
    }
  };

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
            value={inputEmail}
            onChangeText={setInputEmail}
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
            value={inputPassword}
            onChangeText={setInputPassword}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: "#39e75f", fontWeight: "500" }}>Forgot</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
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

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
            <Text style={{ color: "#39e75f", fontWeight: "700" }}> SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
