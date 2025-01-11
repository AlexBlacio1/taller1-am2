import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/FirebaseConfig';
import Loader from '../components/Loader';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true); // Estado de carga

  // Verificar si el usuario ya está autenticado al montar el componente
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si el usuario está autenticado, redirigir a Home
        navigation.navigate('Home');
      } else {
        setLoading(false); // Detener la carga si no hay usuario
      }
    });

    return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
  }, [navigation]);

  const handleLogin = async () => {
    setLoading(true); // Activar carga cuando se presiona el botón
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false); // Detener carga después de inicio de sesión exitoso
      navigation.navigate('Home');
    } catch (error: any) {
      setLoading(false); // Detener carga si ocurre un error
      Alert.alert('Error', error.message);
    }
  };

  // Mostrar Loader solo si estamos cargando
  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate ahora.</Text>
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
