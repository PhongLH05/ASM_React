import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

const Account = () => {

  const nav = useNavigation();
  const route = useRoute();
  const { user, name, email } = route.params || {};
  const [userId, setUserId] = useState(user?.id || null); // Nhận thông tin từ trang đăng nhập, sử dụng || {} để tránh lỗi undefined
  const [inputName, setInputName] = useState(name || ''); // Tự động điền tên
  const [inputEmail, setInputEmail] = useState(email || ''); // Tự động điền email
  const [password, setPassword] = useState(''); // Mật khẩu hiện tại
  const [newPassword, setNewPassword] = useState(''); // Mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(''); // Xác nhận mật khẩu mới
  const apiURL = "http://localhost:3000/users"; // Thay <YOUR_IP_ADDRESS> bằng địa chỉ IP của máy tính
  const handleUpdate = async () => {
    if (!userId) {
      Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu mới.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới và xác nhận mật khẩu mới không khớp!");
      return;
    }

    if (newPassword.length < 6) { // Thêm kiểm tra độ dài mật khẩu
      Alert.alert("Lỗi", "Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    try {
      const userRes = await axios.get(`${apiURL}/${userId}`);
      const userData = userRes.data;

      if (!userData || userData.password !== currentPassword) {
        Alert.alert("Lỗi", "Mật khẩu hiện tại không đúng. Vui lòng kiểm tra lại.");
        return;
      }

      
      const updateData = {
        name: inputName,
        email: inputEmail,
        password: newPassword, 
      };

      const res = await axios.patch(`${apiURL}/${userId}`, updateData);

      if (res.status === 200) { // Kiểm tra status code thành công
        Alert.alert("Thành công", "Thông tin và mật khẩu đã được cập nhật!");
        // Reset các trường mật khẩu sau khi cập nhật thành công
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        nav.navigate('index')
      } else {
        Alert.alert("Lỗi", "Cập nhật thông tin thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      alert('Cap naht that bai')
      console.log(error);
    }
  };
    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <TextInput 
        style={styles.input}
        placeholder="vana@gmail.com"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={inputEmail} // Tự động điền email
        onChangeText={setInputEmail} // Cập nhật email khi người dùng thay đổi
      />
      
      <TextInput 
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        value={password} // Giá trị mật khẩu hiện tại
        onChangeText={setPassword} // Cập nhật mật khẩu hiện tại
      />
      
      <TextInput 
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        value={newPassword} // Giá trị mật khẩu mới
        onChangeText={setNewPassword} // Cập nhật mật khẩu mới
      />
      
      <TextInput 
        style={styles.input}
        placeholder="Confirm New Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
      />
      
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
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
