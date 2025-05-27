import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PoppinsBold, PoppinsMedium } from '../SyledText';
import { router } from 'expo-router';
import { useAuthContext } from '@/context/auth-context';
import Feather from '@expo/vector-icons/Feather';


const LoginForm = () => {
  const { login } = useAuthContext();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    const { username, password } = formData;

    if (!username.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Username and password are required.');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(username, password);
      if (success) {
        router.push('/expenses');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <View style={styles.bottomTitleContainer}>
            <PoppinsBold style={{ fontSize: 24 }}>Login</PoppinsBold>
          </View>

          <View style={styles.inputGroup}>
            <PoppinsMedium style={styles.label}>Username</PoppinsMedium>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#94A3B8"
              value={formData.username}
              onChangeText={(text) => handleChange('username', text)}
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <PoppinsMedium style={styles.label}>Password</PoppinsMedium>
            <View style={{ position: 'relative' }}>
              <TextInput
                style={[styles.input, { paddingRight: 50 }]}
                placeholder="Enter your password"
                placeholderTextColor="#94A3B8"
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                secureTextEntry={!showPassword}
                editable={!isLoading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                style={styles.eyeIcon}
              >
                <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="#64748b" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <PoppinsMedium style={styles.buttonText}>Login</PoppinsMedium>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 4,
    marginLeft: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 20,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#0F172A',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    width: '100%',
    backgroundColor: '#022a5d',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  bottomTitleContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 15,
  }

});

export default LoginForm;