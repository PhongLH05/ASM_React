import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import Icon from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
  </TouchableOpacity>
);

const Home = () => {
  const [selectedId, setSelectedId] = useState();
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 12, margin: 4}}>
          <Icon name="grid-outline" size={24}/>
          <Text style={{fontSize: 20, fontWeight: 'bold'}} >
            Produces Shop
          </Text>
          <Icon name="person-circle-outline" size={24} onPress={() => navigation.navigate('Account')}/>
        </View>

        <Text style={styles.title}>
          Choose the best
        </Text>

        <FlatList
        style={{marginTop: 12}}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.title}>
          Vegetable
        </Text>

        <FlatList
        style={{marginTop: 12}}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18, marginLeft: 12, fontWeight: 'bold', marginBottom:12
  },

});

export default Home;
