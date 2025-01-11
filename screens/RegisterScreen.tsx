import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/FirebaseConfig';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Éxito', 'Usuario registrado correctamente.');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        placeholder="Correo electrónico"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  linkText: {
    marginTop: 15,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});
