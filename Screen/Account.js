import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Account = () => {

    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} 
        style={styles.profileImage} 
      />
      
      <TextInput 
        style={styles.input}
        placeholder="Nguyen Van A"
        placeholderTextColor="#aaa"
      />
      
      <TextInput 
        style={styles.input}
        placeholder="vana@gmail.com"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
      />
      
      <TextInput 
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
      />
      
      <TextInput 
        style={styles.input}
        placeholder="Re-type password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
      />
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'grey',
    marginBottom: 20,
    textAlign: 'center'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#fff',
    backgroundColor: '#D2D2D2',
  },
  button: {
    backgroundColor: '#39e75f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Account;
