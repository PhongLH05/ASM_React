import {
  Alert,
  Button,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  TextInput,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CheckBox from "@react-native-community/checkbox";

const FoodCard = () => {
  const nav = useNavigation();
  const [list, setList] = useState([]);
  const apiURL = "http://localhost:3000/foodItems";
  const BASEURL = "http://localhost:3000";
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isDialog, setIsDialog] = useState(false);

  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [servingSize, setServingSize] = useState();
  const [isSale, setIsSale] = useState(true);

  useEffect(() => {
    getList();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getList();
  };

  const getList = async () => {
    try {
      const res = await axios.get(apiURL);
      //   console.log(res.data);
      setList(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`${apiURL}/${id}`);

      if (res.status == 200) {
        alert("Xoa Thanh cong");
        await getList();
      } else {
        alert("Xoá thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert("Xác nhận xoá", "Bạn có xác nhận xoá không", [
      { text: "Huỷ", style: "cancel" },
      { text: "Ok", onPress: () => deleteItem(id) },
    ]);
  };

  const updateItem = async (id) => {
    try {
      if (
        !name ||
        !category ||
        !description ||
        !price ||
        !image ||
        !servingSize 
      ) {
        return alert("Vui lòng nhập đầy đủ các trường");
      }
      if (isNaN(price)) {
        return alert("Giá tiền phải là số");
      }
      await axios.put(`${apiURL}/${id}`, {
        name: name,
        category: category,
        description: description,
        price: Number(price),
        image: image,
        servingSize: servingSize,
        isSale: isSale,
      });
      setIsDialog(false);
      alert("Sửa thành công");
    } catch (error) {
      console.log(error);
    }
  };

  const isValidUrl = (string) => {
    return /^(http|https):\/\//.test(string);
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={list}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => {
        const imageUri = isValidUrl(item.image)
          ? item.image
          : `${BASEURL}${item.image}`;
        return (
          <Pressable
            onPress={() => nav.navigate("FoodDetail", { item: item })}
            style={styles.itemFood}
          >
            <View>
              {item.sale && <Text style={styles.saleText}>Sale</Text>}
              <Image style={styles.imgFood} source={{ uri: imageUri }} />
            </View>
            <Text style={styles.itemText}>{item.name}</Text>
            <View style={styles.itemInfo}>
              <Text style={styles.servingSize}>{item.servingSize}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  <Text style={{ color: "black" }}>$</Text>{" "}
                  {item.category == "Vegetable"
                    ? item.price + "/bunch"
                    : item.price + "/kg"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  title="Edit"
                  onPress={() => {
                    setIsDialog(true);
                    setName(item.name);
                    setPrice(String(item.price));
                    setCategory(item.category);
                    setDescription(item.description);
                    setIsSale(item.isSale);
                    setImage(item.image);
                    setServingSize(item.servingSize);
                  }}
                />
                <Button title="Delete" onPress={() => confirmDelete(item.id)} />
              </View>
            </View>
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
                      value={name}
                    ></TextInput>
                    <TextInput
                      style={styles.input}
                      placeholder="Category"
                      onChangeText={setCategory}
                      value={category}
                    ></TextInput>
                    <TextInput
                      style={styles.input}
                      placeholder="Decription"
                      onChangeText={setDescription}
                      value={description}
                    ></TextInput>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      placeholder="Price"
                      onChangeText={setPrice}
                      value={price}
                    ></TextInput>
                    <TextInput
                      style={styles.input}
                      placeholder="Image"
                      onChangeText={setImage}
                      value={image}
                    ></TextInput>
                    <TextInput
                      style={styles.input}
                      placeholder="ServingSize"
                      onChangeText={setServingSize}
                      value={servingSize}
                    ></TextInput>
                    <Button
                      title={isSale ? "Đang Sale" : "Không Sale"}
                      color={isSale ? "green" : "gray"}
                      onPress={() => setIsSale(!isSale)}
                    />

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        title="Sửa"
                        onPress={() => {
                          updateItem(item.id);
                        }}
                      />
                      <Button
                        title="Huỷ"
                        onPress={() => {
                          setIsDialog(false);
                        }}
                      />
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </Modal>
          </Pressable>
        );
      }}
      keyExtractor={(item) => item.id}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      numColumns={2}
    />
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingBottom: 140,
  },
  itemFood: {
    backgroundColor: "rgba(188, 192, 187, 0.8)",
    paddingHorizontal: 12,
    paddingTop: 15,
    paddingBottom: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 15,
    position: "relative",
  },
  saleText: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#f5272799",
    color: "#FFFFFF",
    width: 53,
    height: 22,
    textAlign: "center",
    borderBottomLeftRadius: 25,
    zIndex: 1,
    fontWeight: "bold",
  },
  itemText: {
    color: "black",
    alignSelf: "flex-start",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  imgFood: {
    width: 155,
    height: 155,
    resizeMode: "cover",
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
  },
  itemInfo: {
    marginTop: 7,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  servingSize: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    flex: 1,
    marginTop: 5,
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f0f0f0",
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    color: "black",
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
