import { View, Text, FlatList, Modal, TextInput, Button, ActivityIndicator } from "react-native";
import React from "react";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import Icon from "@react-native-vector-icons/ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CategoriesList from "../../components/Categories";
import FoodCard from "../../components/FoodCard";
import axios from "axios";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
  </TouchableOpacity>
);

const Home = () => {
  const route = useRoute();
  const [selectedId, setSelectedId] = useState();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isDialog, setIsDialog] = useState(false);

  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [decription, setDecription] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [servingSize, setServingSize] = useState();
  const [isSale, setIsSale] = useState(false);
  

  const [list, setList] = useState([]);
  const apiURL = 'http://localhost:3000/foodItems';

  const { user } = route.params || {}; 
  

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

  const [currentSelectedCategory, setCurrentSelectedCategory] = useState('');

  const handleCategorySelection = (category) => {
      console.log('Danh mục đã được chọn:', category);
      setCurrentSelectedCategory(category);
  };

  const addItem =  async () => {
    try {
      if(!name || !category || !decription || !price || !image || !servingSize || !isSale){
        return alert('Vui lòng nhập đầy đủ các trường');
      }
      if(isNaN(price)){
        return alert('Giá tiền phải là số')
      }
      await axios.post(apiURL, {
        name: name,
        category: category,
        decription: decription,
        price: Number(price),
        image: image,
        servingSize: servingSize,
        isSale: isSale
      })
      setIsDialog(false)
      alert('Thêm thành công')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 12,
            margin: 4,
          }}
        >
          <Icon name="grid-outline" size={24} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Produces Shop
          </Text>
          <Icon
            name="person-circle-outline"
            size={24}
            onPress={() => {
              console.log(user)
              navigation.navigate("SettingsScreen", {user: user})
            }}
          />
        </View>

        <Text style={styles.title}>Choose the best</Text>
        <CategoriesList onCategorySelect={handleCategorySelection} />
        <FoodCard />
        <TouchableOpacity
          style={[styles.fab, { bottom: 10 + insets.bottom + 100 }]}
          onPress={() => {
            setIsDialog(true);
          }}
          activeOpacity={0.7}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>

        <Modal
          visible={isDialog}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsDialog(false)}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add New Item</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={setName}
                ></TextInput>
                <TextInput
                  style={styles.input}
                  placeholder="Category"
                  onChangeText={setCategory}
                ></TextInput>
                <TextInput
                  style={styles.input}
                  placeholder="Decription"
                  onChangeText={setDecription}
                ></TextInput>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Price"
                  onChangeText={setPrice}
                ></TextInput>
                <TextInput
                  style={styles.input}
                  placeholder="Image"
                  onChangeText={setImage}
                ></TextInput>
                <TextInput
                  style={styles.input}
                  placeholder="ServingSize"
                  onChangeText={setServingSize}
                ></TextInput>
                <TextInput
                  style={styles.input}
                  placeholder="Sale"
                  
                  onChangeText={setIsSale}
                ></TextInput>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}> 
                <Button
                  title="Thêm"
                  onPress={() => {
                    addItem();
                  }}
                />
                <Button title="Huỷ" 
                    onPress={() => {
                      setIsDialog(false)
                    }}
                />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
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
    fontSize: 18,
    marginLeft: 12,
    fontWeight: "bold",
    marginBottom: 12,
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#39e75f",
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    right: 12,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 999,
  },
  input: {
    backgroundColor: "#f0f0f0",
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    color: 'black'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Home;
