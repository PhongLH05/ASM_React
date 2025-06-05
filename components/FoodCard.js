import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { foodItems } from '../data/data';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const FoodCard = () => {

    const nav = useNavigation();

    return (
        <FlatList
            contentContainerStyle={styles.container}
            data={foodItems}
            renderItem={({ item }) => (
                <Pressable onPress={() => nav.navigate('FoodDetail', { item: item })} style={styles.itemFood}>
                    <View>
                        {item.sale && <Text style={styles.saleText}>Sale</Text>}
                        <Image style={styles.imgFood} source={item.image} />
                    </View>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <View style={styles.itemInfo}>
                        <Text style={styles.servingSize}>{item.servingSize}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}><Text style={{ color: 'black' }}>$</Text> {item.price}</Text>
                            <View style={styles.btnAdd}><Icon name='plus' size={15} color='white' /></View>
                        </View>
                    </View>
                </Pressable>
            )}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{
                justifyContent: 'space-between'
            }}
            numColumns={2}
        />
    );
}

export default FoodCard;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
    },
    itemFood: {
        backgroundColor: 'rgba(188, 192, 187, 0.8)',
        paddingHorizontal: 12,
        paddingTop: 15,
        paddingBottom: 20,
        marginVertical: 15,
        marginHorizontal: 10,
        borderRadius: 15,
        position: 'relative',
    },
    saleText: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#f5272799',
        color: '#FFFFFF',
        width: 53,
        height: 22,
        textAlign: 'center',
        borderBottomLeftRadius: 25,
        zIndex: 1,
        fontWeight: 'bold'
    },
    itemText: {
        color: 'black',
        alignSelf: 'flex-start',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    imgFood: {
        width: 155,
        height: 155,
        resizeMode: 'cover',
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 2,
    },
    itemInfo: {
        marginTop: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    servingSize: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        justifyContent: 'center'
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    price: {
        flex: 1,
        marginTop: 5,
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    btnAdd: {
        backgroundColor: 'rgba(58, 62, 57, 0.8)',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    }
});
