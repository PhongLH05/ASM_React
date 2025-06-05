import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

const settingsOptions = [
  { id: "1", title: "History" },
  { id: "2", title: "Personal Details" },
  { id: "3", title: "Address" },
  { id: "4", title: "Payment Method" },
  { id: "5", title: "About" },
  { id: "6", title: "Help" },
  { id: "7", title: "Log out" },
];

const SettingsScreen = () => {

    const navigation = useNavigation();

    const handleOptionPress = (item) => {
        if (item.title === "Personal Details") {
            navigation.navigate('Account');
        } else {
          console.log('Failed');
          
        }
      };

  const renderItem = ({ item }) => (
    <SafeAreaView>
      <TouchableOpacity style={styles.option} onPress={() => handleOptionPress(item)}>
        <Text style={styles.optionText}>{item.title}</Text>
        <Text style={styles.arrow}>{">"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Settings</Text>
        <FlatList
          data={settingsOptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20
  },
  header: {
    fontSize: 24,
    color: "black",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#444444",
  },
  optionText: {
    fontSize: 18,
    color: "black",
  },
  arrow: {
    color: "#39e75f", 
    fontSize: 18,
  },
});

export default SettingsScreen;
