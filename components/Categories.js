import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Categories } from '../data/data'

const CategoriesList = () => {
    return (
        <View style={{ paddingHorizontal: 10 }}>
            <ScrollView horizontal>
                {Categories.map((item, index) => {
                    return (
                        <View key={index} style={styles.category}>
                            <Text style={[styles.txtCategory, index === 0 ? styles.firstCategory : null]}>
                                {item.category}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    )
}

export default CategoriesList

const styles = StyleSheet.create({
    category: {
        marginVertical: 10,
        borderColor: '#52555A',
        borderEndWidth: 1,
        // paddingHorizontal: 10,
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
})