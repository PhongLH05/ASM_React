import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

const FoodDetail = ({ navigation, route }) => {
  const { item } = route.params;
  const [showIngredients, setShowIngredients] = useState(false);
  const [showAllergens, setShowAllergens] = useState(false);

  console.log("Item received in FoodDetail:", item);

  const BASEURL = "http://localhost:3000";
  console.log("Item received in FoodDetail:", item);

  console.log("Image URL in FoodDetail:", `${BASEURL}${item.image}`);

  const isValidUrl = (string) => {
    return /^(http|https):\/\//.test(string);
  };
  const imageUri = isValidUrl(item.image) ? item.image : `${BASEURL}${item.image}`;
  return (
    
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()}>
            <Icon name="arrow-circle-left" size={30} color="#333" />
          </Pressable>
          <Icon name="heart-o" size={30} color="#333" />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.contentBox}>
            <Image
              source={{ uri: imageUri }}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <Text style={styles.itemName}>{item.name}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", width: '100%', paddingHorizontal: 4 }}
            >
              <Text style={styles.itemCategory}>{item.category}</Text>
              <Text style={styles.itemSize}>{item.servingSize}</Text>
            </View>

            <View style={{ height: 100 }}>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>

            {/* <View style={styles.sizeField}>
              <Text style={styles.sizeTitle}>Size</Text>
              <View style={styles.sizeContainer}>
                {sizes.map((size, index) => (
                  <TouchableOpacity key={index} style={styles.sizeBox}>
                    <Text style={styles.sizeText}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View> */}

            <View style={styles.totalField}>
              <View style={styles.priceField}>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.txtPrice}>
                  <Text style={styles.priceSymbol}>$</Text> {item.price}
                </Text>
              </View>
              <Pressable style={styles.btnAdd}>
                <Text style={styles.btnAddText}>Add to Cart</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FoodDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contentBox: {
    flex: 1,
    marginTop: 10,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingBottom: 20,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    width: "100%",
    elevation: 5,
  },
  itemImage: {
    width: "100%",
    height: 300,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
  },
  itemName: {
    fontSize: 45,
    fontFamily: "FS Harabara",
    color: "#333",
    marginTop: 20,
  },
  itemSize: {
    marginTop: 5,
    fontSize: 18,
    color: '#39e75f',
    fontWeight: 'bold'
  },
  itemCategory: {
    fontSize: 18,
    color: "#555",
    marginTop: 5,
    fontWeight: "700",
    backgroundColor: "rgba(234, 221, 228, 0.5)",
    padding: 5,
    borderRadius: 10,
  },
  itemDescription: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    textAlign: "auto",
    letterSpacing: 1,
  },
  sizeField: {
    marginTop: 15,
    width: "100%",
    height: 75,
  },
  sizeTitle: {
    fontSize: 22,
    color: "#333",
    fontWeight: "bold",
  },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  sizeBox: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
    borderColor: "rgba(161, 240, 90, 0.8)",
    borderWidth: 2,
  },
  sizeText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  priceLabel: {
    fontSize: 18,
    color: "#555",
  },
  txtPrice: {
    flex: 1,
    marginTop: 5,
    fontSize: 27,
    color: "#333",
    fontWeight: "bold",
  },
  priceSymbol: {
    color: "rgba(161, 240, 90, 0.8)",
  },
  totalField: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 50,
    flexDirection: "row",
    width: "100%",
  },
  priceField: {
    paddingBottom: 16,
    flex: 1,
    alignItems: "flex-start",
  },
  btnAdd: {
    backgroundColor: "rgba(161, 240, 90, 0.9)",
    width: "65%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  btnAddText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
});
