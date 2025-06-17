import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoriesList = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:3000/Categories');
            console.log(res.data)
            const serverCategories = res.data;
            const finalCategories = [{ id: '01', category: 'All' }, ...serverCategories];
            setCategories(finalCategories);
            if (res.data.length > 0) {
                setSelectedCategory(res.data[0].category);
                onCategorySelect(res.data[0].category);
            }
        } catch (error) {
            console.error('Lỗi khi lấy category:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSelect = (category) => {
        setSelectedCategory(category);
        onCategorySelect(category);
    };

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((item, index) => (
                    <Pressable
                        key={index}
                        onPress={() => handleSelect(item.category)}
                        style={styles.category}
                    >
                        <Text
                            style={[
                                styles.txtCategory,
                                selectedCategory === item.category && styles.firstCategory
                            ]}
                        >
                            {item.category}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};

export default CategoriesList;


const styles = StyleSheet.create({
    category: {
        marginVertical: 10,
        borderColor: '#52555A',
        borderEndWidth: 1,
        justifyContent: 'center',
    },
    txtCategory: {
        marginHorizontal: 10,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#52555A',
    },
    firstCategory: {
        color: 'rgba(247, 93, 93, 0.8)',
        fontSize: 20,
        marginLeft: 0,
    },
});